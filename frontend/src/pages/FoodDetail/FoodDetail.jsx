import React from "react";
import "./FoodDetail.css";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { FaMinus, FaPlus, FaStar, FaThumbsUp } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { GiSpoon } from "react-icons/gi";
import { LuChefHat } from "react-icons/lu";
import { GiMonsteraLeaf } from "react-icons/gi";
const FoodDetail = () => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

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

  return (
    <div className="min-h-screen flex flex-col">
      {/* top */}
      <div className=" flex p-5 pb-0">
        {/* img section */}
        <div className="w-[50%] py-5">
          <div className=" pl-20  h-125">
            <img
              src={`${url}/images/${singleFood?.image}`}
              alt=""
              className="w-full h-full object-cover "
            />
          </div>
        </div>

        {/* text section */}
        <div className="text-white relative w-[50%] p-10">
          {/* rating section */}
          <div className="absolute flex flex-col items-end right-10 bottom-10 animate-pulse">
            <p className="text-[13px]">Prepaired by </p>
            <div className="relative text-amber-300">
              <h1 className="text-amber-300 tracking-[4px] font-extralight text-2xl">
                YumRush
              </h1>
              <GiForkKnifeSpoon className="absolute -right-7 -bottom-0 text-[30px]" />
            </div>

            <div className="flex gap-2 items-center">
              <FaStar className="text-amber-300/50" />
              <p className="text-[20px] font-extrabold">4.5</p>
              <p className="text-[12x] text-gray-600">(89 reviews)</p>
            </div>
          </div>

          <h1 className="text-[30px] text-amber-300 tracking-[2px] capitalize">
            {singleFood?.name}
          </h1>
          <p className="font-extralight tracking-[1px] mt-4 mb-7 text-[17px] text-gray-400">
            {singleFood?.shortdescription}|| Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Sapiente, amet! Mollitia maiores
            fugiat nihil doloribus vitae quisquam quos ducimus eos!
          </p>

          {/* price details */}
          <div className="mt-10">
            {/* price */}
            <p className="uppercase tracking-[1px] text-[14px] text-gray-600">
              price -{" "}
              <span className="text-[25px] text-amber-300">
                ${singleFood?.price?.toFixed(2)}
              </span>
            </p>
            {/* delivery */}
            <p className="capitalize tracking-[1px] text-gray-600 my-3 text-[14px]">
              express Delivery :{" "}
              <span className="text-[16px] text-gray-400">Available</span>
            </p>
            <div className="bg-amber-400 w-fit text-black px-2 text-[10px] font-bold my-5 animate-bounce">
              Ready in 15 min
            </div>
          </div>

          {/* button section */}
          <div className="w-fit mt-15">
            <div className="flex py-1 px-2 text-white items-center gap-3  rounded-full borde border-amber-300">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  removeFromCart(id);
                }}
                className="w-7 h-7 bg-gray-900 rounded-full hover:scale-105 duration-300  hover:bg-red-300 hover:text-black"
              >
                <FaMinus className="text-[12px] mx-auto" />
              </button>
              <p className=" border-2 border-amber-400 text-[18px] font-bold w-10 h-10 flex items-center justify-center rounded-full text-amber-400">
                {cartItems[id] || 0}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  addToCart(id);
                }}
                className="w-7 h-7 bg-gray-900 rounded-full hover:scale-105 duration-300 hover:bg-green-300 hover:text-black"
              >
                <FaPlus className="text-[12px] mx-auto" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="flex-1 px-9 pb-20">
        <p className="text-gray-300 tracking-[2px] text-2xl my-6">
          <LuChefHat />
          Description
        </p>
        <div>
          {singleFood?.longdescription.split(";").map((para) => (
            <p className="font-extralight tracking-[1px] mt-4 mb-7 text-[17px] text-gray-400">
              {para}
            </p>
          ))}
        </div>

        <p className="text-gray-300 tracking-[2px] text-2xl mt-10 mb-3">
          <GiSpoon />
          Ingredients
        </p>
        <div className="text-white">
          {singleFood?.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-center my-2 ml-7">
              <GiMonsteraLeaf className="mr-2" />{" "}
              <p className="text-[18px] capitalize">{ingredient}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;

{
  /* <div key={singleFood?._id} className="text-white">
      <p>{singleFood?.longdescription}</p>
      <p></p>
      <div>
        {singleFood?.ingredients.map((ingredient) => (
          <p>{ingredient}</p>
        ))}
      </div>
    </div> */
}
