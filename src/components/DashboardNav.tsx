import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { styled } from '@root/stitches.config';

// icons
import { MenuIcon, XIcon } from '@heroicons/react/outline';

// components
import { Box } from '@components/core';
import { useState } from 'react';
import { useEnsOrAddress } from '../hooks/useEnsOrAddress';

const NavContainer = styled(Box, {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  px: '40px',
  py: '30px',
  zIndex: '10',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$black',
  borderBottom: '1px solid $border',

  '@md': {
    width: 360,
    px: '32px',
    py: '80px',
    position: 'relative',
    top: 'auto',
    left: 'auto',
    minHeight: '100vh',
    borderRight: '1px solid $border'
  },

  '@lg': {
    px: '80px'
  }
});

const NavList = styled('ul', {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
  '@md': {
    gap: '40px'
  }
});

const NavLink = styled('a', {
  display: 'block',
  fontSize: '22px',
  lineHeight: '1',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '14px',
  variants: {
    color: {
      active: {
        color: '$white'
      },
      deactivate: {
        color: '$grey'
      }
    }
  },
  '@md': {
    padding: '0px'
  }
});

const SoonBadge = styled('span', {
  px: '10px',
  py: '8px',
  color: '$grey',
  lineHeight: '1',
  fontSize: '16px',
  borderRadius: '$pill',
  backgroundColor: '$border'
});

const links = [
  {
    name: 'Portals',
    href: '/portals',
    comingSoon: false
  },
  {
    name: 'Contracts',
    href: '/contracts',
    comingSoon: true
  },
  {
    name: 'Guides',
    href: '/guides',
    comingSoon: false
  },
  {
    name: 'Help',
    href: '/help',
    comingSoon: false
  }
];

export function DashboardNav() {
  const router = useRouter();
  const ensOrAddress = useEnsOrAddress();
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);

  return (
    <NavContainer>
      <Box css={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
        <Box css={{ display: 'flex', width: '40px', '@md': { width: '80px' } }}>
          <Box
            css={{
              position: 'relative',
              width: '100%',
              '@md': {
                width: 75,
                height: 36
              }
            }}>
            <Image layout="fill" objectFit="contain" src={`/logo.svg`} />
          </Box>
        </Box>
        <Box css={{ display: 'block', '@md': { display: 'none' } }}>
          <MenuIcon
            width={24}
            height={24}
            style={{ cursor: 'pointer' }}
            onClick={() => setIsMobileNavOpened(true)}
          />
        </Box>
      </Box>

      <Box css={{ display: 'none', flexDirection: 'column', flex: 1, '@md': { display: 'flex' } }}>
        <Box css={{ mt: 80 }}>
          <NavList>
            {links.map((link) => (
              <li key={link.name}>
                {link.comingSoon ? (
                  <Box css={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <NavLink color="deactivate" css={{ '&:hover': { color: '$grey' } }}>
                      {link.name}
                    </NavLink>
                    <SoonBadge>Soon</SoonBadge>
                  </Box>
                ) : (
                  <Link href={link.href} passHref>
                    <NavLink color={router.pathname.includes(link.href) ? 'active' : 'deactivate'}>
                      {link.name}
                    </NavLink>
                  </Link>
                )}
              </li>
            ))}
          </NavList>
        </Box>
        <Box css={{ mt: 'auto' }}>
          <Link href="/" passHref>
            <NavLink color={router.pathname === '/' ? 'active' : 'deactivate'}>
              {ensOrAddress}
            </NavLink>
          </Link>
        </Box>
      </Box>

      {isMobileNavOpened && (
        <>
          <Box
            css={{
              position: 'absolute',
              width: '100%',
              px: '24px',
              py: '24px',
              top: 0,
              left: 0
            }}>
            <Box
              css={{
                backgroundColor: '$offBlack',
                px: '14px',
                py: '16px',
                borderRadius: '$md',
                position: 'relative'
              }}>
              <Box css={{ position: 'absolute', zIndex: '1', right: '28px', top: '28px' }}>
                <XIcon
                  width={24}
                  height={24}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setIsMobileNavOpened(false)}
                />
              </Box>
              <Box css={{ '@md': { mt: 80 } }}>
                <NavList>
                  {links.map((link) => (
                    <li key={link.name}>
                      {link.comingSoon ? (
                        <NavLink
                          color="deactivate"
                          css={{
                            display: 'flex',
                            gap: '14px',
                            alignItems: 'center',
                            '&:hover': { color: '$grey' }
                          }}>
                          {link.name}
                          <SoonBadge>Soon</SoonBadge>
                        </NavLink>
                      ) : (
                        <Link href={link.href} passHref>
                          <NavLink
                            color={router.pathname.includes(link.href) ? 'active' : 'deactivate'}>
                            {link.name}
                          </NavLink>
                        </Link>
                      )}
                    </li>
                  ))}
                </NavList>
              </Box>
              <Box css={{ mt: '40px' }}>
                <Link href="/" passHref>
                  <NavLink color={router.pathname === '/' ? 'active' : 'deactivate'}>
                    {ensOrAddress}
                  </NavLink>
                </Link>
              </Box>
            </Box>
          </Box>
        </>
      )}
    </NavContainer>
  );
}
