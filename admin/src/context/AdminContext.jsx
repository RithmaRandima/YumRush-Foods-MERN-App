import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AdminContext = createContext(null);

const AdminContextProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [token, setToken] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [open, setOpen] = useState(false);

  const url = "http://localhost:4000";

  // fetch dashboard data
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${url}/api/admin/dashboard`);
      if (res.data.success) {
        setDashboard(res.data.data);
      }
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  // fetch all orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`);
      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.error("Orders error:", err);
    }
  };

  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
  };

  // logout
  const logOut = () => {
    setAdmin(null);
    setToken(null);

    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
  };

  useEffect(() => {
    fetchFoodList();
    const adminToken = localStorage.getItem("adminToken");
    const adminDetails = localStorage.getItem("admin");

    if (adminToken) {
      setToken(adminToken);
    }

    if (adminDetails) {
      setAdmin(JSON.parse(adminDetails));
    }
    fetchDashboard();
    fetchOrders();
  }, []);

  const contextValue = {
    url,
    token,
    admin,
    dashboard,
    orders,
    loading,
    foodList,
    open,
    setOpen,
    fetchDashboard,
    fetchOrders,
    setToken,
    setAdmin,
    logOut,
  };

  return (
    <AdminContext.Provider value={contextValue}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
