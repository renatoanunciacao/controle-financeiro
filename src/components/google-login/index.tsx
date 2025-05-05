import React from 'react'
import { useAppStore } from '../../store';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import GoogleLogo from './logo';

type GoogleUserInfo = {
    name: string;
    email: string;
    picture: string;
  };

const GoogleLoginButton: React.FC = () => {

    const setUser = useAppStore((state) => state.setUser);
    const navigate = useNavigate();

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
              const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                  Authorization: `Bearer ${tokenResponse.access_token}`,
                },
              });
      
              if (!res.ok) throw new Error('Failed to fetch user info');
      
              const userData: GoogleUserInfo = await res.json();
      
              setUser({
                name: userData.name,
                email: userData.email,
                picture: userData.picture,
              });
      
              navigate('/home');
            } catch (error) {
              console.error('Login error:', error);
            }
          },
          onError: () => {
            console.error('Google Login Failed');
          },
    });

    return (
        <button
            onClick={() => login()}
            style={{
              padding: '10px 20px',
              borderRadius: '999px',
              backgroundColor: '#c3cddc',
              color: 'white',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontSize: '14px'
            }}
        >
            <GoogleLogo />
          
        </button>
    )
}

export default GoogleLoginButton
