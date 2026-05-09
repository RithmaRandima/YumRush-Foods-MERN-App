import React from "react";

const ExploreMenuItem = ({ item, setCategory, category }) => {
  const isActive = category === item.menu_name;

  return (
    <div
      onClick={() =>
        setCategory((prev) =>
          prev === item.menu_name ? "All" : item.menu_name,
        )
      }
      className="
        flex flex-col items-center cursor-pointer
        transition-all duration-300 ease-in-out
        hover:scale-110 active:scale-95
        select-none
      "
    >
      <div
        className={`
          rounded-full overflow-hidden
          border-2 transition-all duration-300
          ${
            isActive
              ? "border-amber-300 shadow-lg shadow-amber-300/30"
              : "border-transparent"
          }
        `}
      >
        <img
          src={item.menu_image}
          alt={item.menu_name}
          className="
            w-[70px] h-[70px]
            sm:w-[90px] sm:h-[90px]
            md:w-[100px] md:h-[100px]
            object-cover
            transition-all duration-300
          "
        />
      </div>

      <p
        className={`
          mt-0 md:mt-2 text-center tracking-[2px]
          transition-all duration-300
          ${
            isActive
              ? "text-amber-300 text-[14px] sm:text-[16px] md:text-[18px] font-medium"
              : "text-[#747474] text-[13px] sm:text-[14px] md:text-[15px]"
          }
        `}
      >
        {item.menu_name}
      </p>
    </div>
  );
};

export default ExploreMenuItem;
