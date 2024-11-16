import { useNavigate } from "react-router-dom";



function Navbar() {
  const nevigate = useNavigate();
  return (
    <nav className="bg-[rgb(17,17,17)] shadow-md mb-2 sticky top-0 z-50 border-b border-gray-700">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-semibold text-[#ECECEC]">Medium</div>
        <ul className="hidden sm:flex space-x-6 text-[#ECECEC]">
          <li>
            <a onClick={() => { nevigate('/blogs') }} className="hover:text-gray-200 hover:cursor-pointer transition-colors duration-200">
              Home
            </a>
          </li>
          <li  onClick={() => { nevigate('/blog/new') }} className="hover:text-gray-200 hover:cursor-pointer transition-colors duration-200">
           Add
          </li>
          <li>
            <a className="hover:text-gray-200 transition-colors duration-200">
              About
            </a>
          </li>
          <li>
            <a className="hover:text-gray-200 transition-colors duration-200">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>


  );
}

export default Navbar;
