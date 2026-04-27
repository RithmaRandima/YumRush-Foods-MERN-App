import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaOpencart } from "react-icons/fa";
import { TbPlaylistAdd } from "react-icons/tb";
import { SlList } from "react-icons/sl";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { IoSettings } from "react-icons/io5";

import { AdminContext } from "../../context/AdminContext";

const Sidebar = () => {
  const { admin, logOut } = useContext(AdminContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const baseLink =
    "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-out group overflow-hidden";

  return (
    <div className="w-[18%] h-[85vh] ml-3 flex flex-col bg-gradient-to-b from-[#0f0f0f] to-[#0b0b0b] text-white rounded-2xl border border-neutral-800 shadow-2xl overflow-hidden">
      {/* PROFILE */}
      <div className="flex flex-col items-center py-6 border-b border-neutral-800">
        <div className="relative">
          <FaUserCircle className="text-amber-400 text-[54px]" />
          <span className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-400 rounded-full border border-[#0f0f0f]" />
        </div>

        <h1 className="text-[16px] font-semibold mt-2 tracking-wide">
          {admin?.name || "Admin"}
        </h1>

        <p className="text-[11px] text-gray-500 truncate px-3">
          {admin?.email}
        </p>
      </div>

      {/* NAVIGATION */}
      <div className="flex flex-col gap-1 px-3 mt-4 flex-1">
        {/* Dashboard */}
        <NavLink to="/">
          <div
            className={`${baseLink} ${
              isActive("/")
                ? "text-amber-300 bg-white/5"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-amber-400 transition-all duration-300
              ${isActive("/") ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}`}
            />
            <BiSolidBarChartSquare className="text-lg transition-transform duration-300 group-active:scale-90" />
            Dashboard
          </div>
        </NavLink>

        {/* Add Item */}
        <NavLink to="/add">
          <div
            className={`${baseLink} ${
              isActive("/add")
                ? "text-amber-300 bg-white/5"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-amber-400 transition-all duration-300
              ${isActive("/add") ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}`}
            />
            <TbPlaylistAdd className="text-lg" />
            Add Item
          </div>
        </NavLink>

        {/* List Items */}
        <NavLink to="/list">
          <div
            className={`${baseLink} ${
              isActive("/list")
                ? "text-amber-300 bg-white/5"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-amber-400 transition-all duration-300
              ${isActive("/list") ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}`}
            />
            <SlList className="text-lg" />
            List Items
          </div>
        </NavLink>

        {/* Orders */}
        <NavLink to="/orders">
          <div
            className={`${baseLink} ${
              isActive("/orders")
                ? "text-amber-300 bg-white/5"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <span
              className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-amber-400 transition-all duration-300
              ${isActive("/orders") ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"}`}
            />
            <FaOpencart className="text-lg" />
            Orders
          </div>
        </NavLink>

        {/* Logout */}
        <button
          onClick={logOut}
          className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
        >
          <FaSignOutAlt className="text-lg" />
          Logout
        </button>
      </div>

      {/* SYSTEM STATUS (COMPACT) */}
      <div className="px-4 pb-4">
        <div className="rounded-xl border border-neutral-800 bg-[#0f0f0f] p-3">
          {/* header */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-white">System</p>

            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-[2px] rounded-full border border-emerald-500/20">
              Online
            </span>
          </div>

          {/* tiny status text */}
          <p className="text-[10px] text-gray-500 mt-2 leading-tight">
            All systems stable
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
