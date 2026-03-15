import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { TbPlaylistAdd } from "react-icons/tb";
import { SlList } from "react-icons/sl";
import { FaOpencart } from "react-icons/fa";
import { RiUserSettingsFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
const Sidebar = () => {
  return (
    <div className="sidebar relative bg-[#151515] text-white rounded-2xl w-[18%] h-[85vh] ml-3 flex flex-col items-center py-5">
      {/* side bar top part */}
      <div className="flex flex-col items-center">
        {/* add image after add authorization */}
        <img src="" alt="" />
        <FaUserCircle className="text-amber-300 text-[50px]" />
        <h1 className="text-[20px] font-extralight tracking-[2px]">
          rithma randima
        </h1>
        <p className="text-[11px] font-bold uppercase text-gray-500/60 mb-3">
          administrator
        </p>
      </div>
      {/* sidebar options */}
      <div className="sidebar-options flex flex-col gap-3 mt-6 px-4  w-full">
        {/* option 01 */}
        <NavLink to={"/add"} className="sidebar-option  hover:bg-amber-300">
          <TbPlaylistAdd className="text-[20px] font-extrabold" />
          <p className="font-bold text-[12px] tracking-[1px]">Add Item</p>
        </NavLink>

        {/* option 02 */}
        <NavLink to={"/list"} className="sidebar-option">
          <SlList className="text-[20px] font-extrabold" />
          <p className="font-bold text-[12px] tracking-[1px]">List icon</p>
        </NavLink>

        {/* option 03 */}
        <NavLink to={"/orders"} className="sidebar-option">
          <FaOpencart className="text-[20px] font-extrabold" />
          <p className="font-bold text-[12px] tracking-[1px]">Orders</p>
        </NavLink>
      </div>

      {/* helo center */}
      <div className="absolute text-white text-right bg-[#0f0f0f] bottom-0 right-0 rounded-tl-full p-4 pr-5">
        <p className="text-[20px] my-2">help center </p>
        <p className="text-[12px] font-extralight tracking-[1px]">
          have problem
        </p>
        <button className="mt-3" title="go to help center">
          <IoSettings className="text-[30px] animate-spin [animation-duration:4000ms] text-amber-300 active:text-amber-400 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
