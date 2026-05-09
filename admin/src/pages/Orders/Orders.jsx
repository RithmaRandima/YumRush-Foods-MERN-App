import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import OrderItem from "../../components/OrderItem/OrderItem";

const Orders = ({ url }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllOrders = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${url}/api/order/list`);

      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      toast.error("Error fetching orders");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div
      className="
        w-full lg:w-[80%]
        h-[calc(100vh-95px)]
        lg:h-[83vh]
        text-white
        bg-[#151515]
        rounded-2xl
        p-4 sm:p-5
        overflow-y-auto
        flex-1
        m-2 sm:m-3
        mb-5
        hide-scrollbar
      "
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-3">
        <div>
          <h2 className="text-[18px] sm:text-[20px] font-semibold tracking-wide">
            All Orders
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Manage and track customer orders
          </p>
        </div>

        <div className="text-xs text-gray-400 bg-[#0f0f0f] px-3 py-1 rounded-full border border-neutral-800 w-fit">
          Total: {data.length}
        </div>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="text-gray-400 text-sm animate-pulse">
          Loading orders...
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && data.length === 0 && (
        <div className="text-center py-10 text-gray-500">No orders found</div>
      )}

      {/* ORDERS LIST */}
      <div className="space-y-4">
        {data.map((order) => (
          <div
            key={order._id}
            className="transition hover:-translate-y-1 duration-200"
          >
            <OrderItem order={order} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
