import React, { useContext } from "react";
import "./FoodItem.css";
import { FaMinus, FaPlus, FaStar } from "react-icons/fa";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  return (
    <div className="w-full mx-auto rounded-[10px] shadow-[0_0_10px_black] transition-all duration-150">
      {/* img container */}
      <div className="w-full relative">
        <img
          className="w-full rounded-tl-2xl rounded-tr-2xl"
          src={image}
          alt=""
        />
        <div className="absolute bg-red-300 right-0 top-0">
          {!cartItems[id] ? (
            <button onClick={() => addToCart(id)}>
              <FaPlus />
            </button>
          ) : (
            <div>
              <button onClick={() => removeFromCart(id)}>
                <FaMinus />
              </button>
              <p>{cartItems[id]}</p>
              <button onClick={() => addToCart(id)}>
                <FaPlus />
              </button>
            </div>
          )}
        </div>
      </div>
      {/* food item information */}
      <div className="p-5">
        {/* rating */}
        <div className="flex justify-between items-center">
          <p className="text-2xl font-semibold">{name}</p>
          <div className="flex">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
        <p className="text-red-300 text-[12px]">{description}</p>
        <p className="text-red-300 text-[20px] font-semibold mx-2.5">
          ${price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
