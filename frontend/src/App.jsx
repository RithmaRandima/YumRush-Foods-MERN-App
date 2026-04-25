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

const App = () => {
  const { showLogin } = useContext(StoreContext);
  return (
    <>
      {showLogin && <LoginPopup />}
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/menu" element={<Products />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route path="/food/:id" element={<FoodDetail />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
