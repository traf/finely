import { createStitches } from '@stitches/react';

export const { createTheme, styled, getCssText, globalCss, css } = createStitches({
  theme: {
    colors: {
      background: '#ffffff'
    },
    fonts: {
      body: '"Inter", sans-serif'
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
      14: '56px'
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
    mx: (value: number) => ({ marginLeft: value, marginRight: value }),
    my: (value: number) => ({ marginTop: value, marginBottom: value }),
    px: (value: number) => ({ paddingLeft: value, paddingRight: value }),
    py: (value: number) => ({ paddingTop: value, paddingBottom: value })
  }
});

export const dark = createTheme({
  colors: {
    background: '#000000'
  }
});

export const globalStyles = globalCss({
  'hmtl, body': { fontFamily: '$body', backgroundColor: '$background' },
  '*': { margin: 0, padding: 0, boxSizing: 'border-box' }
});
