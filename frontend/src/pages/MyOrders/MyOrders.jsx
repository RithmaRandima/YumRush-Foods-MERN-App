import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

import OrderItem from "../../components/OrderItem/OrderItem";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { url, token } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const res = await axios.post(
        `${url}/api/order/userOrders`,
        {},
        {
          headers: { token },
        },
      );

      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      console.log("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className="min-h-screen text-white px-4 sm:px-6 lg:px-8 py-10 overflow-x-hidden pb-20">
      <div className="max-w-5xl mx-auto">
        {/* HEADING */}
        <div className="mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center">
            My Orders
          </h2>

          <p className="text-gray-500 text-sm text-center mt-2">
            Track your recent purchases and delivery status
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center text-gray-400">Loading orders...</p>
        )}

        {/* EMPTY */}
        {!loading && data.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-sm sm:text-base">
              You haven’t placed any orders yet.
            </p>
          </div>
        )}

        {/* ORDERS */}
        <div className="space-y-5">
          {data.map((order, index) => (
            <div
              key={index}
              className="
                bg-[#141414]
                border border-[#242424]
                rounded-2xl
                p-4 sm:p-5
                shadow-md
                hover:border-amber-400/20
                transition
                overflow-hidden
              "
            >
              <OrderItem order={order} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
