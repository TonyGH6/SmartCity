import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isLogged } = useSelector((state) => state.auth);

  if (!isLogged) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
