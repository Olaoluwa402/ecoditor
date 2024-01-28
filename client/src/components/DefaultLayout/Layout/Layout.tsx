import React, { ReactNode } from "react";
import styles from "./Layout.module.css";
import Navigation from "../Navigation/Navigation";
//import SideBar from "../SiderBar/SideBar";
import Footer from "../Footer/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="">
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
      {/* Navigation */}
      <Navigation />
      {/* siderbar */}
      {/* <SideBar /> */}
      {/* main - pages*/}
      <div className={styles.main}>{children}</div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default Layout;
