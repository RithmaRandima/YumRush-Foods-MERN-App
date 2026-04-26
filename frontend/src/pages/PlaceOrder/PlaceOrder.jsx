import React, { useContext, useEffect } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import CartTotalSection from "../../components/CartTotalSection.jsx/CartTotalSection";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const {
    getTotalCartAmount,
    getDeliveryFee,
    getDiscount,
    token,
    food_list,
    cartItems,
    url,
  } = useContext(StoreContext);

  const totalCartAmount = getTotalCartAmount();
  const discountPrice = getDiscount(getTotalCartAmount());
  const subTotal = totalCartAmount - discountPrice;
  const taxPrice = (totalCartAmount - discountPrice) * 0.1;
  const deliveryPrice = getDeliveryFee(getTotalCartAmount());
  const fullAmount = subTotal + taxPrice + deliveryPrice;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    const orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        const itemInfo = { ...item, quantity: cartItems[item._id] };
        orderItems.push(itemInfo);
      }
    });

    const orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 2,
    };

    const res = await axios.post(`${url}/api/order/place`, orderData, {
      headers: { token },
    });

    if (res.data.success) {
      const { session_url } = res.data;
      window.location.replace(session_url);
    } else {
      alert(res.data.message || "Order failed");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form
      onSubmit={placeOrder}
      className="place-order mt-10 flex flex-col sm:flex-row items-start justify-between gap-12 text-white sm:px-15"
    >
      {/* left side*/}
      <div className="left flex-1 pr-10">
        <p className="text-[30px] font-bold mb-5">Delivery Information</p>
        <div className="multy-fields">
          <input
            required
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={onChangeHandler}
            placeholder="First name"
          />
          <input
            required
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={onChangeHandler}
            placeholder="Last name"
          />
        </div>

        <input
          required
          type="email"
          name="email"
          value={data.email}
          onChange={onChangeHandler}
          placeholder="Email address"
        />
        <input
          required
          type="text"
          name="street"
          value={data.street}
          onChange={onChangeHandler}
          placeholder="Street"
        />

        <div className="multy-fields">
          <input
            required
            type="text"
            name="city"
            value={data.city}
            onChange={onChangeHandler}
            placeholder="City"
          />
          <input
            required
            type="text"
            name="state"
            value={data.state}
            onChange={onChangeHandler}
            placeholder="State"
          />
        </div>

        <div className="multy-fields">
          <input
            required
            type="text"
            name="zipCode"
            value={data.zipCode}
            onChange={onChangeHandler}
            placeholder="Zip code"
          />
          <input
            required
            type="text"
            name="country"
            value={data.country}
            onChange={onChangeHandler}
            placeholder="Country"
          />
        </div>
        <input
          required
          type="text"
          name="phone"
          value={data.phone}
          onChange={onChangeHandler}
          placeholder="Phone"
        />
      </div>
      {/* right side */}
      <div className="flex-1 max-w-[400px]">
        {/* total section */}
        <div className="flex-1 flex flex-col gap-5 text-white mt-6">
          <h1 className="text-[30px] font-bold mb-2">Total</h1>

          <div className="px-2">
            <div className="flex items-center justify-between my-3">
              <p className="font-semibold capitalize text-[15px]">
                Items Total
              </p>
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
            type="submit"
            className="mt-5 mx-auto block bg-amber-300 text-[13px] text-black font-bold tracking-[2px] btn-primary border-0  p-2 w-[90%] rounded-full cursor-pointer duration-200 hover:-translate-y-1 active:bg-amber-400"
          >
            PRECEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
