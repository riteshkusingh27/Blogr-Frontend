import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Blog from "./Pages/Blog";
import Dashboard from "./Pages/admin/Dashboard";
import AddBlog from "./Pages/admin/AddBlog";
import ListBlog from "./Pages/admin/ListBlog";
import Comments from "./Pages/admin/Comments";
import Layout from "./Pages/admin/Layout";
import Login from "./Components/admin/Login";
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
import {useAppContext} from './Context/AppContext.jsx'
const App = () => {

  const {token} = useAppContext();
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={token?<Layout /> : <Login/>}>
          <Route index element={<Dashboard />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="list-blog" element={<ListBlog />} />
          <Route path="comments" element={<Comments />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
