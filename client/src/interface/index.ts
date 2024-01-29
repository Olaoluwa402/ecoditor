export interface Tab {
  id: number;
  title: string;
  file?: File;
  folderStructure: Folder[];
}

export interface File {
  name: string;
  content: string; // Assuming there is content associated with each file
}

export interface Folder {
  id: number;
  name: string;
  files: File[];
  folders: Folder[];
}

export enum ItemType {
  File = "file",
  Folder = "folder",
}

export interface GeneralState {
  tabs: Tab[];
  modalIsOpen: boolean;
  activeTab: number | null;
  newFileName: string;
}
