import { styled } from '../styles/stitches.config';
import { InputHTMLAttributes } from 'react';

const Input = styled('input', {
  width: '100%',
  padding: '0.75rem',
  fontSize: '1rem',
  border: '1px solid $border',
  borderRadius: '4px',
  outline: 'none',
  '&:focus': {
    borderColor: '$primary',
  },
});

type Props = InputHTMLAttributes<HTMLInputElement>;

export function InputField(props: Props) {
  return <Input {...props} />;
}
