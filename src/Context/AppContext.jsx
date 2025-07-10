//   share the global state  to all the componenets
// create create in the component which has data
import axios from "axios";
import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

/// base url added so addd the rest of the path in the get or post request parameter
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const appContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const [blog, setBlog] = useState([]);
  const [input, setInput] = useState("");

  const fetchBlogs = async () => {
    try {
      const { data } = await axios.get("/api/blog/all");

      //    if the respones has data and it is succesfully fetched we ll set the data into the setBlog or else show the notification using
      data.success ? setBlog(data.blogs) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // when ever the app is open the fetch Blog should run and store the data
    fetchBlogs();

    const token = localStorage.getItem("token");
    // token is added in all the api request (call) when ever the token if available in the localstorage
    if (token) {
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `${token}`;
    }
  }, []);

  const value = {
    axios,
    navigate,
    token,
    setToken,
    blog,
    setBlog,
    input,
    setInput,
  };

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
};

export const useAppContext = () => {
  return useContext(appContext);
};
