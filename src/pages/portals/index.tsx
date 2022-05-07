import { useState } from 'react';
import { styled } from '@root/stitches.config';
import { PlusSmIcon } from '@heroicons/react/outline';

// libs
import { withSessionSsr } from '@lib/iron';

// components
import { MainLayout } from '@components/layout/MainLayout';
import { Box, PrimaryButton, H1, H2, H3 } from '@components/core';

const fakePortals = [
  {
    name: 'Anti Collective',
    scriptTag: '<script src="https://opensea.io"></script>',
    connectButtonId: '#finely-connect'
  },
  {
    name: 'Finely Demo',
    scriptTag: '<script src="https://opensea.io"></script>',
    connectButtonId: '#finely-connect'
  }
];

const PortalItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  px: '$5',
  py: '$8',
  gap: 20,
  borderRadius: '$sm',
  backgroundColor: '$offBlack',

  '@md': {
    px: '$10',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const PortalItemColumn = styled('div', {
  gap: '$4',
  width: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const PortalItemColumnTitle = styled(H3, {
  fontSize: '24px',
  color: '$offWhite'
});

const PortalItemInput = styled('input', {
  margin: 0,
  padding: '$3',
  width: '100%',
  border: 'none',
  color: '$white',
  fontSize: '14px',
  borderRadius: '8px',
  fontWeight: 'semibold',
  backgroundColor: '$border'
});

export default function Portals() {
  const [portals, setPortals] = useState(fakePortals);
  return (
    <MainLayout>
      <Box css={{ maxWidth: '90%', width: '1280px', marginTop: 60, mx: 'auto' }}>
        <Box
          css={{
            display: 'flex',
            marginBottom: 70,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <H1 css={{ fontSize: '48px', marginBottom: 0 }}>Portals</H1>
          <PrimaryButton css={{ py: '12px' }}>
            New Portal{' '}
            <span style={{ width: 24, height: 24 }}>
              <PlusSmIcon />
            </span>
          </PrimaryButton>
        </Box>
        <Box css={{ display: 'flex', flexDirection: 'column', gap: '$10' }}>
          {portals.map((portal) => (
            <PortalItem key={portal.name}>
              {/* Portal name */}
              <PortalItemColumn>
                <PortalItemColumnTitle>Name</PortalItemColumnTitle>
                <Box css={{ width: '100%' }}>
                  <H2 css={{ fontSize: '28px' }} className="text-2xl">
                    {portal.name}
                  </H2>
                </Box>
              </PortalItemColumn>

              {/* Portal script */}
              <PortalItemColumn>
                <PortalItemColumnTitle>Script</PortalItemColumnTitle>
                <Box css={{ width: '100%' }}>
                  <PortalItemInput readOnly={true} value={portal.scriptTag} />
                </Box>
              </PortalItemColumn>

              {/* Portal Connect button ID */}
              <PortalItemColumn>
                <PortalItemColumnTitle>Connect Button ID</PortalItemColumnTitle>
                <Box css={{ width: '100%' }}>
                  <PortalItemInput readOnly={true} value={portal.connectButtonId} />
                </Box>
              </PortalItemColumn>
            </PortalItem>
          ))}
        </Box>
      </Box>
    </MainLayout>
  );
}

export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session.siwe;

  if (!user) {
    return {
      redirect: {
        destination: '/',
        permanent: true
      }
    };
  }

  return {
    props: {}
  };
});
