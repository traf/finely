// components
import { Box } from '@components/core';
import { DashboardNav } from '@root/src/components/DashboardNav';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      css={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'column',
        '@md': { flexDirection: 'row' }
      }}>
      <DashboardNav />
      <Box
        css={{
          mt: 85,
          width: '100%',
          height: '100vh',
          position: 'relative',
          '@md': { mt: 0, overflowY: 'scroll' }
        }}>
        {children}
      </Box>
    </Box>
  );
}
