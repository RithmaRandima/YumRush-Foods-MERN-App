import React, { useState } from "react";
import "./LoginPopup.css";
import { IoClose } from "react-icons/io5";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

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
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 w-full h-screen  bg-black/50 flex justify-center items-center">
      <form
        onSubmit={onLogin}
        className="w-[30%] max-w-lg bg-white rounded-lg flex flex-col gap-5 py-6 px-8 text-[14px] text-[#808080]"
      >
        <div className="flex justify-between items-center text-black">
          <h2>{currentState}</h2>
          <IoClose onClick={() => setShowLogin(false)} />
        </div>
        {/* input fields */}
        <div className="flex flex-col gap-5">
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
            type="emai"
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
            placeholder="ENter Password"
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
          className="p-2.5 rounded-xl text-white bg-red-200 text-[15px]cursor-pointer "
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
          <p>
            Create new account?{" "}
            <span
              className="text-red-200 font-semibold cursor-pointer"
              onClick={() => setCurrentState("Sign Up")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className="text-red-200 font-semibold cursor-pointer"
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
