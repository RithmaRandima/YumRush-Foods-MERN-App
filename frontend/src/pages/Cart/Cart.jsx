import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    food_list,
    getTotalCartAmount,
  } = useContext(StoreContext);
  return (
    <div className="cart mt-25">
      <div className="cart-items ">
        <div className="cart-items-title grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] text-gray-500 text-[14px]">
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
              <div key={index}>
                <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_0.5fr] text-black text-[14px] items-center my-2.5">
                  <img
                    src={item.image}
                    alt=""
                    className="w-30 h-20 object-cover"
                  />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>{item.price * cartItems[item._id]}</p>
                  <div className="flex">
                    <button onClick={() => removeFromCart(item._id)}>
                      <FaMinus />
                    </button>

                    <button onClick={() => addToCart(item._id)}>
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <hr className="h-[1px] bg-gray-500/20 border-none " />
              </div>
            );
          }
        })}
      </div>

      {/* cart bottom section */}
      <div className="mt-20 flex justify-between gap-5">
        {/* total section */}
        <div className="flex-1 flex flex-col gap-5">
          <h2>Cart total</h2>
          <div>
            <div className="total-details">
              <p>Sutotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="total-details">
              <p>Devivery Fee</p>
              <p>{2}</p>
            </div>
            <hr />
            <div className="total-details">
              <p>Total</p>
              <p>{getTotalCartAmount() + 2}</p>
            </div>
          </div>
          <button className="text-white bg-red-400 w-full rounded-full py-4 ">
            PRECEED TO CHECKOUT
          </button>
        </div>

        {/* promo code section */}
        <div className="flex-1">
          <div>
            <p className="text-[#555]">
              if you have a promo code, enter it here
            </p>
            <div className="mt-2.5 flex justify-between items-center bg-[#eaeaea] rounded-[4px]">
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
      </div>
    </div>
  );
};

export default Cart;
