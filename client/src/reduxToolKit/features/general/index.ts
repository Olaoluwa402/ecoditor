import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  Tab,
  File,
  Folder,
  GeneralState,
  CollectionFolder,
  ActionType,
} from "../../../interface";
import { AppDispatch } from "../../store";
import { getLanguage } from "../../../util";

export const openTabAction =
  (newFileName: string, content: any) =>
  (dispatch: AppDispatch, getState: any) => {
    const state = getState();
    const { tabs } = state.generalState;

    const newFile: File = {
      [newFileName]: {
        name: newFileName,
        content: content || "",
        language: getLanguage(newFileName),
      },
    };

    const newTab: Tab = {
      id: tabs.length + 1,
      title: newFileName,
      folderStructure: [],
      file: newFile,
    };

    dispatch(openFileInEditor({ tabId: newTab.id }));
    if (tabs.length >= 10) {
      toast.warn("You can only open maximum of 10 tabs concurrently");
      return;
    }
    //prevent adding tab that is already in tab list
    const existTab = tabs.find((tab: Tab) => tab.title == newFileName);
    if (existTab) {
      dispatch(openTab({ tab: existTab, exist: true }));
      return;
    }

    dispatch(openTab({ tab: newTab, exist: false }));
    //toast.success("Tab opened successfully!");
  };

export const addFileToFolderUserCollectionAction =
  (
    folderName: string,
    fileName: string,
    content?: string,
    parentFolderName?: string
  ) =>
  (dispatch: AppDispatch, getState: any) => {
    const state = getState();
    const { userCollection } = state.generalState;

    const addFileToFolderUserCollection = (
      currentFolder: CollectionFolder,
      fileName: string,
      content?: string
    ): CollectionFolder => {
      // Check if the currentFolder is the target folder
      if (currentFolder.name === folderName) {
        // Check if the fileName already exists in the files array
        const fileExists = currentFolder.files.some(
          (file) => file.name === fileName
        );

        if (!fileExists) {
          return {
            ...currentFolder,
            files: [...currentFolder.files, { name: fileName, content }],
          };
        }
      }

      // If the currentFolder has sub-folders, apply the function recursively
      if (currentFolder.folders && currentFolder.folders.length > 0) {
        return {
          ...currentFolder,
          folders: currentFolder.folders.map((subFolder) =>
            addFileToFolderUserCollection(subFolder, fileName, content)
          ),
        };
      }

      // If the currentFolder is not the target folder and has no sub-folders, return it unchanged
      return currentFolder;
    };

    // Map over the userCollection to apply the addFileToFolderUserCollection function
    const updatedUserCollection = userCollection.collections.map(
      (folder: CollectionFolder) =>
        addFileToFolderUserCollection(folder, fileName, content)
    );

    // If there's a parent folder, find it and add the new file
    if (parentFolderName && parentFolderName !== "") {
      const parentFolder = updatedUserCollection.find(
        (folder: CollectionFolder) => folder.name === parentFolderName
      );

      if (parentFolder) {
        const updatedParentFolder = addFileToFolderUserCollection(
          parentFolder,
          fileName,
          content
        );

        // Update the userCollection with the modified parent folder
        const index = updatedUserCollection.findIndex(
          (folder: CollectionFolder) => folder.name === parentFolderName
        );

        if (index !== -1) {
          updatedUserCollection[index] = updatedParentFolder;
        }
      }
    }

    dispatch(addFileToUserCollection(updatedUserCollection));
  };

