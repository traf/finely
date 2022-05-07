import { Nav } from '@components/Nav';
import { Box } from '@components/core';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box>
      <Nav />
      <Box css={{ paddingTop: '170px', mx: 'auto' }}>{children}</Box>
    </Box>
  );
}
