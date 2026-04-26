import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import parcelIcon from "../../../../frontend/src/assets/parcel-icon.png";
import axios from "axios";
import { toast } from "react-toastify";

const STATUS_CONFIG = {
  "Food Processing": {
    label: "Food Processing",
    className: "bg-yellow-100 text-yellow-700",
  },
  "Out for Delivery": {
    label: "Out for Delivery",
    className: "bg-blue-100 text-blue-700",
  },
  Delivered: {
    label: "Delivered",
    className: "bg-green-100 text-green-700",
  },
};

const STATUS_OPTIONS = Object.keys(STATUS_CONFIG);

const OrderItem = React.memo(({ order = {} }) => {
  const {
    items = [],
    amount = 0,
    status: initialStatus = "Food Processing",
    _id = "",
    address = {},
  } = order;

  const [status, setStatus] = useState(initialStatus);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + (item.quantity || 0), 0),
    [items],
  );

  // CLOSE DROPDOWN ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ API CALL
  const updateStatus = async (newStatus) => {
    try {
      const res = await axios.post(`http://localhost:4000/api/order/status`, {
        orderId: order._id,
        status: newStatus,
      });

      if (res.data.success) {
        setStatus(newStatus);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log("Error on updateStatus", error);
      toast.error("Error on Updating Status");
    }
  };

  // HANDLE DROPDOWN CLICK
  const handleStatusChange = useCallback((newStatus) => {
    setOpen(false);
    updateStatus(newStatus);
  }, []);

  return (
    <div className="relative flex flex-col md:flex-row md:items-start justify-between gap-6 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200">
      {/* ORDER ID */}
      <span className="absolute top-2 right-4 text-xs text-gray-400 font-mono">
        Order #{_id?.slice(-6)}
      </span>

      {/* META */}
      <div className="absolute text-black right-5 bottom-3 flex font-semibold flex-wrap gap-4 text-[16px]">
        <span>
          <span className="font-normal text-gray-500 text-[14px]">Items:</span>{" "}
          {totalItems}
        </span>

        <span>
          <span className="font-normal text-gray-500 text-[14px]">Total:</span>{" "}
          ${amount.toFixed(2)}
        </span>
      </div>

      {/* LEFT */}
      <div className="flex items-start gap-4 flex-1 max-w-[600px]">
        <img
          src={parcelIcon}
          alt="Order icon"
          className="w-15 h-15 object-contain"
        />

        <div className="flex ml-5 flex-col gap-2 w-full">
          {/* ITEMS */}
          <div className="text-sm text-gray-800 space-y-1">
            <span className="font-medium text-gray-700 text-[16px] ">
              Items:
            </span>
            {items.map((item, i) => (
              <div key={i} className="flex justify-between ml-3 mt-1">
                <span className="flex items-center gap-2">
                  <span className="w-1 h-1 bg-black rounded-full"></span>
                  <span className="font-normal text-gray-600">{item.name}</span>
                </span>
                <span className="text-gray-500 text-[13px]">
                  x{item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* ADDRESS */}
          <div className="mt-3 text-gray-500 flex gap-3 items-start">
            <span className="font-medium text-gray-700 text-[16px]">
              Deliver to:
            </span>

            <span className="block leading-relaxed">
              {address ? (
                <p className="font-semibold text-black">
                  {address.street}, {address.city},
                  <br />
                  {address.state}, {address.zipCode},
                  <br />
                  {address.country}.
                </p>
              ) : (
                "No address provided"
              )}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div className="relative mt-4 flex justify-center" ref={dropdownRef}>
        {/* STATUS BUTTON */}
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={`px-5 py-1.5 rounded-full text-[13px] font-medium transition ${
            STATUS_CONFIG[status]?.className || "bg-gray-100 text-gray-700"
          }`}
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          {STATUS_CONFIG[status]?.label || status} ▾
        </button>

        {/* DROPDOWN */}
        {open && (
          <div
            role="listbox"
            className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-xl overflow-hidden z-20"
          >
            {STATUS_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => handleStatusChange(option)}
                className={`w-full text-left text-black px-4 py-2 text-sm hover:bg-gray-50 transition ${
                  status === option ? "bg-gray-100 font-medium" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default OrderItem;
