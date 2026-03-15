import React, { useContext } from "react";
import "./FoodItem.css";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";
import { Link } from "react-router-dom";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  return (
    <Link
      to={`/food/${id}`}
      className="food-item-box relative w-full mx-auto transition-all duration-150 rounded-xl overflow-hidden cursor-auto"
    >
      {/* img container */}
      <div className="w-full h-full relative">
        <img
          className="w-full h-[280px] object-cover"
          src={`${url}/images/${image}`}
          alt=""
        />
        <div className="absolute right-2 top-2">
          {!cartItems[id] ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(id);
              }}
              className="w-[20px] h-[20px] bg-black rounded-full hover:scale-105 duration-300"
            >
              <FaPlus className="text-[10px] mx-auto text-white" />
            </button>
          ) : (
            <div className="flex text-white items-center gap-1.5 bg-white/20 rounded-full">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFromCart(id);
                }}
                className="w-[20px] h-[20px] bg-black rounded-full hover:scale-105 duration-300"
              >
                <FaMinus className="text-[10px] mx-auto" />
              </button>
              <p className="text-black text-[16px] font-extrabold">
                {cartItems[id]}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addToCart(id);
                }}
                className="w-[20px] h-[20px] bg-black rounded-full hover:scale-105 duration-300"
              >
                <FaPlus className="text-[10px] mx-auto" />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* food item information */}
      <div className=" food-item-box-info absolute p-3 bottom-0 bg-gradient-to-t from-black to-black/60 text-white left-0 right-0  duration-200">
        {/* rating */}

        <p className="text-amber-100 text-[14px]">{description}</p>
        <p className="text-amber-400 text-[20px] font-semibold mx-2.5 my-2">
          ${price.toFixed(2)}
        </p>

        <div className="flex justify-between items-center">
          <p className="text-[16px] font-extralight tracking-[3px]">{name}</p>
          <div className="flex text-[12px] gap-0.5 text-amber-400">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FoodItem;
