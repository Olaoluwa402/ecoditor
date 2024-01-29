import React, { useState } from "react";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { FaFolderPlus, FaFolderMinus } from "react-icons/fa6";
import { MdSend } from "react-icons/md";
import { toast } from "react-toastify";
import { addFileAction } from "../reduxToolKit/features/general";
import { AppDispatch, RootState } from "../reduxToolKit/store";
import {
  openTabAction,
  addFileToFolderUserCollectionAction,
} from "../reduxToolKit/features/general";
import { truncateText } from "../util";

interface File {
  name: string;
}

interface Folder {
  name: string;
  files: File[];
  folders: Folder[];
}

interface FolderProps {
  folder: Folder;
  level?: number;
}

const FolderComponent: React.FC<FolderProps> = ({ folder, level = 0 }) => {
  const dispatch = useDispatch<AppDispatch>();
  // const { userCollection } = useSelector(
  //   (store: RootState) => store.generalState
  // );
  //const [activeFolder, setActiveFolder] = useState("project 1");
  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // const folderClickHandler = (folderName: string) => {
  //   setActiveFolder(folderName);
  // };

  return (
    <div className={`pl-${level * 4} py-2`}>
      <h3
        className="text-sm font-semibold mb-1 cursor-pointer"
        onClick={handleToggle}
      >
        <div className="flex items-center">
          {isOpen ? (
            <FaFolderMinus size={16} className="mr-1" />
          ) : (
            <FaFolderPlus size={16} className="mr-1" />
          )}
          <span>{truncateText(folder.name, 10)}</span>
        </div>
      </h3>
      {isOpen && (
        <ul>
          {folder.files?.length > 0 &&
            folder.files.map((file, fileIndex) => (
              <li key={fileIndex} className="flex items-center pl-4">
                <BsFillFileEarmarkPlusFill size={16} className="mr-1" />
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(openTabAction(file.name, file.name));
                  }}
                >
                  {truncateText(file.name, 10)}
                </span>
              </li>
            ))}
          {folder.folders?.length > 0 &&
            folder.folders.map((subFolder, subFolderIndex) => (
              <li key={subFolderIndex}>
                <FolderComponent folder={subFolder} level={level + 1} />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

interface FileExplorerProp {
  showOpenFile: boolean;
  setShowOpenFile: (setShowOpenFile: boolean) => void;
}
const FileExplorer: React.FC<FileExplorerProp> = ({
  showOpenFile,
  setShowOpenFile,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userCollection } = useSelector(
    (store: RootState) => store.generalState
  );
  const [fileName, setFileName] = useState("");

  const submitHandler = () => {
    if (!fileName) {
      toast.warn("Field is required");
      return;
    }
    // Check if the file name ends with either '.ts' or '.py'
    const isValidFile = /\.(ts|py)$/.test(fileName);
    if (isValidFile) {
      dispatch(addFileAction(fileName));
      dispatch(addFileToFolderUserCollectionAction("project 1", fileName));
      setShowOpenFile(false);
      setFileName("");
    } else {
      // Handle the case when the file name is invalid
      toast.warn("Invalid file name. It should end with .ts or .py");
      return;
    }
  };
  return (
    <div className="bg-gray-800 text-white p-4">
      {userCollection.collections?.length > 0 &&
        userCollection.collections.map((folder, index) => (
          <FolderComponent key={index} folder={folder} />
        ))}

      {showOpenFile && (
        <div className="w-[100%] flex items-center my-2">
          <input
            type="text"
            placeholder="name.ts or name.py"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="p-1 text-black"
          />
          <div
            onClick={submitHandler}
            className="w-[30px] h-[33px] bg-blue-500 flex justify-center items-center cursor-pointer"
          >
            <MdSend />
          </div>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
