export type FolderDataStructure = {
  files: string[];
  lastChanged: string;
};

export type FolderDataWrapper = {
  projects: FolderDataStructure;
  areas: FolderDataStructure;
  resources: FolderDataStructure;
  archive: FolderDataStructure;
};
