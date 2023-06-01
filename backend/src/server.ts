import express from 'express'
import fs from 'fs'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'
import puppeteer, { Page } from 'puppeteer'
//have to be accessible from root dir
import { Folder, FolderGroup, File, FolderType } from '../src/types/types'
import { Request, Response } from 'express'
const app = express()
const screenshotIntervalMs = 5 * 60 * 1000
const serverPort = process.env.PORT || 3000
const BASE_FOLDER_URL = process.env.BASE_FOLDER_URL || '/error/'
const url = 'http://localhost:5173'
const folderNames = {
  inbox: '010_projects/000_inbox',
  projects: '010_projects',
  areas: '020_areas',
  resources: '030_resources',
  archive: '040_archive',
}

let currentScreenshot: Buffer

dotenv.config()
configureExpress()
takeScreenshotPeriodically()

app.get('/latestScreenshot', sendLatestScreenshot)
app.post('/addItemToInbox', addItemToInbox)
app.get('/getPARA', getPARAData)
app.listen(serverPort, startServer)

function configureExpress() {
  app.use(cors({ credentials: true, origin: true }))
  app.use(express.json())
}

async function takeScreenshotPeriodically() {
  await captureScreenshot()
  setInterval(captureScreenshot, screenshotIntervalMs)
}

async function captureScreenshot() {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.setViewport({ width: 800, height: 600 })
  await page.goto(url)

  currentScreenshot = await page.screenshot({ encoding: 'binary' })

  await browser.close()
}

function sendLatestScreenshot(req: Request, res: Response) {
  if (currentScreenshot) {
    res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': currentScreenshot.length,
    })
    res.end(currentScreenshot, 'binary')
  } else {
    res.sendStatus(404) // Return a 404 status if there's no screenshot available yet
  }
}

async function addItemToInbox(req: Request, res: Response) {
  const returnedQuery = req.query as unknown as File

  if (!returnedQuery || !returnedQuery.title) {
    return res.status(400).send({ error: 'No item name provided.' })
  }

  const fullPath = path.join(BASE_FOLDER_URL, folderNames.inbox)
  const newFilePath = path.join(fullPath, `${returnedQuery.title}.md`)

  try {
    if (fs.existsSync(newFilePath)) {
      throw new Error('File already exists.')
    }

    await fs.promises.writeFile(newFilePath, generateMarkdownBody())
    res.status(201).send({ message: 'Item added successfully.' })
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)

      if (error.message === 'File already exists.') {
        res.status(400).send({ error: 'File already exists.' })
      } else {
        res.status(500).send({ error: 'Failed to add item.' })
      }
    } else {
      console.error(error)
      res.status(500).send({ error: 'An unexpected error occurred.' })
    }
  }
}

function generateMarkdownBody() {
  const conceptHeader = '## concept'
  const nextStepsHeader = '## next steps'

  return `${conceptHeader}- \n\n${nextStepsHeader}\n\n- `
}

async function getPARAData(req: Request, res: Response) {
  try {
    let allFolderData: Partial<FolderGroup> = {}

    for (const [key, folder] of Object.entries(folderNames)) {
      const folderData = await fetchFolderData(folder)
      allFolderData[key as keyof FolderGroup] = folderData
    }

    res.json(allFolderData)
  } catch (error) {
    console.error(error)
    res.status(500).send({ error: 'Failed to read directory' })
  }
}

async function fetchFolderData(folderName: string): Promise<Folder> {
  const fullPath = path.join(BASE_FOLDER_URL, folderName)
  const filesInFolder = await fs.promises.readdir(fullPath, {
    withFileTypes: true,
  })

  return {
    id: FolderType.Project,
    files: filesInFolder
      .filter((file) => file.name.endsWith('.md'))
      .map((file) => ({
        title: file.name, // Assuming the file name is the title
        tags: [], // You'll need to somehow fill this with actual tags
        body: '', // Assuming body is empty as it's not provided in this function
      })),
  }
}

function startServer() {
  console.log(`Server listening at http://localhost:${serverPort}`)
}
