import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt, FaOpencart } from "react-icons/fa";
import { TbPlaylistAdd } from "react-icons/tb";
import { SlList } from "react-icons/sl";
import { BiSolidBarChartSquare } from "react-icons/bi";
import { IoMenu, IoClose } from "react-icons/io5";

import { AdminContext } from "../../context/AdminContext";

const Sidebar = () => {
  const { admin, logOut, open, setOpen } = useContext(AdminContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const baseLink =
    "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-out group overflow-hidden";

  return (
    <>
      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <div
        className={`
          fixed lg:static lg:ml-3 top-0 left-0 z-50
          h-full lg:h-[85vh]
          w-[260px] lg:w-[18%]

          bg-gradient-to-b from-[#0f0f0f] to-[#0b0b0b]
          text-white
          rounded-none lg:rounded-2xl

          border-r lg:border border-neutral-800
          shadow-2xl overflow-hidden

          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* CLOSE BUTTON (mobile only) */}
        <div className="lg:hidden flex justify-end p-3">
          <button onClick={() => setOpen(false)} className="text-2xl">
            <IoClose />
          </button>
        </div>

        {/* PROFILE (UNCHANGED) */}
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

        {/* NAVIGATION (UNCHANGED UI) */}
        <div className="flex flex-col gap-1 px-3 mt-4 flex-1">
          <NavLink to="/" onClick={() => setOpen(false)}>
            <div
              className={`${baseLink} ${
                isActive("/")
                  ? "text-amber-300 bg-white/5"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-amber-400 transition-all duration-300
                ${
                  isActive("/")
                    ? "opacity-100 scale-y-100"
                    : "opacity-0 scale-y-0"
                }`}
              />
              <BiSolidBarChartSquare className="text-lg" />
              Dashboard
            </div>
          </NavLink>

          <NavLink to="/add" onClick={() => setOpen(false)}>
            <div className={baseLink + " "}>
              <TbPlaylistAdd className="text-lg" />
              Add Item
            </div>
          </NavLink>

          <NavLink to="/list" onClick={() => setOpen(false)}>
            <div className={baseLink}>
              <SlList className="text-lg" />
              List Items
            </div>
          </NavLink>

          <NavLink to="/orders" onClick={() => setOpen(false)}>
            <div className={baseLink}>
              <FaOpencart className="text-lg" />
              Orders
            </div>
          </NavLink>

          {/* LOGOUT */}
          <button
            onClick={() => {
              logOut();
              setOpen(false);
            }}
            className="mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
          >
            <FaSignOutAlt className="text-lg" />
            Logout
          </button>
        </div>

        {/* SYSTEM STATUS (UNCHANGED) */}
        <div className="px-4 pb-4">
          <div className="rounded-xl border border-neutral-800 bg-[#0f0f0f] p-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-white">System</p>

              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-[2px] rounded-full border border-emerald-500/20">
                Online
              </span>
            </div>

            <p className="text-[10px] text-gray-500 mt-2 leading-tight">
              All systems stable
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
