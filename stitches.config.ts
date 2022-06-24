import { createStitches } from '@stitches/react';

export const stitchesInstance = createStitches({
  theme: {
    colors: {
      white: '#fff',
      border: '#1c1c1c',
      grey: '#818892',
      offBlack: '#111',
      black: '#0d0d0d',
      error: '#b84c4c',
      success: '#16a34a',
      jetBlack: '#090909',
      darkGrey: '#1b1b1b',
      offWhite: '#f0f0f0'
    },
    fonts: {
      body: '"Inter", sans-serif'
    },
    fontWeights: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900'
    },
    letterSpacings: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em'
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
    mt: (value: any) => ({ marginTop: value }),
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
  'hmtl, body': { fontFamily: '$body', backgroundColor: '$black', color: '$white' },
  a: { color: '$white' },
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale'
  }
});
