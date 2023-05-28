export type FolderDataStructure = {
  files: string[];
};

export type FolderDataWrapper = {
  inbox?: FolderDataStructure;
  projects: FolderDataStructure;
  areas: FolderDataStructure;
  resources: FolderDataStructure;
  archive: FolderDataStructure;
};

//a rename might be in order, and i need a type for markdown files
