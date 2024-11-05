import { useEffect, useState } from "react";
import Blog from "../components/blog";
import { useRecoilValue, useSetRecoilState } from "recoil";
import blogsAtom from "../atoms/blogs";
import axios from "axios";
import url from "../config";
import Loader from "../components/loder";

export default function Blogs() {
  const setBlogs = useSetRecoilState(blogsAtom);
  const [loading, setLoading] = useState(true);
  const blogs = useRecoilValue(blogsAtom);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
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
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
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
    <div>
      {blogs.map((blog: blogType) => (
        <Blog
          key={blog.id}
          title={blog.title}
          description={blog.content}
          author={blog.author.name}
          date="21 may, 2024"
        />
      ))}
    </div>
  );
}
