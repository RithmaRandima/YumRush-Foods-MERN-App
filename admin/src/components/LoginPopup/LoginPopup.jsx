import React, { useState } from "react";
import { useContext } from "react";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";

const LoginPopup = () => {
  const { url, setToken, setAdmin } = useContext(AdminContext);

  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandeler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;

    if (currentState === "Login") {
      newUrl += `/api/user/login`;
    } else {
      newUrl += `/api/user/register`;
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("adminToken", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data.user));
      setAdmin(JSON.parse(localStorage.getItem("admin")));
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-screen  bg-black/50 backdrop-blur-[4px] flex justify-center items-center">
      <form
        onSubmit={onLogin}
        className="w-[30%] max-w-lg bg-white rounded-lg flex flex-col gap-5 py-6 px-5 text-[14px] text-[#808080] pb-10"
      >
        <div className="flex justify-between items-center text-black font-extrabold text-[20px]">
          <h2>{currentState}</h2>
        </div>
        {/* input fields */}
        <div className="flex flex-col gap-5 mt-3">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              placeholder="your name"
              className="outline-none border border-[#c9c9c9]
            p-2.5 rounded-xl"
              name="name"
              onChange={onChangeHandeler}
              value={data.name}
              required
            />
          )}
          <input
            type="email"
            placeholder="your email"
            className="outline-none border border-[#c9c9c9]
            p-2.5 rounded-xl"
            name="email"
            onChange={onChangeHandeler}
            value={data.email}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="outline-none border border-[#c9c9c9]
            p-2.5 rounded-xl"
            name="password"
            onChange={onChangeHandeler}
            value={data.password}
            required
          />
        </div>
        <button
          type="submit"
          className="p-2.5 rounded-xl text-white bg-amber-400 hover:bg-amber-500 font-bold text-[15px] cursor-pointer "
        >
          {currentState === "Sign Up" ? "Create account" : "Login"}
        </button>
        {/* popup condition */}
        <div className="flex items-start gap-2 -mt-2">
          <input type="checkbox" className="mt-1" required />
          <p>by continuing, I agree to the terms of use & provacy policy</p>
        </div>
        {/* change between Login and Sign up */}
        {currentState === "Login" ? (
          <p className="text-center">
            Create new account?{" "}
            <span
              className="text-amber-400 font-semibold cursor-pointer"
              onClick={() => setCurrentState("Sign Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p className="text-center">
            Already have an account?{" "}
            <span
              className="text-amber-400 font-semibold cursor-pointer"
              onClick={() => setCurrentState("Login")}
            >
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
