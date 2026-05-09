import React from "react";
import { LiaOpencart } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();

  return (
    <div className="h-[80vh] md:min-h-screen flex flex-col justify-center items-center text-white px-4 text-center">
      <LiaOpencart className="text-[70px] sm:text-[80px] text-amber-300" />

      <h1 className="font-extrabold text-[28px] sm:text-[40px] leading-tight mt-3">
        Your Cart is <span className="text-amber-300">Empty</span>
      </h1>

      <p className="font-bold mt-2 mb-6 sm:mb-7 text-sm sm:text-base max-w-[500px]">
        You must add items to the cart before you proceed to checkout.
      </p>

      <button
        className="btn px-6 py-2 sm:px-8 sm:py-3"
        onClick={() => navigate("/")}
      >
        Return to Shop
      </button>
    </div>
  );
};

export default EmptyCart;
