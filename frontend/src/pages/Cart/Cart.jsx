import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import CartListRowItem from "../../components/CartListRowItem/CartListRowItem";
import CartTotalSection from "../../components/CartTotalSection.jsx/CartTotalSection";
import EmptyCart from "../../components/EmptyCart/EmptyCart";

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    food_list,
    url,
    getTotalCartAmount,
  } = useContext(StoreContext);

  return getTotalCartAmount() > 0 ? (
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

          {food_list.map((item, index) => {
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
  ) : (
    <EmptyCart />
  );
};

export default Cart;
