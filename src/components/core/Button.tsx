import { styled } from '@root/stitches.config';

export const Button = styled('button', {
  gap: '8px',
  display: 'flex',
  alignItems: 'center',

  color: '$offBlack',
  background: '$offBlack',

  height: '52px',
  padding: '0 24px',
  borderRadius: '$pill',

  fontSize: '18px',
  letterSpacing: '-0.4px',

  '&:hover': {
    background: '$borders'
  },

  '&:active': {
    transform: 'scale(0.96)'
  }
});

export const PrimaryButton = styled(Button, {
  color: '$black',
  background: '$offWhite',

  '&:hover': {
    background: '$white'
  },

  img: {
    filter: 'invert(1)',
    width: '12px'
  }
});
