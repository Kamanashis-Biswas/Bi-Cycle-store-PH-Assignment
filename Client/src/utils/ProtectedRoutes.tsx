import { useCurrentToken } from "@/Redux/Features/Auth/AuthSlice";
import { useAppSelector } from "@/Redux/hooks";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();

  if (!token) {
    return <Navigate state={location?.pathname} to={'/login'} replace={true}></Navigate>;
  }
  return children;
};

export default ProtectedRoutes;