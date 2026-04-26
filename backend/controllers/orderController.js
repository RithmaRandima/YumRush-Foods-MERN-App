import orderModel from "../models/oderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// placing user order for frontend
export const placeOrder = async (req, res) => {
  try {
    const { items, amount, address } = req.body;

    // 1. Create order in DB
    const newOrder = new orderModel({
      userId: req.userId,
      items,
      amount,
      address,
    });

    await newOrder.save();

    await userModel.findByIdAndUpdate(req.userId, { cartData: {} });

    // 2. Create Stripe line items
    const line_items = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Stripe uses cents
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Delivery Charges" },
        unit_amount: 200, // $2
      },
      quantity: 1,
    });

    // 3. Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `http://localhost:5173/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `http://localhost:5173/verify?success=false&orderId=${newOrder._id}`,
    });

    // 4. Send response
    res.json({
      success: true,
      session_url: session.url,
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error placing order",
    });
  }
};

// verify payments
export const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: true, message: "Not Paid" });
    }
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error Veryfying order",
    });
  }
};

// user orders for frontend
export const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.userId });

    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error getting orders",
    });
  }
};

//  list all order for admin panel

export const listAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error getting all orders for adimin",
    });
  }
};

// update Order Status

export const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "Error update Status",
    });
  }
};
