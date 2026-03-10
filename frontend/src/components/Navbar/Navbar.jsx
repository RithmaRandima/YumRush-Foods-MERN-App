import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { HiShoppingBag } from "react-icons/hi2";

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };
  return (
    <div className="navbar bg-gradient-to-t from-black to-black/95 border-b border-amber-300/20">
      <div className="nav-container">
        {/* logo */}
        <Link to="/">
          <div className="relative text-amber-300">
            <h1 className="text-amber-300 tracking-[4px] font-extralight text-[13px]">
              YumRush
            </h1>
            <GiForkKnifeSpoon className="absolute -right-7 -bottom-0 text-[30px]" />
          </div>
        </Link>

        {/* middle */}
        <ul className="navbar-menu flex list-none gap-13 text-white uppercase tracking-[3px] text-[12px] font-extralight p-3">
          <Link
            to={"/"}
            onClick={() => setMenu("home")}
            className={menu === "home" ? "pb-2 border-b-1 " : ""}
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
            App
          </a>
          <a
            href="#footer"
            onClick={() => setMenu("contact us")}
            className={menu === "contact us" ? "pb-2 border-b-2 " : ""}
          >
            Contact us
          </a>
        </ul>

        {/* right section */}
        <div className="navbar-right flex items-center justify-between gap-8">
          <div className="flex gap-2 relative text-white/60">
            {/* cart */}
            <Link to={"/cart"} onClick={() => setMenu("cart")}>
              <HiShoppingBag
                className={
                  menu === "cart"
                    ? " text-amber-200 text-[23px]"
                    : "text-[23px]"
                }
              />
            </Link>
            {/* dot icon */}
            {!getTotalCartAmount() == 0 ? (
              <div className="absolute min-w-1.5 min-h-1.5 bg-amber-400 rounded-full -top-0 -right-1"></div>
            ) : (
              <></>
            )}
          </div>
          {!token ? (
            <button
              className="btn-mini"
              onClick={() => {
                setShowLogin(true);
                setMenu("sign in");
              }}
            >
              sign in
            </button>
          ) : (
            <div className="navbar-profile bg-white">
              <div className="w-[30px] h-[30px] bg-red-300 rounded-full">
                <img src="" alt="" />
              </div>
              <ul className="nav-profile-dropdown">
                <li>
                  bag icon
                  <p>orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  logout icon
                  <p>logout</p>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
