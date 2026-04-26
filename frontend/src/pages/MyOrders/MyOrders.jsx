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
        { headers: { token } },
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
    <div className="min-h-screen text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl font-semibold text-center mb-8">My Orders</h2>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400">Loading orders...</p>
        )}

        {/* Empty State */}
        {!loading && data.length === 0 && (
          <p className="text-center text-gray-400">
            You haven’t placed any orders yet.
          </p>
        )}

        {/* Orders List */}
        <div className="space-y-4">
          {data.map((order, index) => (
            <div
              key={index}
              className="bg-neutral-900 rounded-xl p-4 shadow-md hover:shadow-lg transition"
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
