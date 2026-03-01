import React, { useContext } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { getTotalCartAmount, getDeliveryFee } = useContext(StoreContext);

  return (
    <div className="place-order mt-20 flex items-start justify-between gap-12">
      {/* left side*/}
      <div className="left flex-1">
        <p className="text-[30px] font-bold">Delivery Information</p>
        <div className="multy-fields">
          <input type="text" placeholder="First name" />
          <input type="text" placeholder="Last name" />
        </div>

        <input type="email" placeholder="Email address" />
        <input type="text" placeholder="Street" />

        <div className="multy-fields">
          <input type="text" placeholder="Zip code" />
          <input type="text" placeholder="Country" />
        </div>
        <input type="text" placeholder="Phone" />
      </div>
      {/* right side */}
      <div className="flex-1 max-w-[400px]">
        {/* total section */}
        <div className="flex-1 flex flex-col gap-5">
          <h2>Cart total</h2>
          <div>
            <div className="total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount().toFixed(2)}</p>
            </div>
            <hr />
            <div className="total-details">
              <p>Devivery Fee</p>

              <p>${getDeliveryFee(getTotalCartAmount()).toFixed(2)}</p>
            </div>
            <hr />
            <div className="total-details">
              <p>Total</p>
              <p>
                $
                {(
                  getTotalCartAmount() + getDeliveryFee(getTotalCartAmount())
                ).toFixed(2)}
              </p>
            </div>
          </div>
          <button className="text-white bg-red-400 w-full rounded-full py-4 mt-8">
            PRECEED TO PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
