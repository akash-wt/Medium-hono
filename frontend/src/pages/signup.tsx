import SignUpQoute from "../components/SignUpQoute";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import { useState,useEffect } from "react";
import { SignupType } from "@akash-wt/medium-types";
import axios from "axios";
import url from "../config";
import SignLoader from "../components/signLoader"

export default function Signup() {
  const nevigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [signup, setSignup] = useState<SignupType>({
    email: "",
    name: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      nevigate("/blogs");
      
    }
  }, [])

  const handleSignup = async (): Promise<void> => {
    try {
      console.log(`${url}/api/v1/user/signup`);
      setLoading(true);
      const response = await axios.post(`${url}/user/signup`, signup);
      const jwt = response.data.jwt;

      nevigate("/blogs");

      localStorage.setItem("token", jwt);

    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1  lg:grid-cols-2">
        <div>
          <div className="flex flex-row min-h-screen justify-center items-center">
            <div>
              <p className="text-4xl font-bold pb-2 ">Create an account</p>

              <p className=" text-center ">
                Already have an account?{" "}
                <span className="text-blue-600 pl-2 underline">
                  {" "}
                  <Link to={"/signin"}>Login</Link>
                </span>
              </p>
              <div>
                <Input
                  label="Username"
                  value={signup.name || ""}
                  onChange={(e) =>
                    setSignup({ ...signup, name: e.target.value })
                  }
                  placeholder="John Doe"
                />
                <Input
                  label="Email"
                  value={signup.email}
                  onChange={(e) =>
                    setSignup({ ...signup, email: e.target.value })
                  }
                  placeholder="john@gmail.com"
                />
                <Input
                  value={signup.password}
                  label="Password"
                  onChange={(e) =>
                    setSignup({ ...signup, password: e.target.value })
                  }
                  placeholder="********"
                />
              </div>
              <button
                type="button"
                onClick={handleSignup}
                className="flex items-center justify-center py-2.5 px-5 me-2 mb-2 text-sm font-medium text-[#ECECEC] focus:outline-none bg-white dark:bg-[#212121] rounded-lg border border-gray-200 dark:border-[#333333] hover:bg-gray-100 dark:hover:bg-[#333333] focus:z-10  w-full mt-4 relative"
              >
                Signup
                {loading && (
                  <span className="absolute right-6">
                    <SignLoader />
                  </span>
                )}
              </button>

            </div>
          </div>
        </div>

        <div className="hidden lg:flex">
          <SignUpQoute />
        </div>
      </div>
    </div>
  );
}
