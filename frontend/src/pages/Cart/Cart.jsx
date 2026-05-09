import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import CartListRowItem from "../../components/CartListRowItem/CartListRowItem";
import CartTotalSection from "../../components/CartTotalSection.jsx/CartTotalSection";
import EmptyCart from "../../components/EmptyCart/EmptyCart";

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, food_list, url, loading } =
    useContext(StoreContext);

  // check if cart has items
  const hasCartItems = Object.values(cartItems || {}).some((qty) => qty > 0);

  // show loading while fetching data
  if (loading) {
    return (
      <div className="text-white text-center text-2xl mt-10">
        Loading Cart...
      </div>
    );
  }

  // show empty cart only after loading completed
  if (!hasCartItems) {
    return <EmptyCart />;
  }

  return (
    <div className="cart flex items-start gap-5 p-4">
      {/* cart item section */}
      <div className="w-full">
        <h1 className="text-white my-6 font-extrabold tracking-[2px] text-[30px]">
          My Cart
        </h1>

        <div className="cart-items">
          <div className="cart-items-title grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] gap-[1px] text-amber-300 text-[14px]">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p></p>
          </div>

          <br />
          <hr />

          {food_list &&
            food_list.map((item, index) => {
              if (cartItems[item._id] > 0) {
                return (
                  <CartListRowItem
                    key={item._id}
                    item={item}
                    index={index}
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

      {/* cart Total section */}
      <div className="bg-gray-900/30 rounded-2xl top-0 p-6">
        <CartTotalSection />
      </div>
    </div>
  );
};

export default Cart;
