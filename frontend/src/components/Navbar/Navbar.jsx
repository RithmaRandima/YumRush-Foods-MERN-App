import React, { useContext, useState } from "react";
import "./Navbar.css";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);
  return (
    <div className="navbar">
      {/* logo */}
      <Link to="/">
        <div>
          <h1>logo</h1>
        </div>
      </Link>
      <ul className="navbar-menu flex list-none gap-5 text-[rgb(73,85,126)] text-[18px]">
        <Link
          to={"/"}
          onClick={() => setMenu("home")}
          className={menu === "home" ? "pb-2 border-b-2 " : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "pb-2 border-b-2 " : ""}
        >
          Menu
        </a>
        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "pb-2 border-b-2 " : ""}
        >
          Mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => setMenu("contact us")}
          className={menu === "contact us" ? "pb-2 border-b-2 " : ""}
        >
          Contact us
        </a>
      </ul>
      <div className="navbar-right flex items-center justify-between gap-10">
        <div className="flex gap-2 relative">
          <FaSearch />
          <Link to={"/cart"}>
            <FaShoppingBag />
          </Link>
          {/* dot icon */}
          {getTotalCartAmount() == 0 ? (
            <div className="absolute min-w-2.5 min-h-2.5 bg-red-400 rounded-full -top-2 -right-2"></div>
          ) : (
            <></>
          )}
        </div>
        <button
          className="bg-transparent text-[16px] cont-[#4955u7e] border border-red-400 px-5 py-2 text-red-300  cursor-pointer rounded-full hover:bg-red-400 duration-200"
          onClick={() => setShowLogin(true)}
        >
          sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
