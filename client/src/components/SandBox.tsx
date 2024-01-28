// TabBar.tsx
import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
import Modal from "react-modal";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../reduxToolKit/store";

// interface Tab {
//   id: number;
//   title: string;
// }

const TabBar: React.FC = () => {
  const { tabs } = useSelector((store: RootState) => store.generalState);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newFileName, setNewFileName] = useState<string>("");
  const [newFileExtension, setNewFileExtension] = useState<string>(".js");
  const [activeTab, setActiveTab] = useState<number | null>(null);
  
  let name = "js"
  if(name ==="py"){
    setModalIsOpen(false);
  }
  const addTab = () => {
    // const newTab: Tab = {
    //   id: Date.now(),
    //   title: newFileName || `Tab ${tabs.length + 1}`,
    // };
    // setTabs([...tabs, newTab]);
    // setModalIsOpen(false);
    // setActiveTab(newTab.id);
    // setNewFileName(""); // Reset newFileName after creating a new tab
    // setNewFileExtension(".js"); // Reset newFileExtension after creating a new tab
  };

  const closeTab = (id: number) => {
    console.log(id);
    //setTabs(tabs.filter((tab) => tab.id !== id));
    // setActiveTab(null);
  };

  // const openModal = () => {
  //   // setModalIsOpen(true);
  // };

  const closeModal = () => {
    // setModalIsOpen(false);
  };

  const createNewFile = () => {
    if (newFileName.trim() === "") {
      // Handle empty file name
      return;
    }

    addTab(); // Call the addTab function to create a new tab
  };

  const executeCode = async () => {
    console.log(`Executing code for tab: ${activeTab}`);

    try {
      // Make an API call to your Python server
      const response = await axios.post(
        "http://your-python-server/api/execute",
        {
          code: "code", // Pass the code to execute
        }
      );

      // Handle the response from the server
      console.log("Server Response:", response.data);
    } catch (error: any) {
      // Handle errors
      console.error("Error executing code:", error.message);
    }

    console.log(`Code execution completed for tab: ${activeTab}`);
  };

  return (
    <div>
      <div>
        <div className="mx-auto ml-20">
          <div className="rounded-lg border border-gray-300 bg-white py-2 px-3">
            <nav className="flex flex-wrap gap-4">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`tab ${
                    activeTab === tab.id ? "active" : ""
                  } min-w-[90px] whitespace-nowrap inline-flex justify-between rounded-lg py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-900`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span>{tab.title}</span>
                  <button onClick={() => closeTab(tab.id)}>X</button>
                </div>
              ))}
            </nav>
          </div>
        </div>

        {/* {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.title}
            <button onClick={() => closeTab(tab.id)}>X</button>
          </div>
        ))}
        <button onClick={openModal}>+</button> */}
      </div>
      <div>
        {tabs.map((tab) => (
          <div key={tab.id} className="editor-container">
            <CodeEditor
              fileName={tab.title}
              extension={newFileExtension}
              isActive={activeTab === tab.id}
              executeCode={executeCode}
              onChange={() => {}}
            />
          </div>
        ))}
      </div>

      {/* Modal for creating a new file */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="New File Modal"
      >
        <h2>Create a New File</h2>
        <label>
          File Name:
          <input
            type="text"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
          />
        </label>
        <label>
          Extension:
          <select
            value={newFileExtension}
            onChange={(e) => setNewFileExtension(e.target.value)}
          >
            <option value=".js">.js</option>
            <option value=".ts">.ts</option>
            {/* Add more extensions as needed */}
          </select>
        </label>
        <button onClick={createNewFile}>Create</button>
      </Modal>
    </div>
  );
};

export default TabBar;
