import React from "react";
import { LiaOpencart } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col justify-center text-white items-center">
      <LiaOpencart className="text-[80px] text-amber-300" />
      <h1 className="font-extrabold text-[40px]">
        Your Cart is <span className="text-amber-300">Empty</span>
      </h1>
      <p className="font-bold mt-2 mb-7">
        must add items on the cart before you preceed to chek out.
      </p>
      <button
        className="btn "
        onClick={() => {
          navigate("/");
        }}
      >
        Return to Shop
      </button>
    </div>
  );
};

export default EmptyCart;
