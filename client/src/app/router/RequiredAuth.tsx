import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppSelector";
import { toast } from "react-toastify";

interface Props {
  roles?: string[];
}

export default function RequiredAuth({ roles }: Props) {
  const { user } = useAppSelector((state) => state.account);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  if (roles && !roles.some((r) => user.roles?.includes(r))) {
    toast.error("Not authorised to acces this area");
    return <Navigate to="/catalog" />;
  }
  return <Outlet />;
}
