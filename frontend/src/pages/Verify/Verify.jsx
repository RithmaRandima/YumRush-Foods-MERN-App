import React, { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const Verify = () => {
  const [searchParams, setSerachParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const navigate = useNavigate();
  const { url } = useContext(StoreContext);

  const verifyPayment = async () => {
    try {
      const res = await axios.post(`${url}/api/order/verify`, {
        success,
        orderId,
      });

      if (res.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log("error on verifying payment", error);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  console.log(success, orderId);
  return (
    <div className="min-h-[60vh] grid">
      {/* spinner */}
      <div className="w-[50px] h-[50px] self-center border-3 border-neutral-800 border-t-amber-300 rounded-full mx-auto animate-spin"></div>
    </div>
  );
};

export default Verify;
