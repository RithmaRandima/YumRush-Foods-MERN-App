import React, { useState, useContext } from "react";
import { IoClose } from "react-icons/io5";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = () => {
  const { url, setToken, setUser, setShowLogin } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState("Login");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandeler = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      let endpoint =
        currentState === "Login"
          ? `${url}/api/user/login`
          : `${url}/api/user/register`;

      const response = await axios.post(endpoint, data);

      if (response.data.success) {
        setToken(response.data.token);
        setUser(response.data.user);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setShowLogin(false);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md">
      <form
        onSubmit={onLogin}
        className="w-[90%] sm:w-[400px] bg-[#121212] border border-neutral-800 rounded-2xl text-white p-6 flex flex-col gap-5"
      >
        {/* HEADER */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-amber-400">
              {currentState}
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Welcome back to YumRush
            </p>
          </div>

          <IoClose
            className="text-2xl cursor-pointer hover:scale-110 transition"
            onClick={() => setShowLogin(false)}
          />
        </div>

        {/* NAME (SIGN UP ONLY) */}
        {currentState === "Sign Up" && (
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={data.name}
            onChange={onChangeHandeler}
            className="p-3 rounded-xl bg-[#1a1a1a] border border-neutral-800 outline-none text-sm"
            required
          />
        )}

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={data.email}
          onChange={onChangeHandeler}
          className="p-3 rounded-xl bg-[#1a1a1a] border border-neutral-800 outline-none text-sm"
          required
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={onChangeHandeler}
          className="p-3 rounded-xl bg-[#1a1a1a] border border-neutral-800 outline-none text-sm"
          required
        />

        {/* TERMS */}
        <div className="flex items-start gap-2 text-xs text-gray-500">
          <input type="checkbox" required className="mt-1" />
          <p>By continuing, you agree to our terms & privacy policy.</p>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="p-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-black font-bold text-sm transition disabled:opacity-50"
        >
          {loading
            ? "Please wait..."
            : currentState === "Login"
              ? "Login"
              : "Create account"}
        </button>

        {/* SWITCH */}
        <p className="text-center text-sm text-gray-400">
          {currentState === "Login" ? (
            <>
              New here?{" "}
              <span
                className="text-amber-400 cursor-pointer"
                onClick={() => setCurrentState("Sign Up")}
              >
                Create account
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                className="text-amber-400 cursor-pointer"
                onClick={() => setCurrentState("Login")}
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
