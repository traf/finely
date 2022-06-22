import { motion } from 'framer-motion';
import { styled } from '@root/stitches.config';

// components
import { Box } from './core';

const SideContainerOverlay = styled(motion.div, {
  top: 0,
  left: 0,
  width: '100%',
  position: 'absolute',
  backdropFilter: 'blur(3px)',
  backgroundColor: 'rgba(0, 0, 0, 0.2)',
  '@md': {
    height: '100vh'
  }
});

const SideContainerContent = styled(motion.div, {
  position: 'relative',
  display: 'flex',
  width: '100%',
  height: '100%',
  overflowY: 'scroll',
  backgroundColor: '$black',
  borderRight: '1px solid $border',
  '@md': {
    width: '440px'
  }
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
        top: 0,
        left: 0,
        width: '100%',
        position: 'absolute',
        '@md': {
          height: '100vh'
        }
      }}>
      <SideContainerOverlay
        onClick={onClose}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      <SideContainerContent
        animate={{ x: 0 }}
        exit={{ x: '-100%' }}
        initial={{ x: '-100%' }}
        transition={{ duration: 0.5 }}>
        {children}
      </SideContainerContent>
    </Box>
  );
}
