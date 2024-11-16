import SignUpQoute from "../components/SignUpQoute";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import { useEffect, useState } from "react";
import { SignupType } from "@akash-wt/medium-types";
import axios from "axios";
import url from "../config";
import SignLoader from "../components/signLoader"


export default function Signin() {
  const nevigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [signin, setSignin] = useState<SignupType>({
    email: "",
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
      setLoading(true);
      localStorage.removeItem("token");
      const response = await axios.post(`${url}/user/signin`, signin);
      const jwt = response.data.jwt;

      if (response.data.msg != "user not exist") {


        nevigate("/blogs");
      }
      else {
        alert(response.data.msg);
      }

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
              <p className="text-4xl font-bold pb-2 ">Welcome to Medium!</p>

              <p className=" text-center ">
                Don't have an account?{""}
                <span className="text-blue-600 pl-2 underline">
                  {" "}
                  <Link to={"/signup"}>Singup</Link>
                </span>
              </p>
              <div>
                <Input
                  label="Email"
                  value={signin.email}
                  onChange={(e) =>
                    setSignin({ ...signin, email: e.target.value })
                  }
                  placeholder="john@gmail.com"
                />
                <Input
                  value={signin.password}
                  label="Password"
                  onChange={(e) =>
                    setSignin({ ...signin, password: e.target.value })
                  }
                  placeholder="********"
                />
              </div>
              <div>
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
        </div>

        <div className="hidden lg:flex">
          <SignUpQoute />
        </div>
      </div>
    </div>
  );
}
