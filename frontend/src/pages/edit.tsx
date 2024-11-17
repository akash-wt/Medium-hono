import { useNavigate, useParams, useLocation } from "react-router-dom";
import Input from "../components/input";
import { useState } from "react";
import { UpdateBlogType } from "@akash-wt/medium-types";
import axios from "axios";
import url from "../config";
import SignLoader from "../components/signLoader";
import Textarea from "../components/textarea";

export default function Edit() {
  const nevigate = useNavigate();
  const location = useLocation();
  let data = location.state;

  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState<UpdateBlogType>({
    title: data.title,
    content: data.content,
  });
  const { id } = useParams();

  const handleEdit = async (): Promise<void> => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.put(`${url}/blog/${id}`, edit, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.msg == " blog updated!") {
        nevigate(`/blog/${id}`);
      }
      console.log(response);
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div className="flex flex-row min-h-screen justify-center  items-center">
          <div>
            <p className="text-4xl font-bold pb-2 ">Welcome to Medium!</p>

            <div>
              <Input
                label="Update Title"
                value={edit.title}
                onChange={(e) => setEdit({ ...edit, title: e.target.value })}
                placeholder=""
              />
             
              <Textarea value={edit.content}
                label="Update Description"
                onChange={(e) => setEdit({ ...edit, content: e.target.value })}
                placeholder=""/>

            </div>
            <div>
              <button
                type="button"
                onClick={handleEdit}
                className="flex items-center justify-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-[#ECECEC] focus:outline-none bg-white dark:bg-[#212121] rounded-lg border border-gray-200 dark:border-[#333333] hover:bg-gray-100 dark:hover:bg-[#333333] focus:z-10  w-full mt-4 relative"
              >
                Update
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
