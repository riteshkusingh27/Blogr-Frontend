import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../Context/AppContext.jsx";
import { toast } from "react-hot-toast";

const TablePage = ({ blog, fetchBlogs, index }) => {
  
  const { title, createdAt } = blog;
  const BlogDate = new Date(createdAt);

  const { axios } = useAppContext();
  const deleteBlog = async () => {
    
    const confirm = window.confirm(
      "Are you sure you want to delete this blog?"
    );
   

    if (!confirm) return;
    try {
      const { data } = await axios.post("/api/blog/delete", { id: blog._id });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // publish and unpublish
  const togglePublish = async () => {
    try {
      const { data } = await axios.post("/api/blog/toggle-publish", {
        id: blog._id,
      });
      if (data.success) {
        toast.success(data.message);
        await fetchBlogs();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <tr className="border-y border-gray-600">
      <th className="px-2 py-2">{index}</th>
      <td className="px-2 py-3">{title}</td>
      <td className="px-2 py-3 max-sm:hidden">{BlogDate.toDateString()}</td>
      <td className="px-2 py-3 max-sm:hidden">
        <p
          className={`${
            blog.isPublished ? "text-green-500 font-bold" : "text-orange-500"
          }`}
        >
          {blog.isPublished ? "Published " : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-sm gap-4">
        <button
          onClick={togglePublish}
          className={`${
            blog.isPublished
              ? "bg-red-500 hover:bg-red-600"
              : "bg-green-500 hover:bg-green-600"
          } text-white px-4 py-1 rounded-md transition-all`}
        >
          {blog.isPublished ? "Unpublish" : "Publish"}
        </button>
        <img
          src={assets.cross_icon}
          className="w-8 hover:scale-110 transition-all cursor-pointer"
          alt=""
          onClick={deleteBlog}
        />
      </td>
    </tr>
  );
};

export default TablePage;
