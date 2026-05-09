import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState({});
  const [menu, setMenu] = useState("home");
  const [loading, setLoading] = useState(true);
  // add to cart function
  const addToCart = async (itemID) => {
    const previousCart = { ...cartItems };

    if (!cartItems[itemID]) {
      setCartItems((prev) => ({ ...prev, [itemID]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemID]: prev[itemID] + 1 }));
    }

    if (token) {
      try {
        await axios.post(
          `${url}/api/cart/add`,
          { itemId: itemID },
          { headers: { token } },
        );
      } catch (error) {
        // rollback UI if API fails
        setCartItems(previousCart);
        console.log("Add to cart failed", error);
      }
    }
  };

  // remove to cart function

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };

      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }

      return updated;
    });

    if (token) {
      await axios.post(
        `${url}/api/cart/remove`,
        { itemId }, // ✅ correct field
        { headers: { token } },
      );
    }
  };

  // cart total
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);

        totalAmount += itemInfo?.price * cartItems[item];
      }
    }

    return totalAmount;
  };

  // delivery fee
  const getDeliveryFee = (cartAmount) => {
    const fixRate = 3;
    let deliveryCharge = fixRate + cartAmount * 0.05;

    return deliveryCharge;
  };
  // get Discount
  const getDiscount = (cartAmount) => {
    let discountPrice = cartAmount * 0.05;
    return discountPrice;
  };

  // fetchFoodList
  const fetchFoodList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    setFoodList(response.data.data);
    // setLoading(false);
  };

  const loadCartData = async (token) => {
    const res = await axios.post(
      `${url}/api/cart/get`,
      {},
      { headers: { token } },
    );
    setCartItems(res.data.cartData);
  };

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    async function loadData() {
      setLoading(true);

      await fetchFoodList();

      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      // 🔥 IMPORTANT: force minimum splash time
      await sleep(1500);

      setLoading(false);
    }

    loadData();
  }, []);

  // context values
  const contextValue = {
    food_list,
    cartItems,
    url,
    token,
    loading,
    showLogin,
    user,
    menu,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getDeliveryFee,
    setLoading,
    setToken,
    getDiscount,
    setShowLogin,
    setUser,
    setMenu,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
