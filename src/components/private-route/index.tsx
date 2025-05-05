// components/PrivateRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppStore } from '../../store';


type PrivateRouteProps = {
  children: React.ReactElement;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const user = useAppStore((state) => state.user);

  return user ? children : <Navigate to="/finances/login" replace />;
};

export default PrivateRoute;
