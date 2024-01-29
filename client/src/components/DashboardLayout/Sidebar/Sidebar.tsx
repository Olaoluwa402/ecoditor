import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import { toast } from "react-toastify";
import { logoutAction } from "../../../reduxToolKit/features/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../reduxToolKit/store";
import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { FaFolderPlus } from "react-icons/fa6";
import FileExplorer from "../../FileExplorer";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useSelector((store: RootState) => store.loggedInUser);
  const [showOpenFile, setShowOpenFile] = useState(false);

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
              <button className="bg-blue-500 p-1 rounded">New Project</button>
            </div>
            <div className="flex gap-2">
              <BsFillFileEarmarkPlusFill
                onClick={() => setShowOpenFile((prev) => !prev)}
                size={20}
                className="cursor-pointer"
              />
              <FaFolderPlus size={20} className="cursor-pointer" />
            </div>
          </div>

          <FileExplorer
            showOpenFile={showOpenFile}
            setShowOpenFile={setShowOpenFile}
          />

          <div className="my-6 mt-auto ml-10 flex cursor-pointer">
            <div>
              <img
                className="h-12 w-12 rounded-full"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
            </div>
            <div className="ml-3">
              <p className="font-medium capitalize">{user?.user?.username}</p>
              <button onClick={logoutHandler}>logout</button>
            </div>
          </div>
        </div>
        {/* <!-- /Sidebar --> */}
      </div>
    </div>
  );
};

export default Sidebar;
