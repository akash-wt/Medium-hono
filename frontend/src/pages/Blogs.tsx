import { useEffect, useState } from "react";
import Blog from "../components/blog";
import { useRecoilValue, useSetRecoilState } from "recoil";
import blogsAtom from "../atoms/blogs";
import axios from "axios";
import url from "../config";
import { useNavigate } from "react-router-dom";


import BlogsSkelton from "../components/skeltons/blogsSkelton";

export default function Blogs() {
  const setBlogs = useSetRecoilState(blogsAtom);
  const [loading, setLoading] = useState(true);
  const blogs = useRecoilValue(blogsAtom);
  const nevigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");


        if (!token) {
          nevigate("/signup");

        }

        const response = await axios.get(`${url}/blog/bulk`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response) {
          throw Error;
        }
        console.log(response.data.blogs);
        setBlogs(response.data.blogs);
      } catch (e) {
        alert(`Unauthorized: ${e}`);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);


  if (loading) {
    return (

      <BlogsSkelton />

    );
  }

  interface blogType {
    author: {
      email: string;
      id: string;
      name: string;
      password: string;
    };

    id: string;
    authorId: string;
    content: string;
    published: boolean;
    title: string;
  }
  return (
    <div >
      {blogs.map((blog: blogType) => (

        <div style={{ cursor: 'pointer' }} key={blog.id} onClick={() => { nevigate(`/blog/${blog.id}`) }}>

          <Blog
            key={blog.id}
            title={blog.title}
            description={blog.content}
            author={blog.author.name}
            date="21 may, 2024"
          />
        </div>
      ))}
    </div>
  );
}
