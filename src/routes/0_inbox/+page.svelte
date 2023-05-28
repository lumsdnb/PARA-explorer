<script lang="ts">
	import type { MarkdownFile } from '../../lib/types/types';
	import ItemList from '../../components/ItemList.svelte';

	const markdownFile1: MarkdownFile = {
		title: 'Getting Started with Markdown',
		content: 'Markdown is a lightweight markup language...',
		tags: ['markdown', 'documentation', 'formatting'],
		insideInbox: false
	};

	const markdownFile2: MarkdownFile = {
		title: 'Advanced Tips for Markdown Formatting',
		content: "In this guide, we'll explore some advanced...",
		tags: ['markdown', 'formatting', 'tips', 'syntax'],
		insideInbox: true
	};

	const markdownFile3: MarkdownFile = {
		title: 'Mastering Markdown Tables',
		content: 'Tables are a powerful way to organize data...',
		tags: ['markdown', 'tables', 'data', 'organization'],
		insideInbox: true
	};

	const markdownFile4: MarkdownFile = {
		title: 'Markdown Cheatsheet',
		content: "Here's a quick reference guide...",
		tags: ['markdown', 'cheatsheet', 'reference', 'syntax'],
		insideInbox: false
	};

	const mockFiles: MarkdownFile[] = [markdownFile1, markdownFile2, markdownFile3, markdownFile4];
</script>

The inbox is where all you unsorted stuff goes. From each item it might be smart to help clarify and
organize it. You should be encouraged to move items out of here to keep it clean and uncluttered

<ItemList items={mockFiles} />
