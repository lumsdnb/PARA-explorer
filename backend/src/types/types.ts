//markdown types

export type File = {
  title: string
  body: string
  tags: string[]
}

export type Folder = {
  id: FolderType
  files: File[]
}

export type FolderGroup = {
  inbox: Folder
  projects: Folder
  areas: Folder
  resources: Folder
  archive: Folder
}

export enum FolderType {
  Project = 'project',
  Area = 'area',
  Resource = 'resource',
  Archive = 'archive',
}
