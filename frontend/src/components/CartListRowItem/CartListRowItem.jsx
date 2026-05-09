import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const CartListRowItem = ({
  item,
  url,
  cartItems,
  removeFromCart,
  addToCart,
}) => {
  return (
    <Link to={`/food/${item._id}`}>
      <div
        className="
          flex items-center justify-between
          gap-4
          bg-[#141414]
          border border-[#242424]
          rounded-xl
          p-3 sm:p-4
          hover:border-amber-400/20
          transition
        "
      >
        {/* LEFT - IMAGE + NAME */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={url + "/images/" + item.image}
            alt={item.name}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover border border-[#242424]"
          />

          <div className="min-w-0">
            <p className="text-white text-sm sm:text-base truncate">
              {item.name}
            </p>

            <p className="text-gray-500 text-xs sm:hidden mt-1">
              ${item.price.toFixed(2)} each
            </p>
          </div>
        </div>

        {/* MIDDLE - PRICE (desktop only) */}
        <div className="hidden sm:block text-center w-20">
          <p className="text-amber-300 text-sm">${item.price.toFixed(2)}</p>
        </div>

        {/* QTY */}
        <div className="text-center w-16">
          <p className="text-white text-sm font-medium">
            {cartItems[item._id]}
          </p>
        </div>

        {/* TOTAL */}
        <div className="hidden sm:block text-center w-24">
          <p className="text-amber-300 text-sm">
            ${(item.price * cartItems[item._id]).toFixed(2)}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2">
          {/* MINUS */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              removeFromCart(item._id);
            }}
            className="
              w-8 h-8
              flex items-center justify-center
              rounded-full
              bg-[#1f1f1f]
              text-white
              hover:bg-red-400 hover:text-black
              transition
            "
          >
            <FaMinus className="text-[10px]" />
          </button>

          {/* PLUS */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              addToCart(item._id);
            }}
            className="
              w-8 h-8
              flex items-center justify-center
              rounded-full
              bg-[#1f1f1f]
              text-white
              hover:bg-green-400 hover:text-black
              transition
            "
          >
            <FaPlus className="text-[10px]" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default CartListRowItem;
