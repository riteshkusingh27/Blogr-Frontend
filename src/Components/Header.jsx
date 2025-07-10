import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../Context/AppContext.jsx";
import { useRef } from "react";
const Header = () => {
  const inputRef = useRef(null);
 
  const { setInput, input } = useAppContext();
   const onSubmitHandler =  async (e) => {
       e.preventDefault()
       setInput(inputRef.current.value);
  }
  const clearSearch =()=>{
    setInput("");
    inputRef.current.value = "";
  }
  return (
    <div className="mx-8 sm:mx-16 xl:mx-24 relative">
      <div className="text-center mt-10 mb-8">
        <div className="inline-flex items-center justify-center gap-4 px-6 py-1.5  border border-primary/40 bg-primary/10 rounded-full text-sm text-blac</div>k">
          <p>New AI feature integrated</p>
          <img src={assets.star_icon} alt="" className="w-2.5" />
        </div>
        <h1 className="text-3xl sm:text-6xl font-bold sm:leading-16 ">
          Ai blogging platform.
        </h1>

        <p className="text-base sm:text-lg text-gray-600 mt-4 mb-8">
          Create, share, and monetize your AI-generated blogs with ease. <br />
          Join our community of AI enthusiasts and start your blogging journey
          today!
        </p>
        <form  onSubmit={onSubmitHandler}
        className="flex items-center justify-center gap-2 sm:gap-4 bg-white border border-gray-300 rounded-2xl px-4 py-2 sm:px-6 sm:py-3 shadow-md hover:shadow-lg transition-all duration-300 max-w-md mx-auto">
          <input
          ref = {inputRef}
            type="text"
            placeholder="Search for Blogs"
            required
            className="w-full pl-4 outline-none"
          />
          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 m-1.5 rounded hover:scale-105 transition-all cursor-pointer "
          >
            
            Search
          </button>
        </form>
      </div>
      <div className="text-center">
        {
          input && <button  onClick={clearSearch}
          className="border font-light text-xd py-1 pc-3 rounded-sm shadow-custom-sm cursor-pointer">Clear Search</button>
        }
      </div>
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1 opacity-80"
      />
      <img
        src={assets.third}
        alt=""
        className="absolute -top-50 -z-1 opacity-30"
      />
    </div>
  );
};

export default Header;
