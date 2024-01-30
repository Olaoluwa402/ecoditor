import React from "react";
import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import { logoutAction } from "../../../reduxToolKit/features/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxToolKit/store";
import { FaFolderPlus } from "react-icons/fa6";
import FileExplorer from "../../FileExplorer";
import { ActionType } from "../../../interface";
import {
  setRootFolderName,
  setActionType,
  setShowOpenFile,
} from "../../../reduxToolKit/features/general";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((store: RootState) => store.loggedInUser);
  const { showOpenFile } = useSelector(
    (store: RootState) => store.generalState
  );

  function logoutHandler() {
    dispatch(logoutAction());
  }

  return (
    <div>
      <div className="min-h-screen  bg-gray-50">
        {/* <!-- Sidebar --> */}
        <div className="absolute left-0 flex h-screen w-64 flex-col overflow-hidden rounded-r-2xl bg-gray-700 text-white">
          <h1
            onClick={() => navigate("/")}
            className="mt-10 ml-10 text-3xl font-bold cursor-pointer"
          >
            eEDITOR
          </h1>
          <div className="h-[30px] w-[100%] flex justify-between items-center gap-2 mt-10 mb-2 px-5">
            <div>
              <button
                className="bg-blue-500 hover:bg-blue-600 p-1 rounded"
                onClick={() => {
                  dispatch(
                    setActionType({ actionType: ActionType.ADD_FOLDER })
                  );
                  dispatch(setRootFolderName({ value: "" }));
                  dispatch(setShowOpenFile({ value: !showOpenFile }));
                }}
              >
                New Project
              </button>
            </div>
            <div className="flex gap-2">
              <FaFolderPlus
                size={20}
                className="cursor-pointer hover:text-slate-500"
                onClick={() => {
                  dispatch(setRootFolderName({ value: "" }));
                  dispatch(
                    setActionType({ actionType: ActionType.ADD_FOLDER })
                  );
                  dispatch(setShowOpenFile({ value: !showOpenFile }));
                }}
              />
            </div>
          </div>

          <FileExplorer />

          <div className="my-6 mt-auto ml-10 flex">
            <div>
              <img
                className="h-12 w-12 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            </div>
            <div className="ml-3">
              <p className="font-medium capitalize">{user?.user?.username}</p>
              <button
                className="rounded bg-red-900 hover:bg-red-400 text-white my-2 px-3 cursor-pointer"
                onClick={logoutHandler}
              >
                logout
              </button>
            </div>
          </div>
        </div>
        {/* <!-- /Sidebar --> */}
      </div>
    </div>
  );
};

export default Sidebar;
