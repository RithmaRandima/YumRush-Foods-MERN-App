import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu flex flex-col gap-5" id="explore-menu">
      <h1
        className="text-[#262626]
      font-bold"
      >
        Eplore Our Menu
      </h1>
      <p className="max-w-[60%] text-[#808080] ">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non tenetur
        esse distinctio fugit nulla magni! Ad ipsum necessitatibus at minima!
      </p>
      <div className="explore-menu-list flex justify-between items-center gap-7 text-center mx-5 overflow-x-scroll cursor-pointer">
        {menu_list.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? "All" : item.menu_name,
                )
              }
              className="explore-menu-list-item"
            >
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className={
                  category === item.menu_name
                    ? `w-[10vw] h-[100px] object-cover rounded-full transition-all duration-200 border-4 border-red-400 p-0.5`
                    : `
                  w-[10vw] h-[100px] object-cover rounded-full transition-all duration-200`
                }
              />
              <p className="mt-2.5 text-[#747474] text-[18px] ">
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>

      <hr className="my-3 h-0.5 bg-gray-300 border-none" />
    </div>
  );
};

export default ExploreMenu;
