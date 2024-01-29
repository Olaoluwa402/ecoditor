// TabBar.tsx
import React, { useState } from "react";
import CodeEditor from "./CodeEditor";
//import Modal from "react-modal";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../reduxToolKit/store";
import { closeTab } from "../reduxToolKit/features/general";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../reduxToolKit/store";
import { truncateText } from "../util";

// interface Tab {
//   id: number;
//   title: string;
// }

const SandBox: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tabs } = useSelector((store: RootState) => store.generalState);
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  //const [newFileName, setNewFileName] = useState<string>("");
  const [newFileExtension, setNewFileExtension] = useState<string>(".js");
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [output, setOutput] = useState<string | null>(null);

  let name = "js";
  if (name === "py") {
    //setModalIsOpen(false);
    setOutput(null);
    newFileExtension;
    setNewFileExtension("");
  }
  // const addTab = () => {
  //   // const newTab: Tab = {
  //   //   id: Date.now(),
  //   //   title: newFileName || `Tab ${tabs.length + 1}`,
  //   // };
  //   // setTabs([...tabs, newTab]);
  //   // setModalIsOpen(false);
  //   // setActiveTab(newTab.id);
  //   // setNewFileName(""); // Reset newFileName after creating a new tab
  //   // setNewFileExtension(".js"); // Reset newFileExtension after creating a new tab
  // };

  // const openModal = () => {
  //   // setModalIsOpen(true);
  // };

  // const closeModal = () => {
  //   // setModalIsOpen(false);
  // };

  // const createNewFile = () => {
  //   if (newFileName.trim() === "") {
  //     // Handle empty file name
  //     return;
  //   }

  //   addTab(); // Call the addTab function to create a new tab
  // };

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
    <div className="w-full">
      <div className="w-full ">
        <div className="w-full mx-auto ml-5">
          <div className="w-full rounded-lg border border-gray-300  py-2 px-3">
            <nav className="flex flex-wrap gap-4">
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`tab ${
                    activeTab === tab.id ? "active" : ""
                  } w-[120px] border whitespace-nowrap inline-flex justify-between gap-3 rounded-lg py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-900`}
                >
                  <span
                    onClick={() => setActiveTab(tab.id)}
                    className="cursor-pointer"
                  >
                    {truncateText(tab.title, 10)}
                  </span>
                  <button onClick={() => dispatch(closeTab(tab.id))}>
                    <MdClose />
                  </button>
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
        ))} */}
        {/* <button onClick={openModal}>+</button> */}
      </div>
      <div className="flex items-stretch p-5">
        <div className="flex-1">
          {tabs.map((tab) => (
            <div key={tab.id} className="w-full h-[100vh]">
              <CodeEditor
                fileName={Object.keys(tab.file || {})[0] || "Untitled"}
                isActive={activeTab === tab.id}
                code={Object.values(tab.file || {})[0]?.content || ""}
                language={
                  Object.values(tab.file || {})[0]?.language || "typescript"
                }
                // executeCode={executeCode}
                // onChange={() => {}}
              />
            </div>
          ))}
        </div>
        <div className="flex-1 bg-slate-400">
          {" "}
          <button
            className="bg-blue-600 p-1 text-white rounded cursor-pointer"
            onClick={executeCode}
          >
            Execute Code
          </button>
          {output && <div className="">{output}</div>}
        </div>
      </div>

      {/* Modal for creating a new file */}
      {/* <Modal
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
            
          </select>
        </label>
        <button onClick={createNewFile}>Create</button>
      </Modal> */}
    </div>
  );
};

export default SandBox;
