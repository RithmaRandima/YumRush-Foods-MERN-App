import React, { useContext, useState, useRef } from "react";
import "./FoodDisplay.css";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  // pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // ref for scrolling
  const sectionRef = useRef(null);

  // filter items first
  const filteredItems = food_list.filter(
    (item) => category === "All" || item.category === category,
  );

  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // handle page change + scroll
  const handlePageChange = (page) => {
    setCurrentPage(page);

    sectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div ref={sectionRef} className="pt-10 pb-20 " id="food-display">
      {/* food list */}
      <div className="food-display-list grid grid-cols-3 px-10">
        {currentItems.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.shortdescription}
            image={item.image}
            price={item.price}
          />
        ))}
      </div>

      {/* pagination controls */}
      <div className="flex justify-center gap-3 mt-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => handlePageChange(i + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1
                ? "bg-amber-300 text-black"
                : "text-white border-gray-600"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
