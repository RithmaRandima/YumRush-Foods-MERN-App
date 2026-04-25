import React from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";
import {
  FaFacebook,
  FaGooglePlus,
  FaInstagram,
  FaMap,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div
      className="text-[#d9d9d9] bg-[#0f0f0f] flex flex-col items-center gap-5 p-20 pb-5"
      id="footer"
    >
      {/* content */}
      <div className="w-full grid grid-cols-4 gap-20 items-start">
        {/*Footer col 1 Content */}
        <div className="flex flex-col items-start gap-5">
          <div className="relative text-amber-300">
            <h1 className="text-amber-300 tracking-[4px] font-extralight text-[35px]">
              YumRush
            </h1>
            <GiForkKnifeSpoon className="absolute -right-11 -bottom-0 text-[60px]" />
          </div>
        </div>

        {/*Footer col 2 Content */}
        <div className="center">
          <h2 className="tracking-[3px] mb-4">LOCATION</h2>
          <div className="text-gray-500 text-[15px]">
            <p className="mb-1">732/21 Second Street</p>
            <p className="mb-1">Manchester, Kung Street</p>
            <p className="mb-1">Kingston United Kingdom</p>
          </div>
        </div>

        {/*Footer col 3 Content */}
        <div className="center">
          <h2 className="tracking-[3px] mb-4">COMPANY</h2>
          <ul className="list-none cursor-pointer text-gray-500 text-[15px]">
            <li className="mb-1">Home</li>
            <li className="mb-1">About Us</li>
            <li className="mb-1">Delivery</li>
            <li className="mb-1">Privacy Policy</li>
          </ul>
        </div>

        {/*Footer col 4 Content */}
        <div className="right">
          <h2 className="tracking-[3px] mb-4">GET IN TOUCH</h2>
          <ul className="list-none">
            <div className="text-gray-500 text-[15px]">
              <p className="mb-1">+1-222-345-6786</p>
              <p className="mb-1">contact@gmail.com</p>
              <p className="uppercase tracking-[2px] my-5 text-white cursor-pointer font-bold">
                Make Reservation
              </p>
            </div>
          </ul>
        </div>
      </div>
      {/* copy right */}
      {/* icons */}
      <div className="flex mt-7 gap-7 text-white/50 text-[22px]">
        <FaFacebook className="hover:scale-110 hover:text-amber-300 duration-200" />
        <FaInstagram className="hover:scale-110 hover:text-amber-300 duration-200" />
        <FaTwitter className="hover:scale-110 hover:text-amber-300 duration-200" />
        <FaGooglePlus className="hover:scale-110 hover:text-amber-300 duration-200" />
        <FaMap className="hover:scale-110 hover:text-amber-300 duration-200" />
      </div>
      <p className="font-bold tracking-[3px] text-[10px] my-4">
        &copy; 2026 YumRush Restaurant. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
