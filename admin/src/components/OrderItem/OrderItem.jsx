import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react";
import parcelIcon from "../../../../frontend/src/assets/parcel-icon.png";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";

/* ===== STATUS CONFIG (ONLY ONCE) ===== */
const STATUS_CONFIG = {
  "Food Processing": {
    label: "Processing",
    dot: "bg-yellow-500",
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    border: "border-yellow-500/20",
  },
  "Out for Delivery": {
    label: "On the way",
    dot: "bg-blue-500",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    border: "border-blue-500/20",
  },
  Delivered: {
    label: "Delivered",
    dot: "bg-emerald-500",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
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

  const { fetchDashboard } = useContext(AdminContext);

  const dropdownRef = useRef(null);

  const totalItems = useMemo(
    () => items.reduce((acc, item) => acc + (item.quantity || 0), 0),
    [items],
  );

  /* OUTSIDE CLICK */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* UPDATE STATUS */
  const updateStatus = async (newStatus) => {
    try {
      const res = await axios.post(`http://localhost:4000/api/order/status`, {
        orderId: order._id,
        status: newStatus,
      });

      if (res.data.success) {
        setStatus(newStatus);
        toast.success(res.data.message);
        await fetchDashboard();
      }
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const handleStatusChange = useCallback((newStatus) => {
    setOpen(false);
    updateStatus(newStatus);
  }, []);

  const statusMeta = STATUS_CONFIG[status] || STATUS_CONFIG["Food Processing"];

  return (
    <div className="bg-[#121212] border border-neutral-800 rounded-2xl p-5 hover:border-amber-500/20 transition shadow-lg">
      {/* HEADER */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#0f0f0f] border border-neutral-800">
            <img src={parcelIcon} className="w-6 h-6 object-contain" />
          </div>

          <div>
            <p className="text-sm text-gray-300 font-medium">
              Order #{_id?.slice(-6)}
            </p>
            <p className="text-xs text-gray-500">
              {totalItems} items • ${amount.toFixed(2)}
            </p>
          </div>
        </div>

        {/* STATUS DROPDOWN */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setOpen((p) => !p)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${statusMeta.bg} ${statusMeta.border} ${statusMeta.text}`}
          >
            {statusMeta.label}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-44 bg-[#111] border border-neutral-800 rounded-xl overflow-hidden shadow-xl z-20">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option}
                  onClick={() => handleStatusChange(option)}
                  className={`cursor-pointer w-full text-left px-3 py-2 text-sm transition ${
                    status === option
                      ? "bg-white/10 text-amber-300"
                      : "text-gray-300 hover:bg-white/5"
                  }`}
                >
                  {STATUS_CONFIG[option].label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* ITEMS */}
        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-2">Items</p>

          {items.map((item, i) => (
            <div key={i} className="flex justify-between text-sm py-1">
              <span className="text-gray-300 flex items-center gap-2">
                <span className="w-1 h-1 bg-amber-400 rounded-full" />
                {item.name}
              </span>
              <span className="text-xs text-gray-500">x{item.quantity}</span>
            </div>
          ))}
        </div>

        {/* ADDRESS */}
        <div className="bg-[#0f0f0f] border border-neutral-800 rounded-xl p-3">
          <p className="text-xs text-gray-500 mb-2">Delivery</p>

          <p className="text-sm text-gray-300 leading-relaxed">
            {address
              ? `${address.street}, ${address.city}, ${address.state}, ${address.zipCode}, ${address.country}`
              : "No address provided"}
          </p>
        </div>
      </div>

      {/* STATUS DOT FOOTER */}
      <div className="mt-4 flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${statusMeta.dot} animate-pulse`}
        />
        <span className={`text-xs font-medium ${statusMeta.text}`}>
          {statusMeta.label}
        </span>
      </div>
    </div>
  );
});

export default OrderItem;
