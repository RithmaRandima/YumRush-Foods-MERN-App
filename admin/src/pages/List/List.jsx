import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.status) {
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

  return (
    <div className="list w-[80%]  text-white  text-[16px]  bg-[#151515] rounded-2xl pl-10 p-3 ">
      <p className="text-[20px] text-amber-300 tracking-[3px] my-5">
        All Foods List
      </p>
      {/* list container */}
      <div className="list-table">
        {/* list container format */}
        <div className="list-table-format title text-center">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {list.map((item) => (
          <div
            className="list-table-format text-center hover:shadow-[1px_1px_1px_rgba(251,191,36,0.1)]  rounded-2xl bg-[#fcd34d06] py-2 pl-4 hover:-translate-y-1 transition duration-200 pr-3 my-3"
            key={item._id}
          >
            <img
              src={`${url}/images/${item.image}`}
              alt=""
              className="h-25 w-full object-cover"
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p className="" onClick={() => removeFood(item._id)}>
              x
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
