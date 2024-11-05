function Navbar() {
  return (
    <nav className="bg-white shadow-md mb-2">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-xl font-semibold text-gray-800">Medium</div>
        <ul className="hidden sm:flex space-x-4 text-gray-700">
          <li>
            <a  className="hover:text-gray-900">
              Home
            </a>
          </li>
          <li>
            <a  className="hover:text-gray-900">
              About
            </a>
          </li>
          <li>
            <a  className="hover:text-gray-900">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
