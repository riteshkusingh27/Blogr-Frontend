import React from "react";
import { assets, blogCategories } from "../../assets/assets";
import { useState } from "react";
import { useEffect, useRef } from "react";
import { useAppContext } from "../../Context/AppContext.jsx";
import { toast } from "react-hot-toast";
import Quill from "quill";
import {parse} from 'marked'
const AddBlog = () => {

  const { axios } = useAppContext();
  // state to manage the adding state if the blog is being added to the db state should be isAdding true
  // if the blog is added successfully then the state should be falsea
  const  [isAdding, setIsAdding] = useState(false);
const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const quillRef = useRef(null);

  const [image, setImage] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [category, setCategory] = useState("Startup");
  const [isPublished, setIsPublished] = useState(false);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      setIsAdding(true);
      const blog ={
        title,
        subTitle,
        description : quillRef.current.root.innerHTML,
        category , isPublished

      }
      const formData = new FormData()
  formData.append("image", image);
  formData.append("blog", JSON.stringify(blog));

  const {data} = await axios.post("/api/blog/add-blog", formData)
  if(data.success){
    toast.success(data.message);
    setImage(false)
    setTitle("");
    setCategory("Startup")
    setSubTitle("");
    quillRef.current.root.innerHTML = ''
  }
  else{
    toast.error(data.message)
  }
    } catch (error) {
      toast.error(error.message)
    }
    finally{
      setIsAdding(false)
    }
  };

  const generateContent = async () => {
    if(!title) 
      return toast.error("Please enter a title for the blog");
    try {
        setLoading(true);
        const {data} =await axios.post("/api/blog/generate", {prompt : title})
        console.log("hi")
        if (data.success) {
          quillRef.current.root.innerHTML = parse(data.content);
        }
        else{
          toast.error(data.message)
        }
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow" });
    }
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll"
    >
      <div className="bg-white w-full max-w-3xl p-4 md:p-10 sm:p-10  shadow rounded  ">
        <p>Upload Thumb              nail</p>

        <label htmlFor="image">
          <img
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            alt=""
            className="mt-2 h-16 rounded cursor-pointer"
          />
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </label>
        <p className="mt-4">Blog Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded "
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <p className="mt-4">Sub Title</p>
        <input
          type="text"
          placeholder="Type here"
          required
          className="w-full max-w-lg mt-2 p-2 border border-gray-300 outline-none rounded "
          onChange={(e) => setSubTitle(e.target.value)}
          value={subTitle}
        />

        <p className="mt-4">Blog Description</p>

        <div className="max-w-lg h-74 pb-16 sm:pb-10 pt-2 relative ">
          <div ref={editorRef}></div>
          {loading && (
            <div className="absolute right-0 top-0 bottom-0 left-0 flex items-center justify-center bg-gray-500/5 ">
              <div className="w-8 h-8 rounded-full border-2 border-t-white  animate-spin"></div>
            </div>
          )}
          <button
          disabled = {loading}
            className="absolute bottom-1 right-2 ml-2 px-4 py-1.5 rounded hover:underline cursor-pointer text-white text-xs bg-black/70"
            type="button"
            onClick={generateContent}
          >
            {loading ? "Generating..." : "Generate Content"}
          </button>
        </div>
        <p>Blog Category</p>
        <select
          onChange={(e) => setCategory(e.target.value)}
          name="category"
          className="mt-2 px-3 border text-gray-500 border-gray-300 outline-none rounded"
        >
          Select Category
          <option value="">Select Category</option>
          {blogCategories.map((item, index) => {
            return <option value={item}>{item}</option>;
          })}
        </select>

        <div className="flex gap-3 mt-4">
          <p>Publish Now </p>
          <input
            type="checkbox"
            checked={isPublished}
            className="scale-125
                    cursor-pointer"
            onChange={(e) => setIsPublished(e.target.checked)}
          />

          
        </div>
        <button
        disabled={isAdding}
            type="submit"
            className="mt-8 w-40 bg-primary h-10 text-white rounded cursor-pointer text-sm"
          >{isAdding ? "Adding..." : "Add Blog"}
          </button>
      </div>
    </form>
  );
};

export default AddBlog;
