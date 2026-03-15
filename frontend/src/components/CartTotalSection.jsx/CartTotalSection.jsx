import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const CartTotalSection = () => {
  const { getDeliveryFee, getTotalCartAmount, getDiscount } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const totalCartAmount = getTotalCartAmount();
  const discountPrice = getDiscount(getTotalCartAmount());
  const subTotal = totalCartAmount - discountPrice;
  const taxPrice = (totalCartAmount - discountPrice) * 0.1;
  const deliveryPrice = getDeliveryFee(getTotalCartAmount());
  const fullAmount = subTotal + taxPrice + deliveryPrice;

  return (
    <div className="mt-5 ">
      {/* promo code section */}
      <div className="my-5">
        <div>
          <p className="text-[#555]">if you have a promo code, enter it here</p>
          <div className="mt-2.5 flex justify-between items-center bg-[#eaeaea] rounded-[4px] min-w-[340px]">
            <input
              type="text"
              placeholder="promo code"
              className="bg-transparent border-none outline-0 pl-2.5"
            />
            <button className="bg-black text-white font-semibold px-3 py-2 ">
              Submit
            </button>
          </div>
        </div>
      </div>
      {/* total section */}
      <div className="flex-1 flex flex-col gap-5 text-white mt-6">
        <h1 className="text-[30px] font-bold mb-2">Total</h1>

        <div className="px-2">
          <div className="flex items-center justify-between my-3">
            <p className="font-semibold capitalize text-[15px]">Items Total</p>
            <p className="text-white font-semibold text-[20px]">
              ${totalCartAmount.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center justify-between my-3">
            <p className="font-semibold capitalize text-[15px]">Discount</p>
            <p className="text-white font-semibold text-[18px]">
              $ {discountPrice.toFixed(2)}
            </p>
          </div>

          <hr className="text-white/20 my-2" />

          <div className="flex items-center justify-between my-4">
            <p className="font-bold capitalize text-[18px]">Subtotal</p>
            <p className="text-white font-bold text-[20px]">
              $ {subTotal.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center justify-between my-2">
            <p className="font-semibold capitalize text-[15px]">tax(10%)</p>
            <p className="text-white font-semibold text-[18px]">
              $ {taxPrice.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center justify-between my-2">
            <p className="font-semibold capitalize text-[15px]">
              delivery cost
            </p>
            <p className="text-white font-semibold text-[18px]">
              ${deliveryPrice.toFixed(2)}
            </p>
          </div>

          <hr className="text-white/20 my-1" />

          {/* Estimate total section */}
          <div className="flex items-center justify-between my-2 mt-5">
            <p className="font-semibold capitalize text-[20px]">
              Estmate Total
            </p>
            <p className="text-amber-400 font-extrabold text-[20px]">
              ${Number(fullAmount.toFixed(2))}
            </p>
          </div>
        </div>
        <button
          className="mt-5 mx-auto block bg-amber-300 text-[13px] text-black font-bold tracking-[2px] btn-primary border-0  p-2 w-[90%] rounded-full cursor-pointer duration-200 hover:-translate-y-1 active:bg-amber-400"
          onClick={() => navigate("/order")}
        >
          PRECEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartTotalSection;
