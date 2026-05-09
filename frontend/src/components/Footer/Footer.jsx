import React from "react";
import { GiForkKnifeSpoon } from "react-icons/gi";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="
        bg-[#0f0f0f]
        text-[#cfcfcf]
        border-t border-[#1f1f1f]
        pt-12 pb-6 px-6
        flex flex-col items-center
        gap-10
      "
    >
      {/* TOP GRID */}
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* BRAND */}
        <div className="flex flex-col gap-4">
          <div className="relative text-amber-300 w-fit">
            <h1 className="text-3xl font-extralight tracking-[4px]">YumRush</h1>
            <GiForkKnifeSpoon className="absolute -right-8 -bottom-1 text-4xl" />
          </div>

          <p className="text-gray-500 text-sm leading-relaxed">
            Fresh food delivered fast. Simple ordering, better experience, real
            taste.
          </p>
        </div>

        {/* LOCATION */}
        <div>
          <h2 className="text-white text-sm tracking-[3px] mb-4">LOCATION</h2>

          <div className="space-y-2 text-gray-500 text-sm">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-amber-300 text-xs" />
              732 Second Street
            </p>
            <p>Manchester, UK</p>
            <p>Kingston Area</p>
          </div>
        </div>

        {/* COMPANY */}
        <div>
          <h2 className="text-white text-sm tracking-[3px] mb-4">COMPANY</h2>

          <ul className="space-y-2 text-gray-500 text-sm">
            {["Home", "Menu", "About", "Privacy"].map((item) => (
              <li
                key={item}
                className="hover:text-amber-300 transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-white text-sm tracking-[3px] mb-4">CONTACT</h2>

          <div className="space-y-2 text-gray-500 text-sm">
            <p className="flex items-center gap-2">
              <FaPhone className="text-amber-300 text-xs" />
              +1 222 345 6786
            </p>

            <p className="flex items-center gap-2">
              <FaEnvelope className="text-amber-300 text-xs" />
              contact@yumrush.com
            </p>
          </div>

          <a
            href="/menu"
            className="
              inline-block mt-4
              text-amber-300 text-sm
              hover:text-white
              transition
            "
          >
            Browse Menu →
          </a>
        </div>
      </div>

      {/* SOCIAL */}
      <div className="flex items-center gap-6 text-gray-500 text-lg">
        <FaFacebook className="hover:text-amber-300 transition cursor-pointer" />
        <FaInstagram className="hover:text-amber-300 transition cursor-pointer" />
        <FaTwitter className="hover:text-amber-300 transition cursor-pointer" />
      </div>

      {/* COPYRIGHT */}
      <p className="text-gray-600 text-xs tracking-[2px] text-center">
        © 2026 YumRush. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
