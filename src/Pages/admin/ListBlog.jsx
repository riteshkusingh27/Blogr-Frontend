import React from "react";
import { useState } from "react";
import { assets, blog_data } from "../../assets/assets";
import { useEffect } from "react";
import TablePage from "../../Components/admin/TablePage";
import { useAppContext } from "../../Context/AppContext.jsx";
import { toast } from "react-hot-toast";

const ListBlog = () => {
  const { axios } = useAppContext();

  //   state to stoere the blog data
  const [blogs, setBlogs] = useState([]);
  
  const fetchBlogs = async () => {
    console.log("fetching blogs");
    try {
      const { data } = await axios.get("/api/blog/all");
      if (data.success) {
        setBlogs(data.blogs);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex w-full h-screen">
      <div className="flex-col  pt-5 px-5  sm:pt-12 sm:pl-16 bg-blue-50/50 w-full h-screen ">
        <h1 className="pb-4">All blogs</h1>

        <div className="relative h-4/5 max-w-3xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
          <table className="w-full text-sm text-gray-500">
            <thead className="text-xs texxt-gray-600 text-left uppercase">
              <tr>
                <th scope="col" className="px-2 py-2 xl:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-2">
                  Blog Title
                </th>
                <th scope="col" className="px-2 py-2 max-sm:hidden">
                  Date
                </th>
                <th scope="col" className="px-2 py-2 max-sm:hidden">
                  Status
                </th>
                <th scope="col" className="px-2 py-2">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog, index) => {
                return (
                  <TablePage
                    key={blog._id}
                    blog={blog}
                    fetchBlogs={fetchBlogs}
                    index={index + 1}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListBlog;
