import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { HiShoppingBag } from "react-icons/hi2";
import { RiLogoutCircleLine } from "react-icons/ri";
const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, setToken, setShowLogin, user } =
    useContext(StoreContext);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
          <Link
            to={"/menu"}
            onClick={() => setMenu("menu")}
            className={menu === "menu" ? "pb-2 border-b-2 " : ""}
          >
            Menu
          </Link>
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
                className={`
                   hover:text-amber-200
                   hover:scale-110
                   transition-all
                   duration-200
                  ${
                    menu === "cart"
                      ? " text-amber-200 text-[23px]"
                      : "text-[23px]"
                  }`}
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
              className="btn-mini cursor-pointer"
              onClick={() => {
                setShowLogin(true);
                setMenu("sign in");
              }}
            >
              sign in
            </button>
          ) : (
            <div className="relative group">
              {/* Avatar */}
              <div className="w-10 h-10 flex items-center justify-center bg-amber-400 text-black font-bold rounded-full cursor-pointer hover:scale-105 transition">
                {user?.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </div>

              {/* Dropdown */}
              <div className="absolute right-0 mt-3 w-50 bg-neutral-900 border border-neutral-800 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                {/* User Info */}
                <div className="flex flex-col items-center py-4 border-b border-neutral-800">
                  <div className="w-12 h-12 flex items-center justify-center border-2 border-amber-400 text-amber-400 font-bold rounded-full mb-2">
                    {user?.name
                      ?.split(" ")
                      .map((word) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  <p className="text-sm text-gray-200">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>

                {/* Menu */}
                <ul className="py-2 text-sm">
                  <li
                    onClick={() => navigate("/myorders")}
                    className="flex items-center gap-3 px-4 py-2 text-gray-300  hover:bg-gray-800 hover:text-white cursor-pointer transition"
                  >
                    <HiShoppingBag />
                    <span>Orders</span>
                  </li>

                  <li
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-gray-800 hover:text-red-300 cursor-pointer transition"
                  >
                    <RiLogoutCircleLine />
                    <span>Logout</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
