import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  // pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to Load Data");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  const removeFood = async (foodID) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodID });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Failed to Delete Food");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(list.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="w-[80%] h-[80vh] overflow-y-auto hide-scrollbar bg-[#121212] text-white rounded-2xl border border-neutral-800 shadow-xl p-6 m-3">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-white">Food Items</h2>
          <p className="text-xs text-gray-500">
            Total {list.length} products available
          </p>
        </div>
      </div>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-5 text-xs text-gray-500 uppercase px-4 py-3 bg-[#161616] rounded-xl border border-neutral-800">
        <span>Image</span>
        <span>Name</span>
        <span>Category</span>
        <span>Price</span>
        <span className="text-center">Action</span>
      </div>

      {/* LIST */}
      <div className="mt-4 space-y-3">
        {currentItems.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-5 items-center px-4 py-3 rounded-xl bg-[#0f0f0f] border border-neutral-800 hover:border-amber-500/30 hover:bg-[#141414] transition group"
          >
            {/* IMAGE */}
            <div className="flex items-center gap-3">
              <img
                src={`${url}/images/${item.image}`}
                className="w-12 h-12 rounded-lg object-cover border border-neutral-800 group-hover:scale-105 transition"
              />
            </div>

            {/* NAME */}
            <p className="text-sm text-gray-300 group-hover:text-white transition truncate">
              {item.name}
            </p>

            {/* CATEGORY */}
            <p className="text-sm text-gray-400">{item.category}</p>

            {/* PRICE */}
            <p className="text-sm font-medium text-emerald-400">
              ${Number(item.price).toFixed(2)}
            </p>

            {/* ACTION */}
            <div className="flex justify-center">
              <button
                onClick={() => removeFood(item._id)}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition"
        >
          <MdKeyboardArrowLeft size={22} />
        </button>

        <span className="text-xs text-gray-400">
          Page <span className="text-white">{currentPage}</span> of{" "}
          {totalPages || 1}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 disabled:opacity-30 transition"
        >
          <MdKeyboardArrowRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default List;
