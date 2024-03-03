import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import { Navigate, useLocation } from "react-router";
import CheckAuthorization from "./CheckAuthorization";
import ForbiddenPage from "./ForbiddenPage";

type Props = {
  children: React.ReactNode;
  roleModule: string;
  roleClaim?: string[] | undefined;
};

const RequireAuth = ({ children, roleModule, roleClaim }: Props) => {
  const isAuthenticated = useIsAuthenticated();
  const location = useLocation();

  if (isAuthenticated()) {
    if (CheckAuthorization(roleModule, roleClaim) === true) {
      return <>{children}</>;
    } else {
      return <ForbiddenPage></ForbiddenPage>;
    }
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  /*return CheckAuthorization(roleModule, roleClaim) ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );*/
};

export default RequireAuth;
