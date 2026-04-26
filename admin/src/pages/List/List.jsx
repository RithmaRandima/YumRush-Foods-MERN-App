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
    <div className="list w-[80%] text-white text-[16px] bg-[#151515] rounded-2xl pl-10 p-3 pb-10 overflow-y-auto flex-1 m-3 mb-5">
      <p className="text-[20px] text-amber-300 tracking-[3px] my-5">
        All Foods List ({list.length})
      </p>

      <div className="list-table">
        <div className="list-table-format title text-center">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {currentItems.map((item, index) => (
          <div
            className="list-table-format text-center hover:shadow-[1px_1px_1px_rgba(251,191,36,0.05)] rounded-2xl bg-[#0f0f0f] py-2 pl-4 hover:-translate-y-1 transition duration-200 pr-3 my-3 relative"
            key={item._id}
          >
            <img
              src={`${url}/images/${item.image}`}
              alt=""
              className="h-20 w-full object-cover"
            />
            <p className="absolute top-4 left-24 w-5 h-5 bg-white text-black font-bold rounded-full text-[10px] flex items-center justify-center">
              {index + 1}
            </p>
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <div
              className="flex items-center justify-center hover:scale-105 hover:text-red-500 duration-200 cursor-pointer"
              onClick={() => removeFood(item._id)}
            >
              <FaTrash />
            </div>
          </div>
        ))}
      </div>

      {/* pagination controls */}
      <div className="flex items-center justify-center gap-4 mt-10 text-amber-300">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="w-7 h-7 rounded-full flex items-center justify-center bg-amber-300 disabled:opacity-40"
        >
          <MdKeyboardArrowLeft size={25} className="text-black font-bold" />
        </button>

        <span className="text-[14px]">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="w-7 h-7 rounded-full flex items-center justify-center bg-amber-300 disabled:opacity-40"
        >
          <MdKeyboardArrowRight size={25} className="text-black font-bold" />
        </button>
      </div>
    </div>
  );
};

export default List;
