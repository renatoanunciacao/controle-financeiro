
import { styled } from '@stitches/react';


export const Form = styled('form', {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
})

export const Container = styled('div', {
    padding: '2rem',
    display: 'grid',
    gap: '1.5rem',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    backgroundColor: '$background',
});

export const Card = styled('div', {
    backgroundColor: 'white',
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
});

export const Title = styled('h2', {
    marginBottom: '1rem',
    fontSize: '1.25rem',
});

export const Select = styled('select', {
    padding: '0.75rem 1rem',
    paddingRight: '2.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    marginBottom: '1rem',
    backgroundColor: 'white',
    color: 'black',
    cursor: 'pointer',

    '&:focus': {
        outline: 'none',
        borderColor: '#1976d2',
    },


    '& option': {
        padding: '0.75rem',
    },


    '&::-ms-expand': {
        display: 'none',
    },
});

export const Input = styled('input', {
    padding: '0.75rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    marginBottom: '1rem',
});

export const Button = styled('button', {
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.25rem',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '0.5rem',
    alignSelf: 'flex-start',

    '&:hover': {
        backgroundColor: '#115293',
    },
});

export const ProgressBar = styled('div', {
    height: '8px',
    borderRadius: '4px',
    backgroundColor: '#e0e0e0',
    overflow: 'hidden',
    margin: '0.5rem 0',
});

export const ProgressFill = styled('div', {
    height: '100%',
    backgroundColor: '#1976d2',
});

export const FormGroup = styled('div', {
    display: 'flex',
    gap: '20px'
})