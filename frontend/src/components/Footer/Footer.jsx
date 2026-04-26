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
    <footer
      className="text-[#d9d9d9] bg-[#0f0f0f] flex flex-col items-center gap-10 p-10 pb-5"
      id="footer"
    >
      {/* content */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16 items-start">
        {/* Column 1 - Brand */}
        <div className="flex flex-col items-start gap-5">
          <div className="relative text-amber-300">
            <h1 className="text-amber-300 tracking-[4px] font-extralight text-[35px]">
              YumRush
            </h1>
            <GiForkKnifeSpoon className="absolute -right-11 -bottom-0 text-[60px]" />
          </div>

          <p className="text-gray-500 text-[14px] leading-relaxed">
            Fast, fresh, and delicious food delivered to your doorstep.
          </p>
        </div>

        {/* Column 2 - Location */}
        <div>
          <h2 className="tracking-[3px] mb-4 text-white">LOCATION</h2>
          <div className="text-gray-500 text-[15px]">
            <p className="mb-1">732/21 Second Street</p>
            <p className="mb-1">Manchester, Kung Street</p>
            <p className="mb-1">Kingston United Kingdom</p>
          </div>
        </div>

        {/* Column 3 - Company */}
        <div>
          <h2 className="tracking-[3px] mb-4 text-white">COMPANY</h2>
          <ul className="text-gray-500 text-[15px] space-y-1 cursor-pointer">
            <li className="hover:text-amber-300 transition">Home</li>
            <li className="hover:text-amber-300 transition">About Us</li>
            <li className="hover:text-amber-300 transition">Delivery</li>
            <li className="hover:text-amber-300 transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Column 4 - Contact */}
        <div>
          <h2 className="tracking-[3px] mb-4 text-white">GET IN TOUCH</h2>

          <ul className="text-gray-500 text-[15px] space-y-1">
            <li>+1-222-345-6786</li>
            <li>contact@gmail.com</li>
          </ul>

          {/* CTA Link */}
          <a
            href="/menu"
            className="inline-block mt-4 uppercase tracking-[2px] text-white font-semibold text-[14px] hover:text-amber-300 transition-colors duration-200"
          >
            Browse Menu
          </a>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex mt-5 gap-6 text-white/50 text-[22px]">
        <FaFacebook className="hover:scale-110 hover:text-amber-300 duration-200 cursor-pointer" />
        <FaInstagram className="hover:scale-110 hover:text-amber-300 duration-200 cursor-pointer" />
        <FaTwitter className="hover:scale-110 hover:text-amber-300 duration-200 cursor-pointer" />
        <FaGooglePlus className="hover:scale-110 hover:text-amber-300 duration-200 cursor-pointer" />
        <FaMap className="hover:scale-110 hover:text-amber-300 duration-200 cursor-pointer" />
      </div>

      {/* Copyright */}
      <p className="font-bold tracking-[3px] text-[10px] my-4 text-center text-gray-500">
        &copy; 2026 YumRush Restaurant. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
