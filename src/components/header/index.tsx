// components/Header.tsx
import React from 'react';

import { useNavigate } from 'react-router-dom';
import {
  ContainerHeader,
  UserInfo,
  Avatar,
  UserName,
  LogoutButton
} from './styles';
import { useAppStore } from '../../store';

const Header: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const user = useAppStore((state) => state.user);
  const clearUser = useAppStore((state) => state.clearUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <ContainerHeader>
      <UserInfo>
        <Avatar src={user.picture} alt={user.name} />
        <UserName>{user.name}</UserName>
      </UserInfo>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {children}
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </div>
    </ContainerHeader>
  );
};

export default Header;
