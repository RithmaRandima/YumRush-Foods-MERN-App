import React, { useContext, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { HiShoppingBag } from "react-icons/hi2";
import { RiLogoutCircleLine } from "react-icons/ri";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const {
    getTotalCartAmount,
    token,
    setToken,
    setShowLogin,
    user,
    menu,
    setMenu,
    cartItems,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken("");
    navigate("/");
  };

  const hasCartItems = Object.values(cartItems || {}).some((qty) => qty > 0);

  return (
    <div className="navbar bg-gradient-to-t from-black to-black/95 border-b border-amber-300/20 relative">
      <div className="nav-container px-4 sm:px-6 flex items-center justify-between">
        {/* logo */}
        <Link to="/">
          <div className="relative text-amber-300">
            <h1 className="text-amber-300 tracking-[4px] font-extralight text-[13px]">
              YumRush
            </h1>
            <GiForkKnifeSpoon className="absolute -right-7 -bottom-0 text-[30px]" />
          </div>
        </Link>

        {/* desktop menu (UNCHANGED) */}
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
            className={`relative pb-1 ${menu === "contact us" ? "after:w-full" : ""}`}
          >
            Contact us
          </a>
        </ul>

        {/* right section */}
        <div className="flex items-center gap-4 sm:gap-8">
          {/* cart */}
          <div className=" hidden sm:block flex gap-2 relative text-white/60">
            <Link to={"/cart"} onClick={() => setMenu("cart")}>
              <HiShoppingBag className="text-[23px]" />
            </Link>

            {hasCartItems && (
              <div className="absolute min-w-1.5 min-h-1.5 bg-amber-400 rounded-full -top-0 -right-1"></div>
            )}
          </div>

          {/* sign in */}
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
            <div className="hidden sm:block relative group">
              <div className="w-9 h-9 flex items-center justify-center bg-amber-400 text-black font-bold rounded-full">
                {user?.name
                  ?.split(" ")
                  .map((w) => w[0])
                  .join("")
                  .toUpperCase()}
              </div>
            </div>
          )}

          {/* mobile menu button (ONLY MOBILE) */}
          <div className="sm:hidden text-white text-2xl">
            {mobileOpen ? (
              <HiX onClick={() => setMobileOpen(false)} />
            ) : (
              <HiOutlineMenu onClick={() => setMobileOpen(true)} />
            )}
          </div>
        </div>
      </div>

      {/* ================= MOBILE DROPDOWN (NEW DIV ONLY) ================= */}
      {/* ================= MOBILE DROPDOWN (UPDATED) ================= */}
      {mobileOpen && (
        <div className="sm:hidden absolute top-full left-0 w-full bg-black/95 border-t border-amber-300/20 flex flex-col items-center gap-5 py-6 text-white uppercase tracking-[3px] text-[12px] z-50">
          {/* ================= PROFILE SECTION (NEW) ================= */}
          {token && (
            <div className="flex flex-col items-center gap-2 pb-4 border-b border-neutral-700 w-full">
              <div className="w-12 h-12 flex items-center justify-center bg-amber-400 text-black font-bold rounded-full">
                {user?.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </div>

              <p className="text-sm text-gray-200">{user?.name}</p>
              <p className="text-xs text-gray-400 normal-case">{user?.email}</p>
            </div>
          )}

          {/* ================= NAV ITEMS ================= */}
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
            to="/cart"
            onClick={() => {
              setMenu("cart");
              setMobileOpen(false);
            }}
            className="flex items-center gap-2"
          >
            <HiShoppingBag />
            Cart
          </Link>

          {/* ================= AUTH ================= */}
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
              className="flex items-center gap-2 text-red-400"
            >
              <RiLogoutCircleLine />
              Logout
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
