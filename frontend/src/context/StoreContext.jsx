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

        totalAmount += itemInfo.price * cartItems[item];
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
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }

    loadData();
  }, []);

  // context values
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getDeliveryFee,
    url,
    token,
    setToken,
    getDiscount,
    showLogin,
    setShowLogin,
    user,
    setUser,
  };

  console.log(user);
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
