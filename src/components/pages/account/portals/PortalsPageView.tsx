import { useState } from 'react';
import { Prisma } from '@prisma/client';
import { styled } from '@root/stitches.config';
import { AnimatePresence } from 'framer-motion';
import { PlusSmIcon, CodeIcon, PencilAltIcon } from '@heroicons/react/outline';

// queries
import { useQueryGetPortals } from '@root/src/queries/useQueryGetPortals';

// components
import { Loader } from '@components/Loader';
import { PortalForm } from '@components/PortalForm';
import { Box, H1, H2, Button, Text } from '@components/core';
import { SideContainerSection } from '@components/SideContainerSection';
import { PortalEmbedDetailsForm } from '@components/PortalEmbedDetailsForm';

const PortalItem = styled('div', {
  gap: 20,
  px: '20px',
  py: '32px',
  width: '100%',
  display: 'flex',
  borderRadius: '$sm',
  flexDirection: 'column',
  backgroundColor: '$offBlack',
  '@md': {
    px: '40px',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

type PortalAction = 'create' | 'edit' | 'view';

function ActionView({
  action,
  portal,
  onClose
}: {
  onClose: () => void;
  action: PortalAction;
  portal: Prisma.PortalGetPayload<{ include: { rules: true } }>;
}) {
  switch (action) {
    case 'create': {
      return <PortalForm mode="create" onClose={onClose} />;
    }
    case 'edit': {
      return <PortalForm mode="edit" portal={portal} rules={portal.rules} onClose={onClose} />;
    }
    case 'view': {
      return <PortalEmbedDetailsForm portal={portal} onClose={onClose} />;
    }
    default: {
      return null;
    }
  }
}

export function PortalsPageView() {
  const [selectedPortal, setSelectedPortal] =
    useState<Prisma.PortalGetPayload<{ include: { rules: true } }>>(null);
  const [sideContainerOpen, setSideContainerOpen] = useState(false);

  const [action, setAction] = useState<PortalAction>(null);

  const { data: portals, isLoading: isLoadingPortals } = useQueryGetPortals();

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

  return (
    <>
      <Box
        css={{
          width: '100%',
          px: 24,
          paddingTop: 80,
          mx: 'auto',
          '@md': {
            px: 80
          }
        }}>
        <Box
          css={{
            width: '100%',
            display: 'flex',
            marginBottom: 70,
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
          <H1 css={{ fontSize: '36px', marginBottom: 0 }}>Portals</H1>
          <Button size="medium" shape="rounded" onClick={onCreatePortal}>
            New Portal <PlusSmIcon width={24} height={24} />
          </Button>
        </Box>
        {isLoadingPortals ? (
          <Box
            css={{
              width: '100%',
              height: '300px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <Loader size={58} />
          </Box>
        ) : portals.length ? (
          <Box css={{ display: 'flex', width: '100%', flexDirection: 'column', gap: '24px' }}>
            {portals.map((portal) => (
              <PortalItem key={portal.id}>
                <Box>
                  <H2 css={{ fontSize: '24px' }}>{portal.name}</H2>
                </Box>
                <Box
                  css={{
                    display: 'flex',
                    gap: '12px',
                    width: '100%',
                    flexWrap: 'wrap',
                    '@md': { width: 'auto' }
                  }}>
                  <Button
                    color="secondary"
                    css={{
                      flexGrow: 1,
                      flexBasis: 'fit-content',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }}
                    onClick={() => onOpenEmbedDetails(portal)}>
                    Embed
                    <CodeIcon style={{ maxWidth: 'none' }} width={20} height={20} />
                  </Button>
                  <Button
                    color="secondary"
                    css={{
                      flexGrow: 1,
                      flexBasis: 'fit-content',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }}
                    onClick={() => onEditPortal(portal)}>
                    Edit
                    <PencilAltIcon style={{ maxWidth: 'none' }} width={20} height={20} />
                  </Button>
                </Box>
              </PortalItem>
            ))}
          </Box>
        ) : (
          <Box
            css={{
              width: '100%',
              px: 16,
              py: 24,
              borderRadius: '$md',
              backgroundColor: '$offBlack'
            }}>
            <Text css={{ fontSize: '16px' }}>You don't have any portals.</Text>
          </Box>
        )}
      </Box>
      <AnimatePresence>
        {sideContainerOpen && (
          <SideContainerSection
            key="side-container-section"
            onClose={() => setSideContainerOpen(false)}>
            <ActionView
              {...{ action, onClose: () => setSideContainerOpen(false), portal: selectedPortal }}
            />
          </SideContainerSection>
        )}
      </AnimatePresence>
    </>
  );
}
