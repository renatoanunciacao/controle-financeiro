// components/Header.styles.ts
import { styled } from '@stitches/react';

export const ContainerHeader = styled('header', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 20px',
  backgroundColor: '#e2e8f0',
  borderBottom: '1px solid #ddd',
});

export const UserInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const Avatar = styled('img', {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
});

export const UserName = styled('span', {
  fontWeight: 500,
  fontSize: '16px',
});

export const LogoutButton = styled('button', {
  padding: '8px 16px',
  backgroundColor: '#625150',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: 'bold',
  transition: 'background-color 0.3s',
  '&:hover': {
    backgroundColor: '#d32f2f',
  },
});
