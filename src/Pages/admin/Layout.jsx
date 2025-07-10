import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../Context/AppContext.jsx";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/admin/Sidebar";

const Layout = () => {

  const {axios, navigate, setToken} = useAppContext();
  const logout = () => {
    localStorage.removeItem("token");
    axios.defaults.headers.common['Authorization'] = null;
    setToken(null);
    navigate("/");
  };

  return (
    <>

                                     {/* admin header functionality */}
      <div className="mt-3  flex justify-between items-center py-2 px-4 sm:px-12 border-b border-gray-200 ">
        <img
          src={assets.logo}
          alt=""
          className="w-32 sm:w-40"
          onClick={() => navigate("/")}
        />
        <button
          onClick={logout}
          className="text-sm px-4  py-2 bg-primary text-white rounded-full cursor-pointer"
        >
          {" "}
          Logout{" "}
        </button>
      </div>


 
                                     {/* sidebar under the admin heder  */}

      <div className="flex h-[calc(100vh-70px)]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
