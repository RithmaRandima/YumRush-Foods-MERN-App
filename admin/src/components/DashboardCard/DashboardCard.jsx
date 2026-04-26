import { TiMinus, TiPlus } from "react-icons/ti";
import ShopContext from "../../context/Shop-context";
import { FaStar } from "react-icons/fa";

const DashboardCard = ({ item }) => {
  return (
    <div
      className="bg-white relative p-2  flex items-start justify-center hover:border-b border-slate-300/40 w-full mx-auto
      
    "
    >
      {/* img section */}
      <div className="w-15 h-15 border border-slate-200 flex items-center justify-center rounded-[10px]">
        <img
          src={`http://localhost:5001/images/${item.image}`}
          alt={name}
          className="w-13 h-13 object-contain "
        />
      </div>

      {/* description and info */}
      <div className=" ml-3 relative">
        <div className="flex-2 ">
          <p className="text-[15px] font-semibold tracking-[0.4px]">
            {item.name}
          </p>
          <div className="flex gap-[3px] text-[10px] mt-0.5 text-amber-500">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
          </div>
        </div>
      </div>

      {/* discount */}
      {item.discount > 0 && (
        <div className="absolute top-4 right-6 font-bold bg-red-400 text-white text-[11px] py-[1px] px-2 rounded-full animate-pulse">
          -{item.discount}%
        </div>
      )}

      {/* price section */}
      <div className=" flex-1 text-center mt-3">
        <p className="font-bold text-black text-[20px]">
          ${item.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default DashboardCard;
