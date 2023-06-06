type FrontMatterBlock = {
	tags: string[];
	project: string;
	status: string;
};

export function extractHashtags(input: string): string[] {
	return input.split(' ').filter((word) => word.startsWith('#'));
}

export function extractFrontMatter(input: string): FrontMatterBlock | null {
	// Find the frontmatter block
	const frontMatterDelimiter = '---';
	const blocks = input.split(frontMatterDelimiter);
	if (blocks.length < 3) {
		return null;
	}

	const frontMatterBlock = blocks[1]; // Index 1 since frontmatter block is between the two '---'s
	const lines = frontMatterBlock.split('\n').filter((line) => line.trim() !== '');

	// Initialize an empty object to hold our data
	let data: Partial<FrontMatterBlock> = {};

	// Process each line in the block
	for (let line of lines) {
		// Split the line on ':'
		let parts = line.split(':');
		let key = parts[0].trim() as keyof FrontMatterBlock;
		let value = parts[1].trim();

		if (key === 'tags') {
			// Special handling for tags
			data[key] = value.split(' ');
		} else {
			// All other values
			data[key] = value;
		}
	}

	// Type check and return
	if ('tags' in data && 'project' in data && 'status' in data) {
		return data as FrontMatterBlock;
	} else {
		return null;
	}
}

export function extractAllTags(input: string): FrontMatterBlock | null {
	// Extract inline tags
	const inlineTags = extractHashtags(input);

	// Extract frontmatter block
	let frontMatter = extractFrontMatter(input);

	if (frontMatter) {
		// Merge inline tags with frontmatter tags
		const tagSet = new Set([...frontMatter.tags, ...inlineTags]);
		frontMatter.tags = Array.from(tagSet);
		return frontMatter;
	} else {
		return null;
	}
}
