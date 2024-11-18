import { useNavigate } from "react-router-dom";
import Input from "../components/input";
import { useState } from "react";
import { CreateBlogType } from "@akash-wt/medium-types";
import axios from "axios";
import url from "../config";
import SignLoader from "../components/signLoader";
import Textarea from "../components/Textarea";

export default function New() {
  const nevigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newBlog, setNewBlog] = useState<CreateBlogType>({
    title: "",
    content: "",
  });

  const handleNew = async (): Promise<void> => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.post(`${url}/blog`, newBlog, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data);
      if (response.data.blog.id) {
        nevigate(`/blog/${response.data.blog.id}`);
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="flex flex-row min-h-screen justify-center items-center">
          <div>
            <p className="text-4xl font-bold pb-2 ">Welcome to Medium!</p>

            <div>
              <Input
                label="Title"
                value={newBlog.title}
                onChange={(e) =>
                  setNewBlog({ ...newBlog, title: e.target.value })
                }
                placeholder="Enter good title"
              />
              <Textarea
                value={newBlog.content}
                label=" Description"
                onChange={(e) =>
                  setNewBlog({ ...newBlog, content: e.target.value })
                }
                placeholder="Enter good description..."
              />
              
            </div>

            <div>
              <button
                type="button"
                onClick={handleNew}
                className="flex items-center justify-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-[#ECECEC] focus:outline-none bg-white dark:bg-[#212121] rounded-lg border border-gray-200 dark:border-[#333333] hover:bg-gray-100 dark:hover:bg-[#333333] focus:z-10  w-full mt-4 relative"
              >
                Post
                {loading && (
                  <span className="absolute right-6">
                    <SignLoader />
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
