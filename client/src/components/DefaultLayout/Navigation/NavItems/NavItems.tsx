import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../../reduxToolKit/store";
//import styles from "./NavItems.module.css";

const NavItems: React.FC = () => {
  const { user } = useSelector((store: RootState) => store.loggedInUser);
  const items = [
    {
      id: 1,
      name: "Home",
      link: "/",
    },
    { id: 2, name: "Pricing", link: "/pricing" },
    {
      id: 3,
      name: "Contact",
      link: "/contact",
    },
    {
      id: 4,
      name: "FAQ",
      link: "/faq",
    },
  ];
  return (
    <nav
      aria-label="Header Navigation"
      className="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row"
    >
      <ul className="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0">
        {items.map((item) => {
          return (
            <li key={item.id} className="lg:mr-12">
              <NavLink
                className="rounded text-white transition focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2"
                to={item.link}
              >
                {item.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
      <hr className="mt-4 w-full lg:hidden" />
      <hr className="mt-4 w-full lg:hidden" />
      <div className="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0">
        {user ? (
          <NavLink
            to="/dashboard"
            title=""
            className="whitespace-nowrap rounded font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2 hover:text-opacity-50"
          >
            {" "}
            Dashboard{" "}
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            title=""
            className="whitespace-nowrap rounded font-medium transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-blue-700 focus:ring-offset-2 hover:text-opacity-50"
          >
            {" "}
            Log in{" "}
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default NavItems;
