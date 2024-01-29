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
          {/* <ul className="mt-20 space-y-3">
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </span>
              <span className="">Overview</span>
            </li>
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 font-semibold hover:bg-slate-600">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  />
                </svg>
              </span>
              <span className="">Transaction</span>
              <svg
                className="absolute -top-1/2 -right-1 h-32 w-8 text-gray-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="399.349 57.696 100.163 402.081"
                width="1em"
                height="4em"
              >
                <path
                  fill="currentColor"
                  d="M 499.289 57.696 C 499.289 171.989 399.349 196.304 399.349 257.333 C 399.349 322.485 499.512 354.485 499.512 458.767 C 499.512 483.155 499.289 57.696 499.289 57.696 Z"
                />
              </svg>
            </li>
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </span>
              <span className="">Send Money</span>
            </li>
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600">
              <span className="text-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  role="img"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 36 36"
                >
                  <path
                    fill="currentColor"
                    d="M32 15h-1V9a1 1 0 0 0-1-1H6a1 1 0 0 1-1-.82v-.36A1 1 0 0 1 6 6h23.58a1 1 0 0 0 0-2H6a3 3 0 0 0-3 3a3.08 3.08 0 0 0 0 .36v20.57A4.1 4.1 0 0 0 7.13 32H30a1 1 0 0 0 1-1v-6h1a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1Zm-3 15H7.13A2.11 2.11 0 0 1 5 27.93V9.88A3.11 3.11 0 0 0 6 10h23v5h-7a5 5 0 0 0 0 10h7Zm2-7h-9a3 3 0 0 1 0-6h9Z"
                    className="clr-i-outline clr-i-outline-path-1"
                  />
                  <circle
                    cx="23.01"
                    cy="20"
                    r="1.5"
                    fill="currentColor"
                    className="clr-i-outline clr-i-outline-path-2"
                  />
                  <path fill="none" d="M0 0h36v36H0z" />
                </svg>
              </span>
              <span className="">Payments</span>
            </li>
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </span>
              <span className="">Cards</span>
            </li>
            <li className="relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 text-gray-300 hover:bg-slate-600">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <span className="">Settings</span>
            </li>
          </ul> */}

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
