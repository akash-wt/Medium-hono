import SignUpQoute from "../components/SignUpQoute";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/input";
import { useState } from "react";
import { SignupType } from "@akash-wt/medium-types";
import axios from "axios";
import url from "../config";


export default function Signin() {
  const nevigate = useNavigate();
  const [signin, setSignin] = useState<SignupType>({
    email: "",
    password: "",
  });
  const handleSignup = async (): Promise<void> => {
    try {
      const response = await axios.post(`${url}/user/signin`, signin);
      const jwt = response.data.jwt;
      nevigate("/blogs");

      localStorage.setItem("token", jwt);
    } catch (e) {
      alert(e);
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
              <button
                type="button"
                onClick={handleSignup}
                className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-600 focus:z-10 focus:ring-4 focus:ring-gray-100 w-full mt-4"
              >
                Login
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
