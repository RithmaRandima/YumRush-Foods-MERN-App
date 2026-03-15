import foodModel from "../models/foodModel.js";
import fs from "fs";

// add food item
export const addFood = async (req, res) => {
  try {
    let image_filename = `${req.file.filename}`;
    let {
      name,
      shortdescription,
      longdescription,
      price,
      category,
      ingredients,
    } = req.body;

    const ingredientArray = ingredients.split(",").map((item) => item.trim());

    const food = new foodModel({
      name,
      shortdescription,
      longdescription,
      price,
      image: image_filename,
      category,
      ingredients: ingredientArray,
    });

    const newNote = await food.save();
    res.status(201).json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log("Error in addFood Function", error);
    res
      .status(500)
      .json({ success: "Error", message: "Internal Server Error " });
  }
};

export const getAllFoods = async (req, res) => {
  try {
    const foods = await foodModel.find();
    res.status(200).json({ success: true, data: foods });
  } catch (error) {
    console.log("Error in getAllFoods Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error " });
  }
};

export const getItemById = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    res.status(200).json({ success: true, data: food });
  } catch (error) {
    console.log("Error in getItemById Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error " });
  }
};

export const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);

    res.status(200).json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log("Error in foodRemove Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
