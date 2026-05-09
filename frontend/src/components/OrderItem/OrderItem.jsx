import React from "react";
import pracelIcon from "../../assets/parcel-icon.png";

import { FaBoxOpen, FaArrowRight } from "react-icons/fa";

const OrderItem = ({ order }) => {
  const isProcessing = order?.status === "Food Processing";

  return (
    <div
      className="
        relative
        overflow-hidden
        rounded-3xl
        border border-[#242424]
        bg-gradient-to-b from-[#141414] to-[#101010]
        p-4 sm:p-5
        
        transition-all duration-300
        hover:border-amber-400/20
        hover:shadow-[0_10px_40px_rgba(0,0,0,0.45)]
      "
    >
      {/* TOP */}
      <div className="flex flex-col lg:flex-row gap-5">
        {/* LEFT */}
        <div className="flex gap-4 min-w-0 flex-1">
          {/* ICON */}
          <div
            className="
              w-16 h-16 sm:w-20 sm:h-20
              rounded-xl
              bg-[#1a1a1a]
              border border-[#242424]
              flex items-center justify-center
              flex-shrink-0
            "
          >
            <img
              src={pracelIcon}
              alt="parcel"
              className="w-10 sm:w-12 object-contain"
            />
          </div>

          {/* CONTENT */}
          <div className="min-w-0 flex-1">
            {/* LABEL */}
            <div className="flex items-center gap-2 mb-2">
              <FaBoxOpen className="text-amber-300 text-xs" />

              <p className="text-[10px] uppercase tracking-[2px] text-gray-500">
                order
              </p>
            </div>

            {/* ITEMS */}
            <p className="text-gray-200 text-sm leading-snug break-words">
              {order?.items
                ?.map((item) => `${item.name} × ${item.quantity}`)
                .join(", ")}
            </p>

            {/* META */}
            <div className="flex flex-wrap gap-3 mt-4 text-xs text-gray-400">
              <p>
                Total:
                <span className="text-amber-300 ml-1">
                  ${Number(order?.amount).toFixed(2)}
                </span>
              </p>

              <p>
                Items:
                <span className="text-white ml-1">{order?.items?.length}</span>
              </p>
            </div>

            {/* STATUS */}
            <div className="flex items-center gap-2 mt-3">
              <span
                className={`
                  w-2 h-2 rounded-full
                  ${isProcessing ? "bg-yellow-300" : "bg-green-400"}
                `}
              />

              <p
                className={`
                  text-xs
                  ${isProcessing ? "text-yellow-300" : "text-green-400"}
                `}
              >
                {order?.status}
              </p>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <div className="flex lg:items-center justify-end">
          <button
            className="
              group
              w-full sm:w-auto
              flex items-center justify-center gap-2
              px-4 py-2.5
              rounded-xl
              bg-amber-400
              text-black
              text-sm
              font-medium
              hover:bg-amber-300
              transition
            "
          >
            Track
            <FaArrowRight className="text-xs group-hover:translate-x-1 transition" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
