import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import CartListRowItem from "../../components/CartListRowItem/CartListRowItem";
import CartTotalSection from "../../components/CartTotalSection.jsx/CartTotalSection";
import EmptyCart from "../../components/EmptyCart/EmptyCart";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, food_list, url, loading } =
    useContext(StoreContext);

  const hasCartItems = Object.values(cartItems || {}).some((qty) => qty > 0);

  if (loading) {
    return (
      <div className="text-white text-center text-xl sm:text-2xl mt-10">
        Loading Cart...
      </div>
    );
  }

  if (!hasCartItems) {
    return <EmptyCart />;
  }

  return (
    <div
      className="
        flex flex-col lg:flex-row
        gap-6
        p-3 sm:p-4 lg:p-6
        min-h-screen
      "
    >
      {/* LEFT */}
      <div className="w-full">
        {/* TITLE */}
        <h1 className="text-white my-4 sm:my-6 font-semibold tracking-[2px] text-2xl sm:text-3xl">
          My Cart
        </h1>

        {/* ITEMS */}
        <div className="space-y-3">
          {food_list &&
            food_list.map((item) => {
              if (cartItems[item._id] > 0) {
                return (
                  <CartListRowItem
                    key={item._id}
                    item={item}
                    url={url}
                    cartItems={cartItems}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                  />
                );
              }
              return null;
            })}
        </div>
      </div>

      {/* RIGHT */}
      <div
        className="
          w-full lg:w-[350px]
          lg:sticky lg:top-6
          h-fit
        "
      >
        <div className="bg-[#141414] border border-[#242424] rounded-2xl p-5">
          <CartTotalSection />
        </div>
      </div>
    </div>
  );
};

export default Cart;
