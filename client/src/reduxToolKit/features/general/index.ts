import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Tab, File, Folder, GeneralState } from "../../../interface";
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

    //prevent adding tab that is already in tab list
    const exist = tabs.find((tab: Tab) => tab.title == newFileName);
    console.log(exist, "exist");
    if (exist) {
      return;
    }
    if (tabs.length >= 10) {
      toast.warn("You can only open maximum of 10 tabs concurrently");
      return;
    }
    dispatch(openTab(newTab));

    dispatch(openFileInEditor({ tabId: newTab.id }));
    toast.success("Tab opened successfully!");
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

        toast.success("File added successfully!");
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
  } as GeneralState,
  reducers: {
    openTab: (state, action: PayloadAction<Tab>) => {
      state.tabs = [...state.tabs, action.payload];
      state.activeTab = action.payload.id;
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
    openFileInEditor: (state, action: PayloadAction<{ tabId: number }>) => {
      console.log(action.payload.tabId, "tabId");
      state.activeTab = action.payload.tabId;
    },
  },
  // extraReducers: (builder) => {
  //   // Add extra reducers if needed
  // },
});

export const { openTab, closeTab, updateTab, openFileInEditor } =
  generalSlice.actions;

export default generalSlice.reducer;
