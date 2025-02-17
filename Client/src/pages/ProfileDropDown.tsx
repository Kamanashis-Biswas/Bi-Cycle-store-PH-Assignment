import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/Redux/hooks";
import { FaUser } from "react-icons/fa";
import { logout, useCurrentToken } from "@/Redux/Features/Auth/AuthSlice";
import { toast } from "sonner";
import { useLogoutMutation } from "@/Redux/Features/Auth/AuthApi";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Tuser } from "@/components/userDashBoard/ProfileSetting";

const ProfileDropDown = () => {
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = jwtDecode(token) as Tuser;
  }
  const dispatch = useAppDispatch();
  const [logoutDb] = useLogoutMutation();
  const handleLogout = async () => {
    await dispatch(logout());
    await logoutDb(undefined);
    navigate("/login");
    toast.success("Log Out Ok...");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <FaUser className="md:text-2xl text-lg hover:text-blue-600 duration-300 ring-transparent" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-5 w-60 mr-5">
        <DropdownMenuItem className="flex flex-col items-center">
          <p>{user?.role === "admin" ? "admin" : "user"}</p>
          <h1 className="w-full text-xl font-semibold text-center">
            {user?.email}
          </h1>
        </DropdownMenuItem>

        <DropdownMenuItem>
          {user?.role === "admin" || (
            <Link to={"/userDashboard/viewOrders"} className="w-full">
              <Button
                variant={"outline"}
                className="w-full hover:text-blue-600"
              >
                My Orders
              </Button>
            </Link>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem>
          {user?.role === "admin" ? (
            <Link to={"/adminDashboard"} className="w-full">
              <Button
                variant={"outline"}
                className="w-full hover:text-blue-600"
              >
                Admin Dashboard
              </Button>
            </Link>
          ) : (
            <Link to={"/userDashboard"} className="w-full">
              <Button
                variant={"outline"}
                className="w-full hover:text-blue-600"
              >
                User Dashboard
              </Button>
            </Link>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={handleLogout}
            variant={"outline"}
            className="w-full hover:bg-blue-600 hover:text-white"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
