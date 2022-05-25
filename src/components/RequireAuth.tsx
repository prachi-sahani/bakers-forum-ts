import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/customHook";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const { authToken } = useAppSelector((state) => state.authentication);
  const location = useLocation();

  return authToken ? (
    children
  ) : (
    <Navigate to="/signIn" replace state={{ from: location }} />
  );
}
