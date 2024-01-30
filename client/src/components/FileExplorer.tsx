import React, { useState } from "react";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { FaFolderPlus, FaFile, FaFolderMinus } from "react-icons/fa6";
import { FaTrash, FaEdit } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { toast } from "react-toastify";
import { addFileAction } from "../reduxToolKit/features/general";
import { AppDispatch, RootState } from "../reduxToolKit/store";
import {
  openTabAction,
  addFileToFolderUserCollectionAction,
  addFolderToFolderUserCollectionAction,
  setRootFolderName,
  setActionType,
  setShowOpenFile,
} from "../reduxToolKit/features/general";
import { truncateText } from "../util";
import { ActionType } from "../interface";

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
  name: string;
  level?: number;
}

const FolderComponent: React.FC<FolderProps> = ({
  folder,
  name,
  level = 0,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { showOpenFile } = useSelector(
    (store: RootState) => store.generalState
  );

  const [isOpen, setIsOpen] = useState(true);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const onEdit = () => {
    // Placeholder for edit folder or file logic
    console.log("Edit folder or file:", folder.name);
  };

  const onDelete = () => {
    // Placeholder for delete folder or file logic
    console.log("Delete folder or file:", folder.name);
  };

  return (
    <div className={`pl-${level * 4} py-2`}>
      <h3 className="text-sm font-semibold mb-1 cursor-pointer">
        <div className="flex justify-between items-center">
          <div className="flex items-center" onClick={handleToggle}>
            {isOpen ? (
              <FaFolderMinus size={16} className="mr-1" />
            ) : (
              <FaFolderPlus size={16} className="mr-1" />
            )}
            <span>{truncateText(folder.name, 10)}</span>
          </div>
          <div className="ml-2 flex space-x-1 items-center text-gray-600">
            <FaFile
              size={12}
              className="cursor-pointer hover:text-white"
              onClick={() => {
                dispatch(setRootFolderName({ value: folder.name }));
                dispatch(setActionType({ actionType: ActionType.ADD_FILE }));
                dispatch(setShowOpenFile({ value: !showOpenFile }));
              }}
            />
            <FaFolderPlus
              size={12}
              className="cursor-pointer hover:text-white"
              onClick={() => {
                dispatch(setRootFolderName({ value: folder.name }));
                dispatch(setActionType({ actionType: ActionType.ADD_FOLDER }));
                dispatch(setShowOpenFile({ value: !showOpenFile }));
              }}
            />
            <FaEdit
              size={12}
              className="cursor-pointer hover:text-white"
              onClick={onEdit}
            />
            <FaTrash
              size={12}
              className="cursor-pointer hover:text-white"
              onClick={onDelete}
            />
          </div>
        </div>
      </h3>
      {isOpen && (
        <ul>
          {folder.files?.length > 0 &&
            folder.files.map((file, fileIndex) => (
              <li
                key={fileIndex}
                className="flex justify-between items-center pl-4"
              >
                <div className="flex items-center">
                  <BsFillFileEarmarkPlusFill size={16} className="mr-1" />
                  <span
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(openTabAction(file.name, file.name));
                    }}
                  >
                    {truncateText(file.name, 10)}
                  </span>
                </div>
                <div className="ml-2 space-x-1 flex items-center text-gray-600">
                  <FaEdit
                    size={12}
                    className="cursor-pointer hover:text-white"
                    onClick={onEdit}
                  />
                  <FaTrash
                    size={12}
                    className="cursor-pointer hover:text-white"
                    onClick={onDelete}
                  />
                </div>
              </li>
            ))}
          {folder.folders?.length > 0 &&
            folder.folders.map((subFolder, subFolderIndex) => (
              <li key={subFolderIndex}>
                <FolderComponent
                  folder={subFolder}
                  name={name}
                  level={level + 1}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

interface FileExplorerProp {}
const FileExplorer: React.FC<FileExplorerProp> = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userCollection, rootFolderName, actionType, showOpenFile } =
    useSelector((store: RootState) => store.generalState);

  const [name, setName] = useState("");

  const submitHandler = () => {
    if (!name) {
      toast.warn("Field is required");
      return;
    }

    switch (actionType) {
      case ActionType.ADD_FILE:
        // Check if the file name ends with either '.ts' or '.py'
        const isValidFile = /\.(ts|py)$/.test(name);
        if (isValidFile) {
          dispatch(addFileAction(name));
          console.log(rootFolderName, "pName");
          dispatch(addFileToFolderUserCollectionAction(rootFolderName, name));
          dispatch(setShowOpenFile({ value: false }));
          setName("");
        } else {
          // Handle the case when the file name is invalid
          toast.warn("Invalid file name. It should end with .ts or .py");
          return;
        }
        break;
      case ActionType.ADD_FOLDER:
        console.log(rootFolderName, "pName");
        dispatch(addFolderToFolderUserCollectionAction(rootFolderName, name));
        dispatch(setShowOpenFile({ value: false }));
        setName("");
        break;
      default:
        break;
    }
  };
  return (
    <div className="bg-gray-800 text-white p-4">
      {userCollection.collections?.length > 0 &&
        userCollection.collections.map((folder, index) => (
          <FolderComponent key={index} folder={folder} name={name} />
        ))}

      {showOpenFile && (
        <div className="w-[100%] flex items-center my-2">
          <input
            type="text"
            placeholder={
              actionType === ActionType.ADD_FILE
                ? "name.ts or name.py"
                : "add folder name"
            }
            value={name}
            onChange={(e) => setName(e.target.value)}
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
