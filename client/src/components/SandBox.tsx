import React, { useEffect, useState } from "react";
import CodeEditor from "./CodeEditor";
//import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../reduxToolKit/store";
import { closeTab, openFileInEditor } from "../reduxToolKit/features/general";
import { MdClose } from "react-icons/md";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../reduxToolKit/store";
import { truncateText } from "../util";
import { Tab } from "../interface";

const SandBox: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tabs, activeTab } = useSelector(
    (store: RootState) => store.generalState
  );

  const [output, setOutput] = useState<string | null>(null);
  const [activeTabDetail, setActiveTabDetail] = useState<Tab>();

  let name = "js";
  if (name === "py") {
    setOutput(null);
  }

  useEffect(() => {
    if (activeTab) {
      setActiveTabDetail(tabs.find((tab) => tab.id === activeTab));
    }
  }, [activeTab]);

  // const executeCode = async () => {
  //   console.log(`Executing code for tab: ${activeTab}`);

  //   try {
  //     // Make an API call to your Python server
  //     const response = await axios.post(
  //       "http://your-python-server/api/execute",
  //       {
  //         code: "code", // Pass the code to execute
  //       }
  //     );

  //     // Handle the response from the server
  //     console.log("Server Response:", response.data);
  //   } catch (error: any) {
  //     // Handle errors
  //     console.error("Error executing code:", error.message);
  //   }

  //   console.log(`Code execution completed for tab: ${activeTab}`);
  // };

  return (
    <div className="w-full">
      <div className="w-full ">
        <div className="w-full mx-auto ml-5">
          {tabs?.length > 0 && (
            <div className="w-full rounded-lg border border-gray-300  py-2 px-3">
              <nav className="flex flex-wrap gap-4">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`tab ${
                      activeTab === tab.id ? "bg-blue-300" : ""
                    } w-[120px] border whitespace-nowrap inline-flex justify-between gap-3 rounded-lg py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:bg-gray-200 hover:text-gray-900`}
                  >
                    <span
                      onClick={() =>
                        dispatch(openFileInEditor({ tabId: tab.id }))
                      }
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
          )}
        </div>
      </div>
      <div className="flex items-stretch p-5">
        <div className="flex-1">
          <div className="w-full h-[100vh]">
            {activeTabDetail && (
              <CodeEditor
                fileName={
                  Object.keys(activeTabDetail.file || {})[0] || "Untitled"
                }
                isActive={activeTab === activeTabDetail.id}
                code={
                  Object.values(activeTabDetail.file || {})[0]?.content || ""
                }
                language={
                  Object.values(activeTabDetail.file || {})[0]?.language ||
                  "typescript"
                }
              />
            )}
          </div>
        </div>
        <div className="flex-1 bg-slate-400">
          {" "}
          <button
            className="bg-blue-600 p-1 mr-3 text-white rounded cursor-pointer"
            // onClick={executeCode}
          >
            Save
          </button>
          <button
            className="bg-blue-600 p-1 text-white rounded cursor-pointer"
            // onClick={executeCode}
          >
            Execute Code
          </button>
          {output && <div className="">{output}</div>}
        </div>
      </div>
    </div>
  );
};

export default SandBox;
