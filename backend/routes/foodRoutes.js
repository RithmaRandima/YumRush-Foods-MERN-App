import express from "express";
import {
  addFood,
  getAllFoods,
  getItemById,
  removeFood,
} from "../controllers/foodControllers.js";
import upload from "../config/multerConfig.js";

const foodRouter = express.Router();

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", getAllFoods);
foodRouter.get("/:id", getItemById);
foodRouter.post("/remove", removeFood);

export default foodRouter;
