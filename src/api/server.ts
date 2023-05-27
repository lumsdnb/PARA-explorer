import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import type { FolderDataStructure, FolderDataWrapper } from './types/types';
import puppeteer, { Page } from 'puppeteer';

let currentScreenshot: Buffer;

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());

async function captureScreenshot() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });
  const url = 'http://localhost:5173'; // Replace with the URL of your Svelte app
  await page.goto(url);

  currentScreenshot = await page.screenshot({ encoding: 'binary' });

  await browser.close();
}

captureScreenshot(); // Take the initial screenshot

setInterval(captureScreenshot, 5 * 60 * 1000);

app.get('/latestScreenshot', (req, res) => {
  if (currentScreenshot) {
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': currentScreenshot.length,
    });
    res.end(currentScreenshot, 'binary');
  } else {
    res.sendStatus(404); // Return a 404 status if there's no screenshot available yet
  }
});

const serverPort = process.env.PORT || 3000;
const BASE_FOLDER = process.env.BASE_FOLDER || '/error';

const result = dotenv.config();

if (result.error) {
  throw result.error;
}

console.log(result.parsed);

const folderNames = {
  inbox: '010_projects/000_inbox',
  projects: '010_projects',
  areas: '020_areas',
  resources: '030_resources',
  archive: '040_archive',
};

const fetchFolderData = async (
  folderName: string
): Promise<FolderDataStructure> => {
  const fullPath = path.join(BASE_FOLDER, folderName);
  const filesInFolder = await fs.promises.readdir(fullPath, {
    withFileTypes: true,
  });

  return {
    files: filesInFolder
      .filter((file) => file.name.endsWith('.md'))
      .map((file) => file.name),
  };
};

type ItemPayload = {
  title: string;
};

app.post('/addItemToInbox', async (req, res) => {
  const returnedQuery = req.query as ItemPayload;
  // console.log('query: ', req.query);

  // Check if item name is provided
  if (!returnedQuery.title) {
    return res.status(400).send({ error: 'No item name provided.' });
  }

  const fullPath = path.join(BASE_FOLDER, '010_projects/000_inbox');

  // Path for the new file
  const newFilePath = path.join(fullPath, `${returnedQuery.title}.md`);

  try {
    if (fs.existsSync(newFilePath)) {
      throw new Error('File already exists.'); // Throw specific error if file already exists
    }

    // Write an empty .md file with the item's name
    await fs.promises.writeFile(newFilePath, prepareMarkdownBody());

    res.status(201).send({ message: 'Item added successfully.' });
  } catch (error: any) {
    console.error(error);
    if (error.message === 'File already exists.') {
      res.status(400).send({ error: 'File already exists.' });
    } else {
      res.status(500).send({ error: 'Failed to add item.' });
    }
  }
});

function prepareMarkdownBody(): string {
  const conceptHeader = '## concept';
  const nextStepsHeader = '## next steps';

  // Create the content with headers and new lines
  const content = `${conceptHeader}- \n\n${nextStepsHeader}\n\n- `;

  return content;
}

app.get('/getPARA', async (req, res) => {
  try {
    let allFolderData: Partial<FolderDataWrapper> = {};

    for (const [key, folder] of Object.entries(folderNames)) {
      const folderData = await fetchFolderData(folder);
      allFolderData[key as keyof FolderDataWrapper] = folderData;
    }
    console.log(allFolderData.inbox);

    // console.log(allFolderData); // Logs the fetched data
    res.json(allFolderData);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Failed to read directory' });
  }
});

app.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
