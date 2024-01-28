import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { Tab, File, Folder, GeneralState } from "../../../interface";

// Action creator to open a new tab
export const openTabAction =
  (newFileName: string) => (dispatch: any, getState: any) => {
    const state = getState();
    const { tabs } = state.general;

    const newTab: Tab = {
      id: Date.now(),
      title: newFileName || `Tab ${tabs.length + 1}`,
      folderStructure: [],
      file: undefined,
    };

    dispatch(openTab(newTab));
    toast.success("Tab opened successfully!");
  };

// Action creator to add a file to the current tab
export const addFileAction =
  (itemName: string, content?: string) => (dispatch: any, getState: any) => {
    const state = getState();
    console.log(state, "state");
    const { tabs, activeTab } = state.generalState;

    if (activeTab !== null) {
      const currentTab = tabs.find((tab: Tab) => tab.id === activeTab);

      if (currentTab) {
        const newFile: File = {
          name: itemName,
          content: content || "",
        };

        currentTab.file = newFile;
        dispatch(updateTab(currentTab));
        toast.success("File added successfully!");
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
        title: "Tab 1",
        folderStructure: [] as Folder[],
        file: undefined,
      },
    ],
    modalIsOpen: false,
    activeTab: null,
    newFileName: "",
  } as GeneralState,
  reducers: {
    openTab: (state, action) => {
      state.tabs = [...state.tabs, action.payload];
      state.activeTab = action.payload.id;
    },
    updateTab: (state, action) => {
      const index = state.tabs.findIndex((tab) => tab.id === action.payload.id);
      if (index !== -1) {
        state.tabs[index] = action.payload;
      }
    },
    // Add other reducers as needed
  },
  // extraReducers: (builder) => {
  //   // Add extra reducers if needed
  // },
});

export const { openTab, updateTab } = generalSlice.actions;

export default generalSlice.reducer;
