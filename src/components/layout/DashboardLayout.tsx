import Link from 'next/link';
import Image from 'next/image';
import { styled } from '@root/stitches.config';

// components
import { Box } from '@components/core/Box';
import { useRouter } from 'next/router';

const SideBar = styled(Box, {
  width: 360,
  px: '80px',
  zIndex: '10',
  height: '100%',
  minHeight: '100vh',
  paddingTop: '80px',
  backgroundColor: '$black',
  borderRight: '1px solid $border'
});

const SideBarNavList = styled('ul', {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '40px'
});

const SideBarNavItem = styled('li', {
  fontSize: '22px',
  fontWeight: 'bold'
});

const SideBarNavLink = styled('a', {
  fontSize: '22px',
  lineHeight: '1',
  fontWeight: 'bold',
  textDecoration: 'none',
  variants: {
    color: {
      active: {
        color: '$white'
      },
      deactivate: {
        color: '$grey'
      }
    }
  }
});

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Box css={{ display: 'flex' }}>
      <SideBar>
        <Box css={{ display: 'flex', width: '100%' }}>
          <Box css={{ position: 'relative', width: 75, height: 36 }}>
            <Image layout="fill" objectFit="contain" src={`/logo.svg`} />
          </Box>
        </Box>
        <Box css={{ mt: 80 }}>
          <SideBarNavList>
            <li>
              <Link href="/portals" passHref>
                <SideBarNavLink
                  color={router.pathname.includes('portals') ? 'active' : 'deactivate'}>
                  Portals
                </SideBarNavLink>
              </Link>
            </li>
            <li>
              <Link href="/contracts" passHref>
                <SideBarNavLink
                  color={router.pathname.includes('contracts') ? 'active' : 'deactivate'}>
                  Contracts
                </SideBarNavLink>
              </Link>
            </li>
            <li>
              <Link href="/guides" passHref>
                <SideBarNavLink
                  color={router.pathname.includes('guides') ? 'active' : 'deactivate'}>
                  Guides
                </SideBarNavLink>
              </Link>
            </li>
            <li>
              <Link href="/help" passHref>
                <SideBarNavLink color={router.pathname.includes('help') ? 'active' : 'deactivate'}>
                  Help
                </SideBarNavLink>
              </Link>
            </li>
          </SideBarNavList>
        </Box>
        <Box></Box>
      </SideBar>
      <Box css={{ width: '100%', position: 'relative' }}>{children}</Box>
    </Box>
  );
}
