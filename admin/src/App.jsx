import React, { useContext, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add/Add";
import List from "./pages/List/List";
import Orders from "./pages/Orders/Orders";
import { ToastContainer } from "react-toastify";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AdminContext } from "./context/AdminContext";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import SplashScreen from "./components/SplashScreen/SplashScreen";

const App = () => {
  const { token } = useContext(AdminContext);
  const url = "http://localhost:4000";

  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen relative bg-black">
      <ToastContainer autoClose={1000} />

      {/* SPLASH */}
      {loading && <SplashScreen onFinish={() => setLoading(false)} />}

      {/* MAIN APP */}
      {!loading && (
        <>
          <Navbar />
          <hr />

          <div className="app-content flex items-start mt-2 lg:pr-5 gap-5">
            <Sidebar />

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add" element={<Add url={url} />} />
              <Route path="/list" element={<List url={url} />} />
              <Route path="/orders" element={<Orders url={url} />} />
            </Routes>
          </div>

          {/* LOGIN OVERLAY */}
          {!token && <LoginPopup />}
        </>
      )}
    </div>
  );
};

export default App;
