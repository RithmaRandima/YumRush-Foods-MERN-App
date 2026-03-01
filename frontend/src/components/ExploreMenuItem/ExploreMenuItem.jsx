import React from "react";

const ExploreMenuItem = ({ item, setCategory, category }) => {
  return (
    <div
      onClick={() =>
        setCategory((prev) =>
          prev === item.menu_name ? "All" : item.menu_name,
        )
      }
      className="explore-menu-list-item hover:scale-105 duration-200"
    >
      <img
        src={item.menu_image}
        alt={item.menu_name}
        className=" w-[10vw] h-[100px] object-cover rounded-full transition-all duration-200
                "
      />
      <p
        className={
          category === item.menu_name
            ? "mt-2.5 text-[18px] tracking-[2px] text-amber-300"
            : "mt-2.5 text-[#747474] text-[15px] tracking-[2px] "
        }
      >
        {item.menu_name}
      </p>
    </div>
  );
};

export default ExploreMenuItem;
