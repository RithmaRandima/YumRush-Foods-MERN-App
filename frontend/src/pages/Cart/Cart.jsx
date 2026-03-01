import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { FaMinus, FaPlus } from "react-icons/fa";

const Cart = () => {
  const { cartItems, setCartItems, addToCart, removeFromCart, food_list } =
    useContext(StoreContext);
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
    </div>
  );
};

export default Cart;
