export type MarkdownFile = {
	title: string;
	content: string;
	tags: string[];
	insideInbox: boolean;
};

export type FolderContent = {
	files: MarkdownFile[];
};

export type Workspace = {
	inbox?: FolderContent;
	projects: FolderContent;
	areas: FolderContent;
	resources: FolderContent;
	archive: FolderContent;
};
