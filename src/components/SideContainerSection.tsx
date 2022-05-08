import { motion, useMotionValue, useTransform } from 'framer-motion';
import { keyframes, styled } from '@root/stitches.config';

// components
import { Box } from './core';

const sideContainerOpenAnimation = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-100%)' },
  '100%': { opacity: 1, transform: 'translateX(0%)' }
});

const overlayOpenAnimation = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 }
});

const SideContainerOverlay = styled(motion.div, {
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  backdropFilter: 'blur(3px)',
  width: '100%',
  position: 'absolute',
  height: '100vh',
  top: 0,
  left: 0
});

const SideContainerContent = styled(motion.div, {
  position: 'relative',
  display: 'flex',
  width: '440px',
  height: '100%',
  overflowY: 'scroll',
  backgroundColor: '$black',
  borderRight: '1px solid $border'
});

export function SideContainerSection({
  onClose,
  children
}: {
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <Box
      css={{
        width: '100%',
        position: 'absolute',
        height: '100vh',
        top: 0,
        left: 0
      }}>
      <SideContainerOverlay
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
      <SideContainerContent
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        transition={{ duration: 0.5 }}>
        {children}
      </SideContainerContent>
    </Box>
  );
}
