import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";
import { toast } from "react-toastify";
import OrderItem from "../../components/OrderItem/OrderItem";

const Orders = ({ url }) => {
  const [data, setData] = useState([]);
  const getAllOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if (res.data.success) {
        setData(res.data.data);
      }
    } catch (error) {
      toast.error("Error Fetching Orders.");
      console.log("error on getAllOrder function", error);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  console.log(data);
  return (
    <div className="list w-[80%] h-[80vh] text-white text-[16px] bg-[#151515] rounded-2xl pl-10 p-3 pb-10 overflow-y-auto flex-1 m-3 mb-5 hide-scrollbar">
      <p className="text-[20px] text-amber-300 tracking-[3px] my-5">
        All Orders ({data.length})
      </p>
      {/* Orders List */}
      <div className="space-y-4">
        {data.map((order, index) => (
          <div key={index} className=" px-4 py-1 ">
            <OrderItem order={order} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
