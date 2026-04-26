import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaShoppingCart,
  FaUtensils,
  FaDollarSign,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { CartesianGrid } from "recharts";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchOrders();
  }, []);

  const fetchDashboard = async () => {
    const res = await axios.get("http://localhost:4000/api/admin/dashboard");
    if (res.data.success) setData(res.data.data);
  };

  const fetchOrders = async () => {
    const res = await axios.get("http://localhost:4000/api/order/list");
    if (res.data.success) setOrders(res.data.data);
  };

  if (!data) return <p className="p-6">Loading dashboard...</p>;

  // charts
  const ordersChart = Object.keys(data.ordersByDate).map((date) => ({
    name: date,
    orders: data.ordersByDate[date],
  }));

  const statusChart = Object.keys(data.statusData).map((key) => ({
    name: key,
    value: data.statusData[key],
  }));

  // stats
  const stats = [
    {
      title: "Users",
      count: data.totalUsers,
      icon: <FaUsers />,
      color: "bg-blue-500",
    },
    {
      title: "Orders",
      count: data.totalOrders,
      icon: <FaShoppingCart />,
      color: "bg-green-500",
    },
    {
      title: "Foods",
      count: data.totalFoods,
      icon: <FaUtensils />,
      color: "bg-orange-400",
    },
    {
      title: "Revenue",
      count: `$${data.totalRevenue}`,
      icon: <FaDollarSign />,
      color: "bg-amber-400",
    },
  ];

  // status colors
  const getStatusColor = (status) => {
    if (status === "Delivered") return "bg-green-100 text-green-600";
    if (status === "Food Processing") return "bg-yellow-100 text-yellow-600";
    if (status === "Cancelled") return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <div className="list w-[80%] h-[80vh] hide-scrollbar text-[16px] bg-[#151515] rounded-2xl pl-10 p-3 pb-10 overflow-y-auto flex-1 m-3 mb-5">
      {/* Top */}
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      {/* 🔥 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl bg-white shadow-sm border hover:shadow-md transition"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 flex items-center justify-center rounded-full text-white ${item.color}`}
              >
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm text-gray-500">{item.title}</h3>
                <p className="text-2xl font-bold text-gray-800">{item.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 📊 Charts */}
      <div className="grid md:grid-cols-5 gap-6 mb-8">
        {/* Orders Overview */}
        <div className="bg-white col-span-2 p-6 rounded-2xl border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
            Orders Overview
          </h3>

          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ordersChart}>
              {/* GRID */}
              <CartesianGrid
                stroke="#f1f5f9"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #f3f4f6",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  fontSize: "12px",
                }}
              />

              <Bar
                dataKey="orders"
                fill="#111827"
                radius={[6, 6, 0, 0]}
                barSize={18}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Trend */}
        <div className="bg-white col-span-3 p-6 rounded-2xl border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 mb-4 uppercase tracking-wide">
            Orders Trend
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={ordersChart}>
              {/* GRID (horizontal + vertical) */}
              <CartesianGrid stroke="#f1f5f9" strokeDasharray="3 3" />

              {/* Gradient */}
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{ fontSize: 11, fill: "#9ca3af" }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #f3f4f6",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                  fontSize: "12px",
                }}
                cursor={{ stroke: "#6366f1", strokeWidth: 1 }}
              />

              {/* Line */}
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 5,
                  fill: "#6366f1",
                  stroke: "#fff",
                  strokeWidth: 2,
                }}
              />

              {/* Area */}
              <Line
                type="monotone"
                dataKey="orders"
                stroke="transparent"
                fill="url(#areaGradient)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* 📦 Order Status */}
      <div className="bg-white p-5 rounded-xl shadow-md border mb-8">
        <h3 className="text-lg font-semibold mb-4">Order Status</h3>
        <div className="flex gap-4 flex-wrap">
          {statusChart.map((item, i) => (
            <div
              key={i}
              className="px-4 py-2 rounded-full bg-gray-100 text-sm font-medium"
            >
              {item.name}: {item.value}
            </div>
          ))}
        </div>
      </div>

      {/* 🧾 Recent Orders */}
      <div className="bg-white p-5 rounded-xl shadow-md border">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-500 border-b">
                <th className="py-2">Order ID</th>
                <th>User</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.slice(0, 6).map((order, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2">{order._id.slice(-6)}</td>
                  <td>{order.userId}</td>
                  <td>${order.amount}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
