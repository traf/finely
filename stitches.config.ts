import { createStitches } from '@stitches/react';

export const stitchesInstance = createStitches({
  theme: {
    colors: {
      white: '#fff',
      border: '#222',
      grey: '#818892',
      offBlack: '#111',
      black: '#0d0d0d',
      jetBlack: '#090909',
      darkGrey: '#1b1b1b',
      offWhite: '#f0f0f0'
    },
    fonts: {
      body: '"Inter", sans-serif'
    },
    letterSpacings: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
    },
    space: {
      0: '0px',
      px: '1x',
      '0.5': '2px',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      13: '52px',
      14: '56px',
      15: '60px',
      16: '64px',
      17: '68px',
      18: '72px'
    },
    radii: {
      sm: '8px',
      md: '12px',
      lg: '20px',
      pill: '100px'
    }
  },
  media: {
    sm: '(min-width: 640px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 1024px)',
    xl: '(min-width: 1280px)',
    '2xl': '(min-width: 1536px)'
  },
  utils: {
    mx: (value: any) => ({ marginLeft: value, marginRight: value }),
    my: (value: any) => ({ marginTop: value, marginBottom: value }),
    px: (value: any) => ({ paddingLeft: value, paddingRight: value }),
    py: (value: any) => ({ paddingTop: value, paddingBottom: value })
  }
});

export const { theme, createTheme, styled, getCssText, globalCss, css, keyframes } =
  stitchesInstance;

export const lightMode = createTheme('light-mode', {
  colors: {
    background: '#ffffff',
    text: '#000000',
    accentText: '#000000'
  }
});

export const darkMode = createTheme('dark-mode', {});

export const globalStyles = globalCss({
  'hmtl, body': { fontFamily: '$body', backgroundColor: '$background', color: '$text' },
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale'
  }
});
