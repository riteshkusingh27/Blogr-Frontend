import Moment from "moment";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { blog_data } from "../assets/assets";
import Navbar from "../Components/Navbar.jsx";
import { assets, comments_data } from "../assets/assets.js";
import Footer from "../Components/Footer.jsx";
import Loader from "../Components/Loader.jsx";
import { useAppContext } from "../Context/AppContext.jsx";
import { toast } from "react-hot-toast";

const Blog = () => {
  // get id from the url

  const { axios } = useAppContext();
  // useParams is used to get the id from the url
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comment, setComment] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  console.log(id);

  const clearForm = () => {
    setName("");
    setContent("");
  };

  // single blog data
  const fetchblog = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);

      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const fetchComment = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", { blogId: id });
      if (data.success) {
        setComment(data.comment);
      } else {
        toast.error(data.message);
      }
    } catch (error) {}
  };
  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });
      if (data.success) {
        toast.success(data.message);
        setName("");
        setContent("");
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  // useEffect to fetch b
  useEffect(() => {
    fetchblog();
    fetchComment();
  }, []);

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-1"
      />
      <Navbar />
      {/* // title */}
      <div className="mb-6 text-center ">
        <p className="text-sm text-gray-500 mb-2">
          Published on {Moment(data.createdAt).format("MMMM Do YYYY")}
        </p>
        <h1 className="text-4xl font-bold text-black  mb-2">{data.title}</h1>
        <h2 className="text-xl font-medium text-gray-700">{data.subTitle}</h2>
      </div>

      {/* //thumbnail image and description */}
      <div className="mx-5 max-w-5xl md:mx-auto mt-6">
        <div className="flex justify-center  h-96 w-auto ">
          <img
            src={data.image}
            alt=""
            className="rounded-2xl justify-center w-2xl "
          />
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: data.description }}
          className="mt-6 text-gray-700 text-lg leading-relaxed rich-text"
        ></div>
        {/* comment secction  */}
        <div className="mt-10 mb-10 max-w-4xl ">
          <p className="font-extrabold mb-4">Comments ({comment.length})</p>
          <div className="flex flex-col gap-5">
            {comment.map((item, index) => (
              <div key={index} className="relative bg-gray-100 rounded p-4">
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="" className="w-6" />
                  <p className="font-medium">{item.name}</p>
                </div>
                <p className="text-sm max-w-md">{item.content}</p>
                <div className="absolute right-4 bottom-5 flex items-center gap-3 text-xs">
                  {Moment(item.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* comment form */}
        <div>
          <p className="font-bold">Add Your Comment</p>
          <form
            onSubmit={addComment}
            className="flex flex-col gap-4 mt-4 mb-10"
          >
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              placeholder="Name"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
            />
            <textarea
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Comment"
              required
              className="w-full p-2 border border-gray-300 rounded outline-none"
            ></textarea>
            <button
              type="submit"
              className="bg-amber-300 hover:scale-102 transition-all cursor-pointer "
            >
              Submit
            </button>
          </form>
        </div>
        {/* social media links */}
        <div className="my-24 ">
          <p className="font-extrabold">
            Share this blog on:
            <div className="flex">
              <img src={assets.facebook_icon} width={50} alt="" />
              <img src={assets.twitter_icon} width={50} alt="" />
              <img src={assets.googleplus_icon} width={50} alt="" />
            </div>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div>
      <Loader />
    </div>
  );
};

export default Blog;
