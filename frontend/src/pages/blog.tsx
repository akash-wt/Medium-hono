import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import url from '../config';
import axios from 'axios';
import SingleBlogSkelton from "../components/skeltons/singleBlogSkelton"
import { useNavigate } from "react-router-dom";


interface BlogData {
  blog: {
    id: string;
    title: string;
    content: string;
    author: {
      name: string;
      id: string;
    };
  };
  user: string;
};


export default function Blog() {
  const nevigate = useNavigate();

  const { id } = useParams();
  const [blog, setBlog] = useState<BlogData | null>(null);
  const [update, setUpdate] = useState(false)
  const data = {
    title: blog?.blog.title,
    content: blog?.blog.content
  }
  useEffect(() => {

    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${url}/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });



        if (!response) {
          throw Error;
        }
        console.log(response.data);
        setBlog(response.data);
        if (response.data.user === response.data.blog.author.id) {
          setUpdate(true);
        }

      } catch (e) {
        alert(`Unauthorized: ${e}`);
      }
    };

    fetchBlogs();
  }, [id]);



  if (!blog) return (

    <SingleBlogSkelton />

  )

  return (

    <div className="min-h-90 bg-[rgb(17,17,17)] py-10 px-6 sm:px-10">
      <div className="max-w-3xl mx-auto bg-[#212121] shadow-lg rounded-lg overflow-hidden relative">
        {update ? (
          <span
            onClick={() => { nevigate(`/blog/edit/${blog.blog.id}`, { state: data }) }}
            className="material-symbols-outlined absolute top-4 right-4 text-gray-300 cursor-pointer border border-gray-500 rounded-full p-2 hover:bg-gray-900 transition"
          >

            edit
          </span>
        ) : null}
        <div className="p-8 space-y-6">
          <h1 className="text-4xl font-semibold text-[#ECECEC]">{blog.blog.title}</h1>
          <p className="text-lg text-gray-300 leading-relaxed">{blog.blog.content}</p>
          <p className="text-sm text-gray-400">
            By <span className="font-medium text-gray-200">{blog.blog.author.name}</span>
          </p>
        </div>

      </div>
    </div>


  )

}