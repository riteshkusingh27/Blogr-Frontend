import React from "react";
import { blogCategories, blog_data } from "../assets/assets";
import { useState } from "react";
import { motion } from "motion/react";
import Card from "./Card";
import { useAppContext } from "../Context/AppContext.jsx";

const Genre = () => {
  const [menu, setMenu] = useState("All");
  const { blog, input } = useAppContext();

  const searchBlog = () => {
    if (input == "") {
      return blog;
    } else {
      return blog.filter(
        (blog) =>
          blog.title.toLowerCase().includes(input.toLowerCase()) ||
          blog.category.toLowerCase().includes(input.toLowerCase())
      );
    }
  };
  return (
    <div>
      <div className="flex justify-center gap-4 sm;gap-8 my-10 relative">
        {blogCategories.map((item) => (
          <div key={item} className="flex items-center justify-center relative">
            <button
              onClick={() => setMenu(item)}
              className={`cursor-pointer text-gray-500 ${
                menu == item &&
                "text-white px-4 pt-0.5 bg-amber-800 rounded-full"
              }`}
            >
              {item}
              {menu == item && (
                <motion.div
                  layoutId="underline"
                  transition={{ type: "spring", damping: 300 }}
                  className="absolute -bottom-1 left-0 w-full h-1"
                ></motion.div>
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-15 mx-8 sm:mx-16 ">
        {searchBlog()
          .filter((blog) => (menu == "All" ? blog.isPublished == true : blog.category == menu && blog.isPublished == true))
          .map((blog) => (
            <Card key={blog._id} blog={blog} />
          ))}
      </div>
    </div>
  );
};

export default Genre;
