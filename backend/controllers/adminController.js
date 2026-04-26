import orderModel from "../models/oderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js";

export const getDashboardData = async (req, res) => {
  try {
    // totals
    const totalUsers = await userModel.countDocuments();
    const totalOrders = await orderModel.countDocuments();
    const totalFoods = await foodModel.countDocuments();

    const orders = await orderModel.find();

    // total revenue
    const totalRevenue = orders.reduce((acc, order) => acc + order.amount, 0);

    // orders by status
    const statusData = {};
    orders.forEach((order) => {
      statusData[order.status] = (statusData[order.status] || 0) + 1;
    });

    // orders per day
    const ordersByDate = {};
    orders.forEach((order) => {
      const date = order.createdAt.toISOString().split("T")[0];
      ordersByDate[date] = (ordersByDate[date] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalFoods,
        totalRevenue,
        statusData,
        ordersByDate,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Dashboard error" });
  }
};
