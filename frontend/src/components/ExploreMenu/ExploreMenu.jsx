import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import ExploreMenuItem from "../ExploreMenuItem/ExploreMenuItem";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div
      className="relative explore-menu flex flex-col gap-5 mt-12 items-center"
      id="explore-menu"
    >
      {/* header section */}
      <div className="flex flex-col items-center">
        <h1 className="text-amber-300 text-[60px] font-bold">
          Eplore Our Menu
        </h1>
        <p className="max-w-[60%] text-amber-100 text-center">
          Exercitation photo booth stumptown tote bag Banksy, elit small batch
          freegan sed. Craft beer elit seitan exercitation.
        </p>
      </div>

      {/* ================= DESKTOP (UNCHANGED) ================= */}
      <div className="hidden md:flex explore-menu-list justify-between items-center gap-7 text-center overflow-x-scroll cursor-pointer my-12 mb-0 w-[85%] p-5">
        {menu_list.map((item, index) => (
          <ExploreMenuItem
            key={index}
            item={item}
            category={category}
            setCategory={setCategory}
          />
        ))}
      </div>

      {/* ================= MOBILE (GRID + SCROLL) ================= */}
      <div className="no-scrollbar md:hidden flex gap-2 overflow-x-auto w-[90%] my-12 mb-0 pr-2 scroll-smooth py-4">
        {menu_list.map((item, index) => (
          <div key={index} className="flex-shrink-0 ">
            <ExploreMenuItem
              item={item}
              category={category}
              setCategory={setCategory}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
