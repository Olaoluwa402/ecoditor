import React from "react";
import code1 from "../../../assets/code-2.png";
import { Link } from "react-router-dom";
//import styles from "./Footer.module.css";
const Footer: React.FC = () => {
  return (
    <footer className="relative mt-20 bg-gray-900 px-4 pt-20">
      <div className="absolute -top-10 left-1/2 h-16 w-16 -translate-x-1/2 rounded-xl border-4 border-sky-500 bg-white p-2">
        <img className="h-full object-cover" src={code1} alt="" />
      </div>
      <nav
        aria-label="Footer Navigation"
        className="mx-auto mb-10 flex max-w-lg flex-col gap-10 text-center sm:flex-row sm:text-left"
      >
        <Link to="/pricing" className="font-medium text-white">
          Pricing
        </Link>
        <Link to="/about" className="font-medium text-white">
          About
        </Link>
        <Link to="/contact" className="font-medium text-white">
          Contact
        </Link>
        <Link to="/faq" className="font-medium text-white">
          FAQ
        </Link>
        <Link to="/privacy" className="font-medium text-white">
          Privacy Policy
        </Link>
      </nav>
      <p className="py-10 text-center text-gray-300">
        © 2024 eCoditor | All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
