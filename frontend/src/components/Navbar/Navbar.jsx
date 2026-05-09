import React, { useContext, useState } from "react";
import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";

import { StoreContext } from "../../context/StoreContext";

import { GiForkKnifeSpoon } from "react-icons/gi";

import { HiShoppingBag } from "react-icons/hi2";

import { RiLogoutCircleLine } from "react-icons/ri";

import { HiOutlineMenu, HiX } from "react-icons/hi";
import { FaBoxOpen } from "react-icons/fa";

const Navbar = () => {
  const { token, setToken, setShowLogin, user, menu, setMenu, cartItems } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ profile dropdown state
  const [profileOpen, setProfileOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken("");

    navigate("/");
  };

  // check cart items
  const hasCartItems = Object.values(cartItems || {}).some((qty) => qty > 0);

  return (
    <div className="navbar bg-gradient-to-t from-black to-black/95 border-b border-amber-300/20 relative z-50">
      <div className="nav-container px-4 sm:px-6 flex items-center justify-between">
        {/* LOGO */}
        <Link to="/">
          <div className="relative text-amber-300">
            <h1 className="tracking-[2px] sm:tracking-[4px] font-extralight text-[13px]">
              YumRush
            </h1>

            <GiForkKnifeSpoon className="absolute -right-7 bottom-0 text-[30px]" />
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="navbar-menu hidden sm:flex list-none gap-6 sm:gap-14 text-white uppercase tracking-[3px] text-[11px] sm:text-[12px] font-extralight p-2 sm:p-3 flex-wrap sm:flex-nowrap">
          <Link
            to="/"
            onClick={() => setMenu("home")}
            className={`relative pb-1 ${menu === "home" ? "after:w-full" : ""}`}
          >
            Home
          </Link>

          <Link
            to="/menu"
            onClick={() => setMenu("menu")}
            className={`relative pb-1 ${menu === "menu" ? "after:w-full" : ""}`}
          >
            Menu
          </Link>

          <a
            href="#footer"
            onClick={() => setMenu("contact us")}
            className={`relative pb-1 ${
              menu === "contact us" ? "after:w-full" : ""
            }`}
          >
            Contact us
          </a>
        </ul>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4 sm:gap-8">
          {/* CART */}
          <div className="block relative text-white/70">
            <Link
              to="/cart"
              onClick={() => {
                setMenu("cart");
                setMobileOpen(false);
              }}
            >
              <HiShoppingBag className="text-[23px]" />
            </Link>

            {hasCartItems && (
              <div className="absolute w-2 h-2 bg-amber-400 rounded-full top-0 right-0"></div>
            )}
          </div>

          {/* AUTH */}
          {!token ? (
            <button
              className="btn-mini cursor-pointer text-[11px] sm:text-sm hidden sm:block"
              onClick={() => {
                setShowLogin(true);
                setMenu("sign in");
              }}
            >
              sign in
            </button>
          ) : (
            /* DESKTOP PROFILE */
            <div className="hidden sm:block relative">
              {/* AVATAR */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="
                  w-9 h-9
                  flex items-center justify-center
                  bg-amber-400
                  text-black
                  font-bold
                  rounded-full
                  cursor-pointer
                  hover:scale-105
                  transition
                "
              >
                {user?.name
                  ?.split(" ")
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()}
              </button>

              {/* DROPDOWN */}
              {profileOpen && (
                <div
                  className="
                            absolute right-0 mt-3
                            w-68
                            bg-[#141414]
                            border border-[#242424]
                            rounded-2xl
                            overflow-hidden
                            shadow-[0_10px_40px_rgba(0,0,0,0.5)]
                            backdrop-blur-xl
                            z-50
                            "
                >
                  {/* PROFILE INFO */}
                  <div className="p-5 border-b border-[#242424]">
                    <div className="flex items-center gap-4">
                      {/* AVATAR */}
                      <div
                        className="
            w-11 h-11
            rounded-full
            bg-amber-400
            text-black
            flex items-center justify-center
            font-bold
            text-lg
            flex-shrink-0
          "
                      >
                        {user?.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toUpperCase()}
                      </div>

                      {/* USER DETAILS */}
                      <div className="min-w-0">
                        <h2 className="text-white text-sm font-medium truncate">
                          {user?.name}
                        </h2>

                        <p className="text-gray-500 text-xs mt-1 break-all">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* MENU */}
                  <div className="flex flex-col py-2">
                    {/* MY ORDERS */}
                    <Link
                      to="/myorders"
                      onClick={() => {
                        setProfileOpen(false);
                        setMenu("myorders");
                      }}
                      className="
          flex items-center gap-3
          px-5 py-3
          text-sm text-white
          hover:bg-[#1a1a1a]
          transition
        "
                    >
                      <FaBoxOpen className="text-[18px] text-white" />

                      <span className="text-white">My Orders</span>
                    </Link>

                    {/* LOGOUT */}
                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                      className="
          flex items-center gap-3
          px-5 py-3
          text-sm text-white
          hover:bg-[#1a1a1a]
          transition
          text-left
        "
                    >
                      <RiLogoutCircleLine className="text-[18px] text-red-400" />

                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MOBILE MENU BUTTON */}
          <div className="sm:hidden text-white text-2xl cursor-pointer">
            {mobileOpen ? (
              <HiX onClick={() => setMobileOpen(false)} />
            ) : (
              <HiOutlineMenu onClick={() => setMobileOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileOpen && (
        <div
          className="
            sm:hidden
            absolute top-full left-0
            w-full
            bg-black/95
            border-t border-amber-300/20
            flex flex-col items-center
            gap-5
            py-6
            text-white
            uppercase
            tracking-[3px]
            text-[12px]
            z-50
          "
        >
          {/* PROFILE */}
          {token && (
            <div className="flex flex-col items-center gap-2 pb-4 border-b border-neutral-700 w-full">
              <div className="w-11 h-11 text-[14px] flex items-center justify-center bg-amber-400 text-black font-bold rounded-full">
                {user?.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </div>

              <p className="text-sm text-gray-200 normal-case">{user?.name}</p>

              <p className="text-xs text-gray-400 normal-case break-all px-4 text-center">
                {user?.email}
              </p>
            </div>
          )}

          {/* NAV ITEMS */}
          <Link
            to="/"
            onClick={() => {
              setMenu("home");
              setMobileOpen(false);
            }}
          >
            Home
          </Link>

          <Link
            to="/menu"
            onClick={() => {
              setMenu("menu");
              setMobileOpen(false);
            }}
          >
            Menu
          </Link>

          <a
            href="#footer"
            onClick={() => {
              setMenu("contact us");
              setMobileOpen(false);
            }}
          >
            Contact us
          </a>

          {/* CART */}
          <Link
            to="/myorders"
            onClick={() => {
              setMenu("cart");
              setMobileOpen(false);
            }}
            className="flex items-center gap-2"
          >
            <span className="text-white">My Orders</span>
          </Link>

          {/* AUTH */}
          {!token ? (
            <button
              className="btn-mini"
              onClick={() => {
                setShowLogin(true);
                setMobileOpen(false);
                setMenu("sign in");
              }}
            >
              sign in
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setMobileOpen(false);
              }}
              className="flex items-center gap-2 text-red-400 text-[15px]"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
