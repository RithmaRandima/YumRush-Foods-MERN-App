import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-2 px-[4%]">
      {/* logo */}
      <div>
        <h1>logo</h1>
      </div>

      {/* user img */}
      <div>
        <img src="" alt="" />
        <p>image here</p>
      </div>
    </div>
  );
};

export default Navbar;
