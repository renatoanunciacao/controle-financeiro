// src/styles/global.ts
import { globalCss } from './stitches.config';

export const globalStyles = globalCss({
  '*': { boxSizing: 'border-box' },
  body: {
    fontFamily: '$body',
    backgroundColor: '$background',
    color: '$text',
    transition: 'all 0.3s ease',
  },
});
