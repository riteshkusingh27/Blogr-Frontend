import React from "react";
import { assets, dashboard_data } from "../../assets/assets";
import { useEffect, useState } from "react";
import TablePage from "../../Components/admin/TablePage";
import { useAppContext } from "../../Context/AppContext.jsx";
import {toast} from "react-hot-toast";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: [],
  });

  const {axios} = useAppContext();

  const fetchDashboardData = async () => {
    try {
      const {data} = await axios.get('/api/admin/dashboard');
      data.success? setDashboardData(data.dashboardData) :toast.error(data.message)
      
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="flex-1 p-4 md:p-10 bg-blue-50/50 w-full ">
      <div className="flex flex-wrap gap-5 ">
        {/* diplay dashboard div  */}
        <div className="flex items-center  gap-4 bg-white p-4 rounded min-w-58 hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_1} alt="" />
          <div>
            <p className="text-xl  font-semilbold text-gray-600">
              {dashboardData.blogs}
            </p>
            <p className="text-gray-400 font-light">Blogs</p>
          </div>
        </div>
        <div className="flex items-center  gap-4 bg-white p-4 rounded min-w-58 hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_2} alt="" />
          <div>
            <p className="text-xl  font-semilbold text-gray-600">
              {dashboardData.comments}
            </p>
            <p className="text-gray-400 font-light">Comments</p>
          </div>
        </div>
        <div className="flex items-center  gap-4 bg-white p-4 rounded min-w-58 hover:scale-105 transition-all">
          <img src={assets.dashboard_icon_3} alt="" />
          <div>
            <p className="text-xl  font-semilbold text-gray-600">
              {dashboardData.drafts}
            </p>
            <p className="text-gray-400 font-light">Drafts</p>
          </div>
        </div>
      </div>

      {/* dahboard analytics div  */}

      <div className="">
        <div className="flex items-center gap-3 m-4 mt-6 text-gray-600 ">
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>

        {/* TABLE CONTENT */}
        <div className="relative max-w-3xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white">
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
                 { dashboardData.recentBlogs.map((blog,index)=>{
                    return <TablePage key={blog._id} blog={blog} fetchBlogs={fetchDashboardData}  index={index+1} />
                  })}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