export const addFolderToFolderUserCollectionAction =
  (parentFolderName: string, folderName: string) =>
  (dispatch: AppDispatch, getState: any) => {
    const state = getState();
    const { userCollection } = state.generalState;

    const addFolderToFolderUserCollection = (
      currentFolder: CollectionFolder,
      parentFolderName: string,
      folderName: string
    ): CollectionFolder => {
      // Check if the currentFolder is the target folder
      if (currentFolder.name === parentFolderName) {
        // Check if the folder already exists in the folders array
        const folderExists = currentFolder.folders?.some(
          (folder) => folder.name === folderName
        );

        if (!folderExists) {
          return {
            ...currentFolder,
            folders: [
              ...(currentFolder.folders || []),
              { name: folderName, files: [], folders: [] },
            ],
          };
        }
      }

      // If the currentFolder has sub-folders, apply the function recursively
      if (currentFolder.folders && currentFolder.folders.length > 0) {
        return {
          ...currentFolder,
          folders: currentFolder.folders.map((subFolder) =>
            addFolderToFolderUserCollection(
              subFolder,
              parentFolderName,
              folderName
            )
          ),
        };
      }

      // If the currentFolder is not the target folder and has no sub-folders, return it unchanged
      return currentFolder;
    };

    // Map over the userCollection to apply the addFolderToFolderUserCollection function
    const updatedUserCollection = userCollection.collections.map(
      (folder: CollectionFolder) =>
        addFolderToFolderUserCollection(folder, parentFolderName, folderName)
    );

    // If the target folder wasn't found and there is no parentFolderName, append the new folder directly to the collections array
    if (
      !updatedUserCollection.some(
        (folder: CollectionFolder) => folder.name === parentFolderName
      ) &&
      !parentFolderName
    ) {
      updatedUserCollection.push({ name: folderName, files: [], folders: [] });
    }
    dispatch(addFileToUserCollection(updatedUserCollection));
  };

// Action creator to add a file to the current tab and update tab title
export const addFileAction =
  (itemName: string, content?: string) => (dispatch: any, getState: any) => {
    const state = getState();
    const { tabs, activeTab } = state.generalState;

    if (activeTab !== null) {
      const currentTab = tabs.find((tab: Tab) => tab.id === activeTab);

      if (currentTab) {
        const newFile: File = {
          [itemName]: {
            name: itemName,
            content: content || "",
            language: getLanguage(itemName),
          },
        };

        const updatedTab = {
          ...currentTab,
          file: newFile,
          title: itemName,
        };

        dispatch(updateTab(updatedTab));

        //toast.success("File added successfully!");
      }
    }
  };

export const openFileInEditorAction = (file: File) => (dispatch: any) => {
  //@ts-ignore
  dispatch(openFileInEditor(file));
  toast.success("File opened in editor!");
};

export const editFileContentAction =
  (content: string) => (dispatch: any, getState: any) => {
    const state = getState();
    const { activeTab } = state.general;

    if (activeTab !== null) {
      const currentTab = state.general.tabs.find(
        (tab: Tab) => tab.id === activeTab
      );

      if (currentTab && currentTab.file) {
        const updatedFile = { ...currentTab.file, content };
        const updatedTab = { ...currentTab, file: updatedFile };

        dispatch(updateTab(updatedTab));
        toast.success("File content edited!");
      }
    }
  };

export const addFileToFolderAction =
  (folderId: number, itemName: string, content?: string) =>
  (dispatch: any, getState: any) => {
    const state = getState();
    const { tabs, activeTab } = state.general;

    if (activeTab !== null) {
      const currentTab = tabs.find((tab: Tab) => tab.id === activeTab);

      if (currentTab) {
        const folderIndex = currentTab.folderStructure.findIndex(
          (folder: Folder) => folder.id === folderId
        );

        if (folderIndex !== -1) {
          const newFile: File = {
            [itemName]: {
              name: itemName,
              content: content || "",
              language: getLanguage(itemName),
            },
          };

          const updatedFolder = {
            ...currentTab.folderStructure[folderIndex],
            files: [...currentTab.folderStructure[folderIndex].files, newFile],
          };

          const updatedFolderStructure = [...currentTab.folderStructure];
          updatedFolderStructure[folderIndex] = updatedFolder;

          const updatedTab = {
            ...currentTab,
            folderStructure: updatedFolderStructure,
          };

          dispatch(updateTab(updatedTab));
          toast.success("File added to folder successfully!");
        }
      }
    }
  };

