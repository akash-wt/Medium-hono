import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import url from '../config';
import axios from 'axios';
import SingleBlogSkelton from "../components/skeltons/singleBlogSkelton"
interface BlogData {
    blog: {
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

    const { id } = useParams();
    const [blog, setBlog] = useState<BlogData | null>(null);
    const [update, setUpdate] = useState(false)

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
        <div className="max-w-3xl mx-auto bg-[#212121] shadow-lg rounded-lg overflow-hidden">
          <div className="p-8 space-y-6">
            <h1 className="text-4xl font-semibold text-[#ECECEC]">{blog.blog.title}</h1>
            <p className="text-lg text-gray-300 leading-relaxed">{blog.blog.content}</p>
            <p className="text-sm text-gray-400">
              By <span className="font-medium text-gray-200">{blog.blog.author.name}</span>
            </p>
          </div>
  
          {update ? (
          <div className="bg-[#212121] border-t border-[#333333] px-6 py-4 flex justify-between items-center">
            <p className="text-[#ECECEC]">You have permission to edit this blog.</p>
            <button
              onClick={() => alert("Edit functionality not implemented yet!")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Edit Blog
            </button>
          </div>
        ) : (
          <div className="bg-[#212121] border-t border-[#333333] px-6 py-4">
            <p className="text-gray-400 text-center">
              You are viewing this blog in <span className="font-medium text-gray-200">read-only mode</span>.
            </p>
          </div>
        )}
        </div>
      </div>

    )

}