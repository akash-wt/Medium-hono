import SignUpQoute from "../components/SignUpQoute";
import { Link ,useNavigate } from "react-router-dom";
import Input from "../components/input";
import { useState } from "react";
import { SignupType } from "@akash-wt/medium-types";
import axios from "axios";
import url from "../config";
import SignLoader from "../components/signLoader"

export default function Signup() {
    const nevigate =useNavigate();
    const [loading, setLoading] = useState(false);

  const [signup, setSignup] = useState<SignupType>({
    email: "",
    name: "",
    password: "",
  });
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
    }finally {
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
                className="flex  items-center justify-center  py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-600 focus:z-10 focus:ring-4 focus:ring-gray-100 w-full mt-4"
              >
                Signup  {loading? <span className=" ml-6"><SignLoader /></span> : null}
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
