import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const CartTotalSection = () => {
  const { getDeliveryFee, getTotalCartAmount, getDiscount } =
    useContext(StoreContext);

  const navigate = useNavigate();

  const totalCartAmount = getTotalCartAmount();
  const discountPrice = getDiscount(totalCartAmount);
  const subTotal = totalCartAmount - discountPrice;
  const taxPrice = subTotal * 0.1;
  const deliveryPrice = getDeliveryFee(totalCartAmount);
  const fullAmount = subTotal + taxPrice + deliveryPrice;

  return (
    <div className="text-white">
      {/* PROMO */}
      <div className="mb-6">
        <p className="text-gray-500 text-xs sm:text-sm mb-2">
          Have a promo code?
        </p>

        <div className="flex items-center bg-[#1a1a1a] border border-[#242424] rounded-xl overflow-hidden">
          <input
            type="text"
            placeholder="Promo code"
            className="
              flex-1
              bg-transparent
              px-3 py-2
              text-sm
              outline-none
              text-white
            "
          />

          <button
            className="
              bg-amber-400
              text-black
              text-xs sm:text-sm
              font-semibold
              px-4 py-2
              hover:bg-amber-300
              transition
            "
          >
            Apply
          </button>
        </div>
      </div>

      {/* TOTAL */}
      <div className="flex flex-col gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold">Total</h1>

        {/* LINES */}
        <div className="space-y-3 text-sm sm:text-base">
          <div className="flex justify-between text-gray-300">
            <span>Items</span>
            <span className="text-white">${totalCartAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-300">
            <span>Discount</span>
            <span className="text-white">-${discountPrice.toFixed(2)}</span>
          </div>

          <div className="border-t border-[#242424] pt-3 flex justify-between">
            <span className="font-medium">Subtotal</span>
            <span className="text-white font-medium">
              ${subTotal.toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between text-gray-400 text-sm">
            <span>Tax (10%)</span>
            <span>${taxPrice.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-400 text-sm">
            <span>Delivery</span>
            <span>${deliveryPrice.toFixed(2)}</span>
          </div>

          <div className="border-t border-[#242424] pt-3 flex justify-between">
            <span className="text-base sm:text-lg font-semibold">Total</span>

            <span className="text-amber-400 font-bold text-base sm:text-lg">
              ${fullAmount.toFixed(2)}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/order")}
          className="
            mt-5
            w-full
            bg-amber-400
            text-black
            font-semibold
            py-3
            rounded-xl
            text-sm sm:text-base
            hover:bg-amber-300
            transition
          "
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartTotalSection;
