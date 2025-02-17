import { Tuser } from "@/components/userDashBoard/ProfileSetting";
import { useCurrentToken } from "@/Redux/Features/Auth/AuthSlice";
import { useAppSelector } from "@/Redux/hooks";
import { jwtDecode } from "jwt-decode";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";


const DashboardProtected = ({ children, role }: { children: ReactNode, role: string }) => {
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = jwtDecode(token) as Tuser
  }

  if (!user?.email) {
    return <Navigate to={'/login'}></Navigate>;
  }

  if (user?.role !== role) {
    return <Navigate to={user?.role === "admin" ? "/adminDashboard" : "/userDashboard"} />;
  }
  return children;
};

export default DashboardProtected;