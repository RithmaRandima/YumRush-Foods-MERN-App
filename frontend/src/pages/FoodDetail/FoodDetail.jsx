import React, { useContext, useEffect, useState } from "react";
import "./FoodDetail.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

import { FaMinus, FaPlus, FaStar, FaUserCircle } from "react-icons/fa";

import { GiForkKnifeSpoon, GiSpoon, GiWheat } from "react-icons/gi";

import { LuChefHat } from "react-icons/lu";

const FoodDetail = () => {
  const { cartItems, addToCart, removeFromCart, url } =
    useContext(StoreContext);

  const { id } = useParams();

  const [singleFood, setSingleFood] = useState(null);
  const [loading, setLoading] = useState(true);

  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);

        const res = await axios.get(`${url}/api/food/${id}`);

        if (res.data.success) {
          setSingleFood(res.data.data);
        } else {
          setSingleFood(null);
        }
      } catch (err) {
        console.log(err);
        setSingleFood(null);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id, url]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      user: "Guest User",
      text: commentText,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!singleFood) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-400">
        Food not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-20 overflow-x-hidden">
      {/* TOP SECTION */}
      <div className="flex flex-col lg:flex-row p-5 pb-0">
        {/* IMAGE */}
        <div className="w-full lg:w-[50%] py-5">
          <div className="lg:pl-20 h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden">
            <img
              src={`${url}/images/${singleFood.image}`}
              alt={singleFood.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* TEXT */}
        <div className="text-white relative w-full lg:w-[50%] p-5 lg:p-10">
          {/* BRANDING */}
          <div className="absolute right-5 lg:right-10 bottom-5 lg:bottom-10 text-right animate-pulse hidden sm:block">
            <p className="text-xs text-gray-400">Prepared by</p>

            <div className="text-amber-300 flex items-center justify-end gap-2">
              <h1 className="tracking-[2px] sm:tracking-[4px] font-extralight text-xl">
                YumRush
              </h1>

              <GiForkKnifeSpoon />
            </div>

            <div className="flex items-center justify-end gap-2">
              <FaStar className="text-amber-300/50" />

              <p className="font-bold">4.5</p>

              <p className="text-xs text-gray-500">(89 reviews)</p>
            </div>
          </div>

          {/* TITLE */}
          <h1 className="text-2xl sm:text-3xl text-amber-300 capitalize break-words">
            {singleFood.name}
          </h1>

          {/* SHORT DESCRIPTION */}
          <p className="text-gray-400 mt-4 text-sm sm:text-base break-words leading-relaxed">
            {singleFood.shortdescription}
          </p>

          {/* PRICE */}
          <div className="mt-8">
            <p className="text-gray-500 text-sm">
              Price
              <span className="text-2xl text-amber-300 ml-2">
                ${singleFood.price?.toFixed(2)}
              </span>
            </p>

            <p className="text-gray-500 text-sm mt-2">
              Express Delivery:
              <span className="text-gray-300 ml-1">Available</span>
            </p>

            <div className="bg-amber-400 text-black w-fit px-2 py-1 rounded text-xs font-bold mt-3 animate-bounce">
              Ready in 15 min
            </div>
          </div>

          {/* CART */}
          <div className="mt-8 flex items-center gap-3 w-fit border border-amber-300 rounded-full px-3 py-1">
            <button
              onClick={() => removeFromCart(id)}
              className="hover:text-red-300 transition"
            >
              <FaMinus />
            </button>

            <span>{cartItems[id] || 0}</span>

            <button
              onClick={() => addToCart(id)}
              className="hover:text-green-300 transition"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="px-5 lg:px-9 pb-10">
        {/* DESCRIPTION */}
        <div className="mt-5">
          <h2 className="text-lg sm:text-xl font-medium text-white flex items-center gap-2 mb-4">
            <LuChefHat className="text-amber-300" />
            Description
          </h2>

          {(singleFood.longdescription || "")
            .split(";")
            .filter(Boolean)
            .map((para, i) => (
              <p
                key={i}
                className="ml-1 sm:ml-3 text-gray-400 mt-3 text-sm sm:text-base leading-relaxed break-words"
              >
                {para}
              </p>
            ))}
        </div>

        {/* INGREDIENTS */}
        <div className="mt-10">
          <h2 className="text-lg sm:text-xl font-medium text-white flex items-center gap-2 mb-4">
            <GiSpoon className="text-amber-300" />
            Ingredients
          </h2>

          <div className="flex flex-wrap gap-3">
            {(singleFood.ingredients || []).map((item, i) => (
              <div
                key={i}
                className="
                  bg-[#141414]
                  border border-[#242424]
                  rounded-lg
                  px-4 py-2
                  text-gray-300
                  text-sm
                  capitalize
                  flex items-center gap-2
                  hover:border-amber-400/40
                  hover:text-amber-200
                  transition
                  max-w-full
                "
              >
                <GiWheat className="text-amber-300 text-sm flex-shrink-0" />

                <span className="break-words">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* COMMENT SECTION */}
        <div className="mt-16 border-t border-gray-800 pt-10">
          {/* HEADER */}
          <div className="flex justify-between items-center gap-3 mb-5 flex-wrap">
            <h2 className="text-white text-lg">Reviews</h2>

            <span className="text-gray-500 text-sm">
              {comments.length} comments
            </span>
          </div>

          {/* INPUT */}
          <div className="w-full md:w-[85%] mx-auto">
            <div className="bg-[#141414] border border-[#242424] rounded-xl p-4">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a review..."
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-white
                  text-sm
                  placeholder:text-gray-500
                "
              />

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleAddComment}
                  className="
                    bg-[#1f1f1f]
                    text-amber-300
                    border border-[#2a2a2a]
                    px-4 py-2
                    rounded-md
                    hover:bg-amber-400
                    hover:text-black
                    transition
                  "
                >
                  Post
                </button>
              </div>
            </div>
          </div>

          {/* COMMENTS */}
          <div className="mt-6 space-y-4 md:w-[85%] mx-auto">
            {comments.length === 0 && (
              <p className="text-gray-500 text-sm text-center">
                No reviews yet
              </p>
            )}

            {comments.map((c) => (
              <div
                key={c.id}
                className="
                  bg-[#141414]
                  border border-[#242424]
                  rounded-xl
                  p-4
                  hover:bg-[#1a1a1a]
                  transition
                "
              >
                <div className="flex items-center gap-2 mb-2">
                  <FaUserCircle className="text-gray-500 text-xl flex-shrink-0" />

                  <p className="text-amber-300 text-sm break-words">{c.user}</p>
                </div>

                <p className="text-gray-300 text-sm break-words leading-relaxed">
                  {c.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetail;
