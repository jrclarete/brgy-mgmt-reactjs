import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Navigate, useLocation } from "react-router";

type Props = { children: React.ReactNode };

const RequireAuth = ({ children }: Props) => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  return isAuthenticated() ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
