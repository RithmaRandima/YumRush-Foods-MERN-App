import React from "react";
import pracelIcon from "../../assets/parcel-icon.png";

const OrderItem = ({ order }) => {
  return (
    <div className="flex items-start gap-4 p-4 border rounded-xl shadow-sm hover:shadow-md transition">
      {/* Icon */}
      <img src={pracelIcon} alt="order" className="w-20 h-20 object-contain" />

      {/* Main Content */}
      <div className="flex-1">
        {/* Items */}
        <p className="text-sm text-white">
          {order?.items
            ?.map((item) => `${item.name} x ${item.quantity}`)
            .join(", ")}
        </p>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
          <p>
            <strong>Total:</strong> $ {Number(order?.amount).toFixed(2)}
          </p>
          <p>
            <strong>Items:</strong> {order?.items?.length}
          </p>
        </div>

        {/* Status */}
        <p className="mt-2 text-sm text-gray-300 font-medium flex items-center gap-2">
          <span
            className={`${order?.status === "Food Processing" ? "text-yellow-300" : "text-green-300"}  text-lg`}
          >
            &#x25cf;
          </span>
          {order?.status}
        </p>
      </div>

      {/* Button */}
      <div>
        <button className="px-4 py-2 text-sm cursor-pointer text-gray-800 bg-gray-100 rounded-lg hover:bg-gray-300 transition">
          Track Order
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
