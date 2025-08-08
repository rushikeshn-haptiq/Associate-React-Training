import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated || !!state.auth.user);
  const location = useLocation();

  return isAuthenticated
    ? children
    : <Navigate to="/login" replace state={{ from: location }} />;
};

export default ProtectedRoute;