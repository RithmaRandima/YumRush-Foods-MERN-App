import React, { useState, useContext } from "react";
import axios from "axios";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

const LoginPopup = () => {
  const { url, setToken, setAdmin } = useContext(AdminContext);

  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();

    try {
      let newUrl =
        currentState === "Login"
          ? `${url}/api/user/login`
          : `${url}/api/user/register`;

      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("adminToken", response.data.token);
        localStorage.setItem("admin", JSON.stringify(response.data.user));
        setAdmin(response.data.user);

        toast.success(
          currentState === "Login"
            ? "Welcome back!"
            : "Account created successfully",
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Admin Login Page Error", error);
      toast.error("Server error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <form
        onSubmit={onLogin}
        className="relative w-[92%] max-w-md bg-[#121212] border border-neutral-800 rounded-2xl shadow-2xl p-6 text-white"
      >
        {/* title */}
        <h2 className="text-xl font-semibold text-amber-400 mb-1">
          {currentState}
        </h2>
        <p className="text-xs text-gray-500 mb-6">
          Welcome back to your dashboard
        </p>

        {/* inputs */}
        <div className="flex flex-col gap-4">
          {currentState === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={data.name}
              onChange={onChangeHandler}
              className="bg-[#0f0f0f] border border-neutral-800 px-4 py-3 rounded-xl outline-none focus:border-amber-400 text-sm"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={data.email}
            onChange={onChangeHandler}
            className="bg-[#0f0f0f] border border-neutral-800 px-4 py-3 rounded-xl outline-none focus:border-amber-400 text-sm"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandler}
            className="bg-[#0f0f0f] border border-neutral-800 px-4 py-3 rounded-xl outline-none focus:border-amber-400 text-sm"
            required
          />
        </div>

        {/* submit */}
        <button
          type="submit"
          className="w-full mt-6 py-3 rounded-xl bg-amber-400 text-black font-semibold hover:bg-amber-500 transition"
        >
          {currentState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {/* switch */}
        <p className="text-center text-xs text-gray-500 mt-5">
          {currentState === "Login" ? (
            <>
              New here?{" "}
              <span
                onClick={() => setCurrentState("Sign Up")}
                className="text-amber-400 cursor-pointer hover:underline"
              >
                Create account
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setCurrentState("Login")}
                className="text-amber-400 cursor-pointer hover:underline"
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default LoginPopup;
