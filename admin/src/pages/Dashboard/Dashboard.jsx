import React, { useContext } from "react";
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
  CartesianGrid,
  Area,
  Cell,
} from "recharts";

import { PieChart, Pie } from "recharts";

import { AdminContext } from "../../context/AdminContext";

const Dashboard = () => {
  const {
    dashboard: data,
    orders,
    loading,
    foodList,
    url,
  } = useContext(AdminContext);

  if (loading || !data) {
    return <p className="p-6 text-gray-400">Loading dashboard...</p>;
  }

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
      color: "bg-blue-600",
    },
    {
      title: "Orders",
      count: data.totalOrders,
      icon: <FaShoppingCart />,
      color: "bg-green-600",
    },
    {
      title: "Foods",
      count: data.totalFoods,
      icon: <FaUtensils />,
      color: "bg-orange-500",
    },
    {
      title: "Revenue",
      count: `$${data.totalRevenue}`,
      icon: <FaDollarSign />,
      color: "bg-amber-500",
    },
  ];

  const getStatusColor = (status) => {
    if (status === "Delivered") return "bg-green-900 text-green-300";
    if (status === "Food Processing") return "bg-yellow-900 text-yellow-300";
    if (status === "Cancelled") return "bg-red-900 text-red-300";
    return "bg-neutral-800 text-gray-300";
  };

  const revenueChart = Object.keys(data.revenueByDate).map((date) => ({
    name: date,
    revenue: data.revenueByDate[date],
  }));

  // order chart
  const ordersChart = Object.keys(data.ordersByDate).map((date) => {
    const total = data.ordersByDate[date] || 0;

    const delivered = Math.round(total * 0.6);
    const processing = Math.round(total * 0.3);
    const cancelled = Math.max(total - delivered - processing, 0);

    return {
      name: date,
      total,
      delivered,
      processing,
      cancelled,
    };
  });

  // 🔥 auto max value for chart
  const maxValue = Math.max(
    ...ordersChart.flatMap((item) => [
      item.total,
      item.delivered,
      item.processing,
    ]),
  );

  return (
    <div className="list w-[80%] h-[80vh] hide-scrollbar text-[16px] bg-[#101010] text-white rounded-2xl p-4 pb-10 overflow-y-auto flex-1 m-3 mb-5">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((item, index) => (
          <div
            key={index}
            className="
        group relative p-5 rounded-2xl
        bg-gradient-to-b from-[#1a1a1a] to-[#141414]
        border border-neutral-800
        hover:border-amber-500/40
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_0_25px_rgba(251,191,36,0.15)]
      "
          >
            {/* Glow accent */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-r from-amber-500/10 via-transparent to-amber-500/10" />

            <div className="relative flex items-center gap-4">
              {/* Icon */}
              <div
                className={`
            w-11 h-11 flex items-center justify-center rounded-xl
            text-white shadow-lg
            bg-gradient-to-br from-amber-500/30 to-amber-600/10
            group-hover:scale-110 transition
          `}
              >
                {item.icon}
              </div>

              {/* Text */}
              <div>
                <h3 className="text-sm text-gray-400 group-hover:text-gray-300 transition">
                  {item.title}
                </h3>

                <p className="text-2xl font-bold text-white tracking-tight">
                  {item.count}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Charts Section */}
      <div className="grid md:grid-cols-6 gap-6 mb-8">
        {/* 📊 Orders + Revenue Donut Charts */}
        <div className="grid md:grid-cols-2  col-span-3">
          {/* 📦 ORDERS DONUT */}
          <div className="">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">Daily Orders</h3>
              <p className="text-sm text-gray-400">
                {data.totalOrders} total orders
              </p>
            </div>

            {(() => {
              const total = data.totalOrders || 0;

              const delivered = data.statusData?.Delivered || 0;
              const processing = data.statusData?.["Food Processing"] || 0;
              const cancelled = data.statusData?.Cancelled || 0;
              const other = total - (delivered + processing + cancelled);

              const orderData = [
                { name: "Delivered", value: delivered },
                { name: "Processing", value: processing },
                { name: "Cancelled", value: cancelled },
                { name: "Other", value: other > 0 ? other : 0 },
              ];

              const percent = total ? Math.round((delivered / total) * 100) : 0;

              return (
                <div className="relative w-full h-[240px]">
                  {/* CENTER TEXT */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-white text-3xl font-bold">{percent}%</p>
                    <p className="text-gray-400 text-sm">Delivered</p>
                  </div>

                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#111",
                          border: "none",
                          borderRadius: "10px",
                          color: "#fff",
                        }}
                      />

                      <Pie
                        data={orderData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        startAngle={90}
                        endAngle={-270}
                        stroke="none"
                      >
                        {/* Delivered */}
                        <Cell fill="#22c55e" />

                        {/* Processing */}
                        <Cell fill="#facc15" />

                        {/* Cancelled */}
                        <Cell fill="#ef4444" />

                        {/* Other */}
                        <Cell fill="#3f3f46" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              );
            })()}

            <p className="text-center -mt-5 text-gray-400 text-sm">
              Breakdown of order statuses
            </p>
          </div>

          {/* 💰 REVENUE DONUT */}
          <div className="">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">
                Daily Revenue
              </h3>
              <p className="text-sm text-gray-400">
                ${data.totalRevenue} earned
              </p>
            </div>

            {(() => {
              const target = 5000;
              const earned = data.totalRevenue || 0;
              const remaining = Math.max(target - earned, 0);
              const percent = Math.min((earned / target) * 100, 100).toFixed(0);

              const revenueData = [
                { name: "Earned", value: earned },
                { name: "Remaining", value: remaining },
              ];

              return (
                <div className="relative w-full h-[240px]">
                  {/* CENTER TEXT */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="text-white text-3xl font-bold">{percent}%</p>
                    <p className="text-gray-400 text-sm">Revenue</p>
                  </div>

                  <ResponsiveContainer width="100%" height={240}>
                    <PieChart>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#111",
                          border: "none",
                          borderRadius: "10px",
                          color: "#fff",
                        }}
                      />

                      <defs>
                        <linearGradient
                          id="revenueGrad"
                          x1="0"
                          y1="0"
                          x2="1"
                          y2="1"
                        >
                          <stop offset="0%" stopColor="#fbbf24" />
                          <stop offset="100%" stopColor="#f59e0b" />
                        </linearGradient>
                      </defs>

                      <Pie
                        data={revenueData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        startAngle={90}
                        endAngle={-270}
                        stroke="none"
                        color="white"
                      >
                        <Cell fill="url(#revenueGrad)" />
                        <Cell fill="#2a2a2a" />
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              );
            })()}

            <p className="text-center -mt-5 text-gray-400 text-sm ">
              Target: $5000/day
            </p>
          </div>
        </div>

        {/* 2. REVENUE TREND (SMART BAR CHART) */}
        <div className="bg-[#1a1a1a] col-span-3 p-6 rounded-2xl border border-neutral-800">
          {/* Header */}
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Revenue Performance
              </h3>
              <p className="text-sm text-gray-400">Daily earnings breakdown</p>
            </div>

            <span className="text-[25px] font-extrabold text-amber-400 ">
              ${data.totalRevenue.toFixed(2)}
            </span>
          </div>

          {(() => {
            // 🔥 AUTO SCALE (SAFE FOR ANY DATA SIZE)
            const rawMax = Math.max(
              ...revenueChart.map((item) => item.revenue || 0),
            );

            const yAxisMax = Math.ceil(rawMax * 1.3) || 100;

            return (
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={revenueChart}>
                  {/* 🎨 GLOW GRADIENTS */}
                  <defs>
                    <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#ef4444"
                        stopOpacity={0.95}
                      />
                      <stop
                        offset="100%"
                        stopColor="#ef4444"
                        stopOpacity={0.2}
                      />
                    </linearGradient>

                    <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#fbbf24"
                        stopOpacity={0.95}
                      />
                      <stop
                        offset="100%"
                        stopColor="#f59e0b"
                        stopOpacity={0.2}
                      />
                    </linearGradient>

                    <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#fbbf24"
                        stopOpacity={0.95}
                      />
                      <stop
                        offset="100%"
                        stopColor="#f59e0b"
                        stopOpacity={0.25}
                      />
                    </linearGradient>
                    {/* ✨ GLOW EFFECT */}
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  <CartesianGrid stroke="#1f1f1f" vertical={false} />

                  <XAxis
                    dataKey="name"
                    stroke="#666"
                    tickLine={false}
                    axisLine={false}
                  />

                  <YAxis
                    domain={[0, yAxisMax]}
                    stroke="#666"
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #222",
                      color: "#111",
                      fontSize: "10px",
                      padding: "2px 6px",
                    }}
                  />

                  {/* 📊 MAIN BARS */}
                  <Bar
                    dataKey="revenue"
                    barSize={15}
                    radius={0}
                    isAnimationActive={true}
                    animationDuration={900}
                  >
                    {revenueChart.map((entry, index) => {
                      const ratio = entry.revenue / (yAxisMax || 1);

                      let fill = "url(#blueGrad)";

                      if (ratio < 0.3) fill = "url(#redGrad)";
                      else if (ratio < 0.7) fill = "url(#blueGrad)";
                      else fill = "url(#greenGrad)";

                      return (
                        <Cell
                          key={`cell-${index}`}
                          fill={fill}
                          filter="url(#glow)"
                        />
                      );
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            );
          })()}
        </div>
      </div>

      <div className="bg[#141414] p-6 rounded-2xl border border-neutral-800 mb-18 ">
        {/* order overview */}
        <div className="mb-5 mt-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Orders Overview
              </h3>
              <p className="text-sm text-gray-400">
                Orders • Delivered • Processing
              </p>
            </div>

            <span className="text-[17px] text-amber-400 font-medium">
              {data.totalOrders} total
            </span>
          </div>

          {(() => {
            // 🔥 AUTO SCALE (safe + dynamic)
            const rawMax = Math.max(
              ...ordersChart.flatMap((item) => [
                item.total,
                item.delivered,
                item.processing,
              ]),
            );

            // same idea as ÷2 but SAFE for any dataset
            const yAxisMax = Math.ceil((rawMax / 2) * 1.2);

            return (
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={ordersChart} barGap={5} barCategoryGap="25%">
                  {/* GRID */}
                  <CartesianGrid
                    stroke="#1f1f1f"
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="name"
                    stroke="#666"
                    tickLine={false}
                    axisLine={false}
                  />

                  {/* DYNAMIC MAX (NO BREAK EVER) */}
                  <YAxis
                    domain={[0, yAxisMax]}
                    stroke="#666"
                    tickLine={false}
                    axisLine={false}
                  />

                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    contentStyle={{
                      backgroundColor: "#111",
                      border: "none",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />

                  {/* GRADIENTS */}
                  <defs>
                    <linearGradient id="totalGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#a855f7"
                        stopOpacity={0.3}
                      />
                    </linearGradient>

                    <linearGradient
                      id="deliveredGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#22c55e" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#06b6d4"
                        stopOpacity={0.3}
                      />
                    </linearGradient>

                    <linearGradient
                      id="processingGrad"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#fbbf24" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#f59e0b"
                        stopOpacity={0.3}
                      />
                    </linearGradient>
                  </defs>

                  {/* BARS */}
                  <Bar
                    dataKey="total"
                    fill="url(#totalGrad)"
                    radius={0}
                    barSize={22}
                  />

                  <Bar
                    dataKey="delivered"
                    fill="url(#deliveredGrad)"
                    radius={0}
                    barSize={22}
                  />

                  <Bar
                    dataKey="processing"
                    fill="url(#processingGrad)"
                    radius={0}
                    barSize={22}
                  />
                </BarChart>
              </ResponsiveContainer>
            );
          })()}

          {/* LEGEND */}
          <div className="flex gap-4 mt-4 text-sm text-gray-400">
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-indigo-500 rounded-sm"></div> Total
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div> Delivered
            </span>
            <span className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-400 rounded-sm"></div>{" "}
              Processing
            </span>
          </div>
        </div>

        {/* Status */}
        <div className="bg[#141414] p-6 rounded-2xl bord border-neutral-800 ">
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-lg font-semibold text-white">Order Status</h3>
              <p className="text-sm text-gray-500">Current system breakdown</p>
            </div>

            <span className="text-xs text-gray-400 bg-[#1f1f1f] px-3 py-1 rounded-full">
              Live
            </span>
          </div>

          {/* Status grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statusChart.map((item, i) => {
              const colors = {
                Delivered: "from-green-500 to-emerald-400",
                "Food Processing": "from-amber-500 to-yellow-400",
                Cancelled: "from-red-500 to-rose-400",
              };

              const gradient =
                colors[item.name] || "from-indigo-500 to-purple-400";

              return (
                <div
                  key={i}
                  className="relative overflow-hidden p-4 rounded-xl bg-[#1a1a1a] border border-neutral-800 hover:scale-[1.02] transition"
                >
                  {/* glow background */}
                  <div
                    className={`absolute inset-0 opacity-10 bg-gradient-to-br ${gradient}`}
                  />

                  {/* content */}
                  <div className="relative">
                    <p className="text-gray-400 text-xs">{item.name}</p>
                    <p className="text-xl font-bold text-white mt-1">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: Orders + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {/* Recent Orders */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-xl">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Recent Orders
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Latest customer activity
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-gray-400 bg-[#1a1a1a] px-3 py-1 rounded-full border border-neutral-800">
                Live • {orders.length}
              </span>
            </div>
          </div>

          {/* Table wrapper */}
          <div className="rounded-xl overflow-hidden border border-neutral-800">
            <table className="w-full text-sm">
              <thead className="bg-[#161616] text-gray-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="text-left px-5 py-3">Order</th>
                  <th className="text-left px-5 py-3">User</th>
                  <th className="text-left px-5 py-3">Amount</th>
                  <th className="text-left px-5 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.slice(0, 6).map((order, index) => (
                  <tr
                    key={index}
                    className="group border-t border-neutral-800 hover:bg-[#181818] transition-all duration-200"
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-gray-300 group-hover:text-white">
                        #{order._id.slice(-6)}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-gray-300 group-hover:text-white">
                      {order.userId}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <span className="text-emerald-400 font-medium">
                        ${Number(order.amount).toFixed(2)}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
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

        {/* Recently Added Products */}
        <div className="bg-[#121212] p-6 rounded-2xl border border-neutral-800 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Recently Added Products
              </h3>
              <p className="text-sm text-gray-500">
                Latest menu or inventory updates
              </p>
            </div>

            <span className="text-xs text-gray-400 bg-[#1a1a1a] px-3 py-1 rounded-full border border-neutral-800">
              New
            </span>
          </div>

          {/* Product list */}
          <div className="grid grid-cols-1 gap-4">
            {foodList?.slice(0, 6).map((product, index) => (
              <div
                key={index}
                className="group flex items-center gap-4 p-4 rounded-xl bg-[#161616] border border-neutral-800 hover:border-amber-500/30 transition"
              >
                <div className="w-12 h-12 rounded-lg bg-neutral-800 overflow-hidden flex-shrink-0">
                  <img
                    src={`${url}/images/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="text-white text-sm font-medium group-hover:text-amber-400">
                    {product.name}
                  </h4>
                  <p className="text-xs text-gray-500">${product.price}</p>
                </div>

                <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  New
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
