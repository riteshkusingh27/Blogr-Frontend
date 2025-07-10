import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext.jsx";
const Navbar = () => {
  // const navigate = useNavigate();
  
  const {token , navigate}  = useAppContext();

  return (
    <div className="flex justify-between items-center py-5 mx-8 sm:mx-20 cursor-pointer">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="w-32 sm:w-44"
      />
      <button
        onClick={() => navigate("/admin")}
        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-3xl hover:bg-[#3f3bbd] transition-all duration-300"
      >
        
        {token? 'Dashboard' : 'Login'}
        <img src={assets.arrow} alt="logo" className="w-3" />
      </button>
    </div>
  );
};

export default Navbar;
