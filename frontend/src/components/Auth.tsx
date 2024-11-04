import { Link } from "react-router-dom"
import Input from "./input"
export default function Auth() {
    return (


        <div className="flex flex-row min-h-screen justify-center items-center">
            <div>
                <p className="text-4xl font-bold pb-2 ">
                    Create an account
                </p>

                <p className=" text-center ">Already have an account? <span className="text-blue-600 pl-2 underline"> <Link to={"/signin"}>Login</Link></span></p>
                <div>
                    <Input label="Username" onChange={() => { }} placeholder="John Doe" />
                    <Input label="Email" onChange={() => { }} placeholder="john@gmail.com" />
                    <Input label="Password" onChange={() => { }} placeholder="********" />
                </div>
                <button type="button" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-600 focus:z-10 focus:ring-4 focus:ring-gray-100 w-full mt-4">Signup</button>
            </div>
        </div>
    )
}