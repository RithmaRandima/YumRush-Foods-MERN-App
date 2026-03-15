import React from "react";
import "./FoodDetail.css";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";

const FoodDetail = () => {
  const { url } = useContext(StoreContext);
  const { id } = useParams();
  const [singleFood, setSingleFood] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`${url}/api/food/${id}`);
        if (res.data.success) {
          setSingleFood(res.data.data);
        } else {
          console.log("Food item not found");
          setSingleFood(null);
        }
      } catch (error) {
        console.log("Something went wrong");
        console.log(error);
      }
    };

    fetchItem();
  }, [id]);

  console.log(singleFood);

  return <div>FoodDetail</div>;
};

export default FoodDetail;
