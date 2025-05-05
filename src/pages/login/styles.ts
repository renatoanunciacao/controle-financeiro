import { styled } from '@stitches/react'


export const Container = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '$background',
    perspective: '1000px',
});

export const Card = styled('div', {
    width: '340px',
    height: '420px',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.8s ease',
    variants: {
        flipped: {
            true: { transform: 'rotateY(180deg)' },
            false: { transform: 'rotateY(0deg)' },
        },
    },
});

export const Title = styled('h1', {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    color: '$text',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  
    span: {
      fontSize: '1.8rem',
    },
  });

export const Side = styled('div', {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    backgroundColor: '$panel',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '1rem',
});

export const Front = styled(Side, {});
export const Back = styled(Side, {
    transform: 'rotateY(180deg)',
});

export const ContainerIntegrations = styled('div', {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
 
});

export const SwitchText = styled('p', {
    fontSize: '0.875rem',
    textAlign: 'center',
    marginTop: '1rem',
    color: '$text',
    a: {
        color: '$primary',
        cursor: 'pointer',
        fontWeight: 'bold',
        textDecoration: 'underline',
        marginLeft: '4px',
    },
});