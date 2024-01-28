import React from "react";
//import Topbar from "./Topbar/Topbar";
import SideBar from "./Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const DashBoardLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* layout */}
      {/* <div className={styles.topbar}>
        <Topbar />
      </div> */}

      <div className={styles.sidebar}>
        <SideBar />
      </div>
      <main className={styles.main}>{<Outlet />}</main>
    </div>
  );
};

export default DashBoardLayout;
