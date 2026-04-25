import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartListRowItem = ({
  item,
  index,
  url,
  cartItems,
  removeFromCart,
  addToCart,
}) => {
  return (
    <Link to={`/food/${item._id}`} key={index}>
      <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] text-white text-[14px] items-center text-center my-2  rounded-2xl bg-gray-900/30 py-1 pl-4 hover:-translate-y-0.5 transition duration-200 pr-3">
        <div className="w-full h-full ">
          <img
            src={url + "/images/" + item.image}
            alt=""
            className="w-[50%] ml-5 h-15 object-cover rounded-[3px]"
          />
        </div>
        <p>{item.name}</p>
        <p className="text-amber-300">${item.price.toFixed(2)}</p>
        <p>{cartItems[item._id]}</p>
        <p className="text-amber-300">
          ${(item.price * cartItems[item._id]).toFixed(2)}
        </p>
        <div className="flex gap-4 items-center">
          <button
            className="w-4 h-4 flex items-center text-[12px] justify-center bg-white/40 text-black text-center rounded-full  duration-300 cursor-pointer hover:bg-red-300 hover:scale-110 transition active:bg-red-400"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              removeFromCart(item._id);
            }}
          >
            <FaMinus />
          </button>

          <button
            className="w-4 h-4 flex items-center text-[12px] justify-center  bg-white/40 text-black text-center rounded-full duration-300 cursor-pointer hover:bg-green-300 hover:scale-110 transition active:bg-green-400"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(item._id);
            }}
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CartListRowItem;
