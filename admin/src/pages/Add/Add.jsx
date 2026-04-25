import React, { useState } from "react";
import "./Add.css";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);

  const [data, setData] = useState({
    name: "",
    shortdescription: "",
    longdescription: "",
    price: "",
    category: "Salad",
    ingredients: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ VALIDATION FUNCTION
  const validateForm = () => {
    if (!data.name.trim()) return "Food name is required";

    if (!data.shortdescription.trim()) return "Short description is required";

    if (!data.longdescription.trim()) return "Long description is required";

    if (!data.price.trim() || Number(data.price) <= 0)
      return "Valid price is required";

    if (!data.ingredients.trim()) return "Ingredients are required";

    const ingredientsArray = data.ingredients
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i);

    if (ingredientsArray.length < 2)
      return "Enter at least 2 ingredients separated by commas";

    if (!image) return "Food image is required";

    return null;
  };

  // ✅ SUBMIT HANDLER
  const onSubmitHandeler = async (event) => {
    event.preventDefault();

    const error = validateForm();
    if (error) {
      toast.error(error);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("shortdescription", data.shortdescription);
      formData.append("longdescription", data.longdescription);
      formData.append("price", Number(data.price));
      formData.append("category", data.category);
      formData.append("ingredients", data.ingredients);
      formData.append("image", image);

      const response = await axios.post(`${url}/api/food/add`, formData);

      if (response.data.success) {
        setData({
          name: "",
          shortdescription: "",
          longdescription: "",
          price: "",
          category: "Salad",
          ingredients: "",
        });
        setImage(null);
        toast.success(response.data.message);
        window.scrollTo(0, 0);
      } else {
        toast.error("Error adding food");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="add w-[80%] text-white text-[16px] bg-[#151515] rounded-2xl pl-10 p-3 mb-5 pb-10">
      <form className="gap-5 space-between" onSubmit={onSubmitHandeler}>
        {/* IMAGE UPLOAD */}
        <div className="add-img-upload space-between">
          <p>Upload Image</p>

          <label
            htmlFor="image"
            className="cursor-pointer bg-[#0f0f0f] text-amber-300/30 hover:text-amber-300/40 rounded-xs w-[105px] h-[60px] flex flex-col items-center justify-center"
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
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </div>

        {/* NAME */}
        <div className="add-product-name space-between my-3">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            placeholder="Enter Name Here"
            onChange={onChangeHandler}
            value={data.name}
          />
        </div>

        {/* DESCRIPTIONS */}
        <div className="flex gap-7.5 my-3">
          <div className="add-product-description space-between">
            <p>Short Description</p>
            <textarea
              name="shortdescription"
              rows={3}
              placeholder="Write Content Here"
              onChange={onChangeHandler}
              value={data.shortdescription}
            />
          </div>

          <div className="add-product-description space-between">
            <p>Product Description</p>
            <textarea
              name="longdescription"
              rows={5}
              placeholder="Write Content Here"
              onChange={onChangeHandler}
              value={data.longdescription}
            />
          </div>
        </div>

        {/* CATEGORY + PRICE */}
        <div className="add-category-price">
          <div className="add-category space-between">
            <p>Product Category</p>
            <select
              onChange={onChangeHandler}
              name="category"
              value={data.category}
              className="bg-[#0f0f0f] rounded-full"
            >
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

          <div className="add-price space-between">
            <p>Product Price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number" // ✅ fixed
              name="price"
              placeholder="$20"
            />
          </div>
        </div>

        {/* INGREDIENTS */}
        <div className="add-infredients space-between my-3">
          <p>Product Ingredients</p>
          <input
            type="text"
            name="ingredients"
            placeholder="Enter Ingredients (e.g. Tomato, Cheese)"
            onChange={onChangeHandler}
            value={data.ingredients}
          />
        </div>

        {/* BUTTON */}
        <button
          className="border border-amber-300 w-fit p-2 px-8 mt-4 tracking-[3px] text-[12px] font-bold hover:bg-amber-300 hover:text-black cursor-pointer duration-200 hover:-translate-y-1"
          type="submit"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
