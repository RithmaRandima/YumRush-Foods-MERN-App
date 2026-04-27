import React, { useContext, useState } from "react";
import "./Add.css";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";

const Add = ({ url }) => {
  const { fetchDashboard } = useContext(AdminContext);
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
        await fetchDashboard();
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
    <div className="w-[80%] h-[80vh] overflow-y-auto hide-scrollbar text-white bg-[#121212] rounded-2xl p-6 m-3 border border-neutral-800 shadow-xl">
      <form className="space-y-8" onSubmit={onSubmitHandeler}>
        {/* HEADER */}
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-white">Add New Product</h2>
          <p className="text-xs text-gray-500">Create a new menu item</p>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Product Image</p>

          <label
            htmlFor="image"
            className="group relative flex items-center justify-center w-32 h-20 rounded-xl border border-dashed border-neutral-700 bg-[#0f0f0f] cursor-pointer hover:border-amber-500/40 transition"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="text-center text-gray-500 group-hover:text-amber-400 transition">
                <IoMdCloudUpload className="text-2xl mx-auto mb-1" />
                <p className="text-xs">Upload</p>
              </div>
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
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Product Name</p>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChangeHandler}
            placeholder="Enter product name"
            className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] border border-neutral-800 text-white placeholder-gray-600 focus:border-amber-500/40 focus:outline-none transition"
          />
        </div>

        {/* DESCRIPTIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Short Description</p>
            <textarea
              name="shortdescription"
              value={data.shortdescription}
              onChange={onChangeHandler}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] border border-neutral-800 text-white placeholder-gray-600 focus:border-amber-500/40 focus:outline-none transition"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-400">Long Description</p>
            <textarea
              name="longdescription"
              value={data.longdescription}
              onChange={onChangeHandler}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] border border-neutral-800 text-white placeholder-gray-600 focus:border-amber-500/40 focus:outline-none transition"
            />
          </div>
        </div>

        {/* CATEGORY + PRICE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Category</p>
            <select
              name="category"
              value={data.category}
              onChange={onChangeHandler}
              className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] border border-neutral-800 text-white focus:border-amber-500/40 outline-none"
            >
              <option>Salad</option>
              <option>Rolls</option>
              <option>Deserts</option>
              <option>Sandwich</option>
              <option>Cake</option>
              <option>Pure Veg</option>
              <option>Pasta</option>
              <option>Noodles</option>
            </select>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-400">Price</p>
            <input
              type="number"
              name="price"
              value={data.price}
              onChange={onChangeHandler}
              placeholder="0.00"
              className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] border border-neutral-800 text-white placeholder-gray-600 focus:border-amber-500/40 focus:outline-none transition"
            />
          </div>
        </div>

        {/* INGREDIENTS */}
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Ingredients</p>
          <input
            type="text"
            name="ingredients"
            value={data.ingredients}
            onChange={onChangeHandler}
            placeholder="Tomato, Cheese, Onion..."
            className="w-full px-4 py-3 rounded-xl bg-[#0f0f0f] border border-neutral-800 text-white placeholder-gray-600 focus:border-amber-500/40 focus:outline-none transition"
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 hover:bg-amber-500/20 transition font-medium"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;
