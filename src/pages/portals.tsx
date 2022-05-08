import { useState } from 'react';
import { styled } from '@root/stitches.config';
import { AnimatePresence } from 'framer-motion';
import { PlusSmIcon, CodeIcon, PencilAltIcon } from '@heroicons/react/outline';

// libs
import { withSessionSsr } from '@lib/iron';

// components
import { Box, H1, H2, Button } from '@components/core';
import { DashboardLayout } from '@components/layout/DashboardLayout';
import { SideContainerSection } from '@components/SideContainerSection';
import { PortalForm } from '@components/PortalForm';
import { PortalEmbedDetailsForm } from '@components/PortalEmbedDetailsForm';

const fakePortals: any = [
  {
    id: '123',
    name: 'Anti Collective',
    contractType: 'erc721',
    contractAddress: '0x123',
    fallbackUrl: 'anti-collective.com',
    protectedUrl: 'anti-collective.com/fallback'
  },
  {
    id: '456',
    name: 'Finely Demo',
    contractType: 'erc20',
    contractAddress: '0x123',
    fallbackUrl: 'anti-collective.com',
    protectedUrl: 'anti-collective.com/fallback'
  }
];

const PortalItem = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  px: '$5',
  py: '$8',
  gap: 20,
  borderRadius: '$sm',
  backgroundColor: '$offBlack',

  '@md': {
    px: '$10',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

type PortalAction = 'create' | 'edit' | 'view';

export default function Portals() {
  const [portals, setPortals] = useState(fakePortals);
  const [sideContainerOpen, setSideContainerOpen] = useState(false);
  const [selectedPortal, setSelectedPortal] = useState(null);
  const [action, setAction] = useState<PortalAction>(null);

  function onCreatePortal() {
    setAction('create');
    setSideContainerOpen(true);
  }

  function onEditPortal(portal: any) {
    setAction('edit');
    setSelectedPortal(portal);
    setSideContainerOpen(true);
  }

  function onOpenEmbedDetails(portal: any) {
    setAction('view');
    setSelectedPortal(portal);
    setSideContainerOpen(true);
  }

  let actionComponent;
  if (action === 'create') {
    actionComponent = <PortalForm mode="create" onClose={() => setSideContainerOpen(false)} />;
  } else if (action === 'edit') {
    actionComponent = (
      <PortalForm mode="edit" portal={selectedPortal} onClose={() => setSideContainerOpen(false)} />
    );
  } else if (action === 'view') {
    actionComponent = <PortalEmbedDetailsForm onClose={() => setSideContainerOpen(false)} />;
  }

  return (
    <DashboardLayout>
      <Box css={{ width: '100%', px: 80, paddingTop: 80, mx: 'auto' }}>
        <Box
          css={{
            width: '100%',
            display: 'flex',
            marginBottom: 70,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <H1 css={{ fontSize: '36px', marginBottom: 0 }}>Portals</H1>
          <Button shape="rounded" onClick={onCreatePortal}>
            New Portal <PlusSmIcon width={24} height={24} />
          </Button>
        </Box>
        <Box css={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '24px' }}>
          {portals.map((portal: any) => (
            <PortalItem key={portal.name}>
              <Box>
                <H2 css={{ fontSize: '24px' }}>{portal.name}</H2>
              </Box>
              <Box css={{ display: 'flex', gap: '12px' }}>
                <Button
                  color="secondary"
                  css={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
                  onClick={onOpenEmbedDetails}>
                  Embed
                  <CodeIcon style={{ maxWidth: 'none' }} width={20} height={20} />
                </Button>
                <Button
                  color="secondary"
                  css={{ backgroundColor: 'rgba(255, 255, 255, 0.04)' }}
                  onClick={() => onEditPortal(portal)}>
                  Edit
                  <PencilAltIcon style={{ maxWidth: 'none' }} width={20} height={20} />
                </Button>
              </Box>
            </PortalItem>
          ))}
        </Box>
      </Box>
      <AnimatePresence>
        {sideContainerOpen && (
          <SideContainerSection
            key="side-container-section"
            onClose={() => setSideContainerOpen(false)}>
            {actionComponent}
          </SideContainerSection>
        )}
      </AnimatePresence>
    </DashboardLayout>
  );
}

// export const getServerSideProps = withSessionSsr(async function getServerSideProps({ req }) {
//   const user = req.session.siwe;

//   if (!user) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: true
//       }
//     };
//   }

//   return {
//     props: {}
//   };
// });

export const getServerSideProps = async function getServerSideProps() {
  return {
    props: {}
  };
};
