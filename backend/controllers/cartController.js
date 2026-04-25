import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData || {};

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });

    return res.json({
      success: true,
      message: "Added to cart",
      cartData,
    });
  } catch (error) {
    console.log("addToCart error:", error);
    return res.json({
      success: false,
      message: "Error adding to cart",
    });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    let cartData = userData.cartData || {};

    const itemId = req.body.itemId;

    if (cartData[itemId]) {
      cartData[itemId] -= 1;

      // remove item if quantity becomes 0
      if (cartData[itemId] <= 0) {
        delete cartData[itemId];
      }
    }

    await userModel.findByIdAndUpdate(req.userId, { cartData });

    return res.json({
      success: true,
      message: "Removed from cart",
      cartData,
    });
  } catch (error) {
    console.log("removeFromCart error:", error);
    return res.json({
      success: false,
      message: "Error removing from cart",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }
    const cartData = userData.cartData || {};

    return res.json({
      success: true,
      message: "Fetching cart data",
      cartData,
    });
  } catch (error) {
    console.log("getCart error:", error);
    return res.json({
      success: false,
      message: "getting data from cart",
    });
  }
};