// Action creator to add a folder to the current tab
export const addFolderAction =
  (itemName: string, folderStructure?: Folder[]) =>
  (dispatch: any, getState: any) => {
    const state = getState();
    const { tabs, activeTab } = state.general;

    if (activeTab !== null) {
      const currentTab = tabs.find((tab: Tab) => tab.id === activeTab);

      if (currentTab) {
        const newFolder: Folder = {
          id: Date.now(),
          name: itemName,
          files: [],
          folders: folderStructure || [],
        };

        currentTab.folderStructure = [newFolder];
        dispatch(updateTab(currentTab));
        toast.success("Folder added successfully!");
      }
    }
  };

// Action creator to update a tab
export const updateTabAction = (tab: Tab) => (dispatch: any) => {
  dispatch(updateTab(tab));
  toast.success("Tab updated successfully!");
};

const UserCollection = {
  collections: [
    {
      name: "project 1",
      files: [
        // { name: "hello1.ts" },
        // { name: "hello0000000000000000000000000002.ts" },
      ],
      // folders: [
      //   {
      //     name: "Subfolder 1",
      //     files: [{ name: "hello3.py" }, { name: "hello4.py" }],
      //     folders: [],
      //   },
      // ],
    },
    // {
    //   name: "Project 2",
    //   files: [{ name: "hello6.ts" }, { name: "hello7.py" }],
    //   folders: [],
    // },
    // {
    //   name: "Project 3",
    //   files: [
    //     { name: "hello8.ts" },
    //     { name: "hello9.py" },
    //     { name: "hello10.py" },
    //     { name: "hello11.py" },
    //   ],
    //   folders: [],
    // },
  ],
};

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    tabs: [
      {
        id: 1,
        title: "untitled",
        folderStructure: [] as Folder[],
        file: undefined,
      },
    ],
    modalIsOpen: false,
    activeTab: 1,
    newFileName: "",
    userCollection: UserCollection,
    showOpenFile: false,
    actionType: ActionType.ADD_FILE,
    rootFolderName: "",
  } as GeneralState,
  reducers: {
    openTab: (state, action: PayloadAction<{ tab: Tab; exist: boolean }>) => {
      if (action.payload.exist) {
        state.tabs = [...state.tabs];
        state.activeTab = action.payload.tab.id;
        return;
      }
      state.tabs = [...state.tabs, action.payload.tab];
      state.activeTab = action.payload.tab.id;
    },
    closeTab: (state, action: PayloadAction<number>) => {
      // Close the tab with the given ID
      state.tabs = state.tabs.filter((tab) => tab.id !== action.payload);
      // If the closed tab was the active one, set activeTab to null or choose a new active tab
      if (state.activeTab === action.payload) {
        state.activeTab = state.tabs.length > 0 ? state.tabs[0].id : null;
      }
    },

    updateTab: (state, action: PayloadAction<Tab>) => {
      const index = state.tabs.findIndex((tab) => tab.id === action.payload.id);
      if (index !== -1) {
        state.tabs[index] = action.payload;
      }
    },

    addFileToUserCollection: (
      state,
      action: PayloadAction<CollectionFolder[]>
    ) => {
      state.userCollection.collections = action.payload;
    },

    openFileInEditor: (state, action: PayloadAction<{ tabId: number }>) => {
      console.log(action.payload.tabId, "tabId");
      state.activeTab = action.payload.tabId;
    },
    setActionType: (
      state,
      action: PayloadAction<{ actionType: ActionType }>
    ) => {
      state.actionType = action.payload.actionType;
    },
    setShowOpenFile: (state, action: PayloadAction<{ value?: boolean }>) => {
      state.showOpenFile = action.payload.value;
    },
    setRootFolderName: (state, action: PayloadAction<{ value: string }>) => {
      state.rootFolderName = action.payload.value;
    },
  },
  // extraReducers: (builder) => {
  //   // Add extra reducers if needed
  // },
});

export const {
  openTab,
  closeTab,
  updateTab,
  openFileInEditor,
  addFileToUserCollection,
  setActionType,
  setShowOpenFile,
  setRootFolderName,
} = generalSlice.actions;

export default generalSlice.reducer;
