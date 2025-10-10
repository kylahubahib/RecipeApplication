import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import getInitials from "../utils/initials-profile";

export default function NavbarDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [initials, setInitials]= useState("AN");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    // console.log(user);
    setInitials(getInitials(user.fullName));
    // console.log(initials);
  },[initials])

  function LogOut() {
    if(confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      navigate('/login');
    }
  }

  return (
    <div className="relative inline-block text-left">
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-[#FE5D26] bg-white hover:bg-gray-100 cursor-pointer font-semibold rounded-full text-sm p-2.5 text-center inline-flex items-center"
        type="button"
      >
        {initials}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <Link
                to={"/profile"}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Profile
              </Link>
            </li>
            <li>
              <a
                onClick={LogOut}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Sign out
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
