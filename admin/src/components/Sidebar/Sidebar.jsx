import React from "react";
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar w-[18%] min-h-[100vh] border border-t-0 border-[#a9a9a9]">
      {/* sidebar options */}
      <div className="sidebar-options pt-10 pl-[20%] flex flex-col gap-5">
        {/* option 01 */}
        <NavLink to={"/add"} className="sidebar-option">
          <img src="" alt="" />
          <p>Add Item</p>
        </NavLink>

        {/* option 02 */}
        <NavLink to={"/list"} className="sidebar-option">
          <img src="" alt="" />
          <p>List icon</p>
        </NavLink>

        {/* option 03 */}
        <NavLink to={"/orders"} className="sidebar-option">
          <img src="" alt="" />
          <p>Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
