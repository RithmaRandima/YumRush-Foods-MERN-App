import React from "react";
import "./AppDownload.css";
import { mainImgObject } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div
      className="relative h-[90vh] flex items-center justify-center flex-col"
      id="app-download"
    >
      <p className=" tracking-[2px] text-[40px] text-amber-300  text-center w-[60%]">
        The YumRush is a premium taste that yearns to be savored, ground beef
        between your teeth
      </p>

      <p className="text-amber-100 uppercase tracking-[4px] text-[12px] mt-10">
        Delight in every bite
      </p>

      {/* img noodls*/}
      <div className="absolute left-0 -bottom-40">
        <img src={mainImgObject.menu_8} alt="" className="w-[350px] z-3" />
      </div>
    </div>
  );
};

export default AppDownload;
