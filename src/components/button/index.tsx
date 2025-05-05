import { styled } from '../../styles/stitches.config';

export const Button = styled('button', {
  backgroundColor: 'white',
  border: '2px solid black',
  color: 'black',
  fontSize: '1rem',
  padding: '0.5rem 1.2rem',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#eee',
  },
});
