import SignUpQoute from "../components/SignUpQoute"
import Auth from "../components/Auth"

export default function Signup() {
    return (

        <div>

            <div className="grid grid-cols-1  md:grid-cols-2">
            <div>
            <Auth />
            </div>

           <div className="hidden md:flex">
           <SignUpQoute />
           </div>
            </div>


        </div>
    )

}