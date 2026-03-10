import React, { useState } from "react";
import "./Add.css";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandeler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error("Error adding food");
    }
  };

  return (
    <div className="add w-[70%] mt-12 text-[#6d6d6d] ml-[max(5vw,25px)] text-[16px]">
      <form className="gap-5 space-between" onSubmit={onSubmitHandeler}>
        {/* add image */}
        <div className="add-img-upload space-between">
          <p>Upload Image</p>
          <label
            htmlFor="image"
            className="cursor-pointer bg-gray-100 text-gray-400 rounded-[2px] w-[125px] h-[70px] flex flex-col items-center justify-center"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <IoMdCloudUpload className="text-[26px]" />
                <p className="text-[12px] font-semibold -mt-1">Upload</p>
              </>
            )}
          </label>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            type="file"
            id="image"
            hidden
            required
          />
        </div>

        {/* add product name */}
        <div className="add-product-name space-between">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Enter Name Here"
            onChange={onChangeHandler}
            value={data.name}
          />
        </div>

        {/* add product description */}
        <div className="add-product-description space-between">
          <p>Product Description</p>
          <textarea
            type="text"
            name="description"
            rows={6}
            placeholder="Write Content Here"
            onChange={onChangeHandler}
            value={data.description}
          ></textarea>
        </div>

        {/* add product category price */}
        <div className="add-category-price">
          <div className="add-category space-between">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          {/* add price */}
          <div className="add-price space-between">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="Number"
              name="price"
              placeholder="$20"
            />
          </div>
        </div>
        <button className="add-btn" type="submit">
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
