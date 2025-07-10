import React from "react";
import { assets, footer_data } from "../assets/assets";

const Footer = () => {
  return (
    <div className="px-6 md:px-16 bg-primary/3 text-center">
      <div
        className="flex flex-col md:flex-row items-start justify-between gap-10
        py-10 md:py-16 mx-auto max-w-screen-xl"
      >
        <div>
          <img src={assets.logo} alt="" className="w-50"/>
          <p className="max-w-[300px] mt-6 text-justify">
             Perfect for quick inspiration or consistent content creation — effortless, smart, and personalized blogging starts here.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 md:gap-8 text-left">
          {footer_data.map((section, index) => (
            <div>
              <h1 className="text-lg font-semibold mb-2">{section.title}</h1>
              <ul className="text-sm space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li
                    key={linkIndex}
                    className="text-gray-600 hover:text-primary transition-colors duration-200 cursor-pointer"
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <p className="my-7">Copyright 2025 - All right resereved </p>
    </div>
  );
};

export default Footer;
