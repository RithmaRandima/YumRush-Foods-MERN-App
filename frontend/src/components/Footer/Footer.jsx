import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div
      className="text-[#d9d9d9] bg-black flex flex-col items-center gap-5 p-20 pb-5 mt-20"
      id="footer"
    >
      {/* content */}
      <div className="w-full grid grid-cols-3 gap-20">
        {/*Footer Left Content */}
        <div className="flex flex-col items-start gap-5">
          <h1>logo</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae
            amet, quaerat culpa quam earum reiciendis consequuntur ex dolore
            omnis doloremque illum explicabo hic, ad, ipsa labore fugiat ratione
            magnam minima?
          </p>
          {/* icons */}
          <div className="flex gap-3">
            <h1>Facebook</h1>
            <h1>Facebook</h1>
            <h1>Facebook</h1>
            <h1>Facebook</h1>
          </div>
        </div>

        {/*Footer center Content */}
        <div className="center">
          <h2 className="font-semibold">COMPANY</h2>
          <ul className="list-none">
            <li className="mb-2">Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/*Footer Right Content */}
        <div className="right">
          <h2>GET IN TOUCH</h2>
          <ul className="list-none">
            <li>+1-222-345-6786</li>
            <li>contact@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-[2px] my-5" />
      {/* copy right */}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit nisi
        distinctio numquam asperiores ex veritatis molestias ut.
      </p>
    </div>
  );
};

export default Footer;
