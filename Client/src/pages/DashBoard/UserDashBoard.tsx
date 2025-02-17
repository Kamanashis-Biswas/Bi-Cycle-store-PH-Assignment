import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoMdBicycle } from "react-icons/io";
import { useAppDispatch } from "@/Redux/hooks";
import { useLogoutMutation } from "@/Redux/Features/Auth/AuthApi";
import { logout } from "@/Redux/Features/Auth/AuthSlice";
import { toast } from "sonner";
import { FaHome, FaUser } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { IoLogOut, IoClose } from "react-icons/io5";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";

const userNavItems = [
  { title: "User Dashboard", icon: <FaHome />, link: "/userDashboard" },
  {
    title: "View Orders",
    icon: <MdGridView />,
    link: "/userDashboard/viewOrders",
  },
  {
    title: "Profile Settings",
    icon: <FaUser />,
    link: "/userDashboard/profileSetting",
  },
  {
    title: "Update Password",
    icon: <IoMdSettings />,
    link: "/userDashboard/updatePassword",
  },
];

export default function UserDashBoard() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logoutDb] = useLogoutMutation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    await dispatch(logout());
    await logoutDb(undefined);
    navigate("/login");
    toast.success("Log Out Successful!");
  };

  return (
    <div className="md:flex">
      {/* Sidebar */}
      <div
        className={`fixed md:relative bg-white md:w-64 w-72 h-full shadow-md transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 z-50 md:sticky md:top-0 md:h-screen`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <Link
            to="/"
            className="text-xl font-bold flex items-center gap-2 text-blue-600"
          >
            <IoMdBicycle className="text-3xl" />
            <h1>
              Bike<span className="text-gray-800">Nexus</span>
            </h1>
          </Link>
          <button
            className="md:hidden p-2"
            onClick={() => setIsSidebarOpen(false)}
          >
            <IoClose className="text-2xl text-gray-700" />
          </button>
        </div>

        <ul className="mt-4 px-4">
          {userNavItems.map((item, index) => (
            <li key={index} className="mb-2">
              <Link
                to={item.link}
                className={`flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition ${
                  location.pathname === item.link
                    ? "bg-blue-100 text-blue-600"
                    : "hover:bg-gray-200 text-gray-700"
                }`}
              >
                {item.icon}
                {item.title}
              </Link>
            </li>
          ))}

          <li className="mt-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 p-3 rounded-lg font-semibold bg-red-100 text-red-600 hover:bg-red-200"
            >
              <IoLogOut className="text-xl" />
              Log Out
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="bg-white shadow-md p-4 flex items-center justify-between md:hidden">
          <button
            className="p-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <HiOutlineBars3BottomRight className="text-2xl text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold">User Panel</h1>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 w-full h-full overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
