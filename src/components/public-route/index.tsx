import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppStore } from '../../store';


type PublicRouteProps = {
  children: React.ReactElement;
};

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const user = useAppStore((state) => state.user);

  return user ? <Navigate to="/finances/home" replace /> : children;
};

export default PublicRoute;
