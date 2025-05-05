// src/styles/stitches.config.ts
import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  theme,
  createTheme,
  globalCss,
  keyframes,
  getCssText,
  config,
} = createStitches({
  theme: {
    colors: {
      background: '#f5f5f5',
      text: '#1a1a1a',
      primary: '#1E90FF',
      secondary: '#FF69B4',
      border: '#ccc',
    },
    fonts: {
      body: 'Roboto, sans-serif',
    },
    space: {
      sm: '8px',
      md: '16px',
      lg: '32px',
    },
    fontSizes: {
      sm: '14px',
      md: '16px',
      lg: '20px',
    },
    radii: {
      sm: '4px',
      md: '8px',
    },
  },
});

export const darkTheme = createTheme('dark', {
  colors: {
    background: '#111827',
    text: '#ffffff',
    primary: '#3b82f6',
    border: '#374151',
  },
});
