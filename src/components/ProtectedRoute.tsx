import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (user === null) {
    return <div>Carregando...</div>; 
  }
  return user ? <>{children}</> : <Navigate to="/Login" replace />;
};
