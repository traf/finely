import { styled } from '@root/stitches.config';

export const BaseButton = styled('button', {});

export const Button = styled(BaseButton, {
  gap: '12px',
  outline: 'none',
  border: 'none',
  display: 'flex',
  cursor: 'pointer',
  fontWeight: 'bold',
  fontFamily: '$body',
  lineHeight: '1',
  justifyContent: 'center',
  alignItems: 'center',

  transition: 'all 0.12s ease-in-out',

  variants: {
    shape: {
      normal: {
        borderRadius: '$sm'
      },
      rounded: {
        borderRadius: '$pill'
      }
    },
    color: {
      primary: {
        color: '$black',
        background: '$offWhite'
      },
      secondary: {
        color: '$white',
        background: '$border'
      }
    },
    size: {
      small: {
        py: '8px',
        px: '12px',
        fontSize: '14px'
      },
      medium: {
        py: '12px',
        px: '20px',
        fontSize: '16px'
      },
      large: {
        py: '18px',
        px: '28px',
        fontSize: '20px'
      }
    }
  },

  defaultVariants: {
    size: 'medium',
    shape: 'normal',
    color: 'primary'
  },

  '&:active': {
    transform: 'scale(0.96)'
  }
});
