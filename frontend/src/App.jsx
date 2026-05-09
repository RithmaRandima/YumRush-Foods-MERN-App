import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import FoodDetail from "./pages/FoodDetail/FoodDetail";
import Products from "./pages/Products/Products";
import { useContext } from "react";
import { StoreContext } from "./context/StoreContext";
import Verify from "./pages/Verify/Verify";
import MyOrders from "./pages/MyOrders/MyOrders";
import SplashScreen from "./pages/SplashScreen/SplashScreen";

const App = () => {
  const { showLogin, loading } = useContext(StoreContext);

  return (
    <>
      {/* SPLASH SCREEN */}
      {loading && <SplashScreen loading={loading} />}

      {/* APP CONTENT */}
      {!loading && (
        <div className="app">
          {showLogin && <LoginPopup />}

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/menu" element={<Products />} />
            <Route path="/order" element={<PlaceOrder />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/food/:id" element={<FoodDetail />} />
          </Routes>

          <Footer />
        </div>
      )}
    </>
  );
};

export default App;
