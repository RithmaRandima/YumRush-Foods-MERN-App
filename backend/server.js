import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoutes.js";
import userRouter from "./routes/userRouts.js";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors({}));

app.get("/", (req, res) => {
  res.send("API Working");
});

// api endpoints
app.use("/api/food", foodRouter);
app.use("/api/user", userRouter);
app.use("/images", express.static("uploads"));

// connect db
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server Started on ${port} port`);
  });
});

// mongodb+srv://programmingrandy_db_user:fxZUEh7SlWAP6Cok@cluster0.jwuaixr.mongodb.net/?appName=Cluster0
