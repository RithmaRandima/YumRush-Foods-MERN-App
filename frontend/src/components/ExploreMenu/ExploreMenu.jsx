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
      <div className=" flex flex-col items-center">
        <h1 className="text-amber-300 text-[60px] font-bold">
          Eplore Our Menu
        </h1>
        <p className="max-w-[60%] text-amber-100 text-center ">
          Exercitation photo booth stumptown tote bag Banksy, elit small batch
          freegan sed. Craft beer elit seitan exercitation.
        </p>
      </div>
      {/* list section */}
      <div className="explore-menu-list flex justify-between items-center gap-7 text-center overflow-x-scroll cursor-pointer my-12  w-[80%] ">
        {menu_list.map((item, index) => {
          return (
            <ExploreMenuItem
              key={index}
              item={item}
              category={category}
              setCategory={setCategory}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;
