import React, { useContext } from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { AdminContext } from "../../context/AdminContext";
import { IoMenu } from "react-icons/io5";

const Navbar = () => {
  const { admin, setOpen } = useContext(AdminContext);

  return (
    <div className="flex items-center justify-between px-[4%] py-4 bg-gradient-to-b from-[#0f0f0f] to-[#0b0b0b] border-b border-neutral-800">
      {/* LOGO */}
      <div className="flex items-center gap-2 text-amber-400">
        <div className="relative">
          <h1 className="text-[14px] tracking-[4px] font-light">YumRush</h1>
          <GiForkKnifeSpoon className="absolute -right-6 -bottom-1 text-[26px]" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-6">
        {/* SYSTEM STATUS (moved here) */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          System Active
        </div>

        {/* USER */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[11px] text-gray-500">Welcome</p>
            <p className="text-sm font-semibold text-white leading-tight">
              {admin?.name || "Admin"}
            </p>
          </div>

          {/* avatar */}
          <div className="w-9 h-9 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 font-semibold text-sm">
            {admin?.name?.charAt(0) || "A"}
          </div>
        </div>

        <div className="lg:hidden  flex items-center justify-between bg-[#0f0f0f] text-white">
          <button onClick={() => setOpen(true)} className="text-2xl">
            <IoMenu />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
