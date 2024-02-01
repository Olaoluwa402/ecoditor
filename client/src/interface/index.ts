export interface Tab {
  id: number;
  title: string;
  file?: File;
  folderName: string;
  folderStructure: Folder[];
}

interface Language {
  code: string;
  name: string;
}

export const supportedLanguages: Language[] = [
  { code: "ts", name: "typescript" },
  { code: "py", name: "python" },
];

interface FileInfo {
  name: string;
  content: string;
  language: string;
}

export interface File {
  [fileName: string]: FileInfo;
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

export interface CollectionFile {
  name: string;
  content?: string;
}

export interface CollectionFolder {
  name: string;
  files: CollectionFile[] | [];
  folders: CollectionFolder[];
}

export interface GeneralState {
  tabs: Tab[] | [];
  modalIsOpen: boolean;
  activeTab: number | null;
  newFileName: string;
  userCollection: {
    collections: CollectionFolder[];
  };
  showOpenFile: boolean | undefined;
  actionType: ActionType;
  rootFolderName: string | "";
}

export enum ActionType {
  ADD_FILE = "ADD_FILE",
  ADD_FOLDER = "ADD_FOLDER",
  EDIT_FILE = "EDIT_FILE",
  EDIT_FOLDER = "EDIT_FOLDER",
  DELETE_FILE = "DELETE_FILE",
  DELETE_FOLDER = "DELETE_FOLDER",
}
