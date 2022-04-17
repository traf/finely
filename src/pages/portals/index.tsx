import { useState } from 'react';
import { styled } from '@root/stitches.config';
import { PlusSmIcon } from '@heroicons/react/outline';

// components
import { Box } from '@components/core';
import { PrimaryButton } from '@components/core/Button';
import { MainLayout } from '@components/layout/MainLayout';

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

const PortalItemsList = styled('div', {
  gap: '$5',
  display: 'flex',
  flexDirection: 'column'
});

const PortalItem = styled('div', {
  px: '$5',
  py: '$8',
  gap: '$5',
  display: 'flex',
  borderRadius: '8px',
  flexDirection: 'column',
  backgroundColor: '#161616',
  '@md': {
    px: '$10',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

const PortalItemSection = styled('div', {
  gap: '$4',
  width: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const PortalItemSectionName = styled('h3', {
  fontSize: '18px',
  color: '$accentText'
});

const PortalItemSectionContent = styled('div', {
  width: '100%'
});

const PortalName = styled('h2', {
  fontSize: '24px'
});

const PageTitle = styled('h1', {
  fontSize: '48px',
  marginBottom: '$17'
});

const PortalCopyValueInput = styled('input', {
  px: '$3',
  py: '$3',
  margin: 0,
  width: '100%',
  border: 'none',
  color: '$text',
  fontSize: '14px',
  fontWeight: '600',
  borderRadius: '8px',
  backgroundColor: '#222222'
});

const AddPortalIcon = styled(PlusSmIcon, {
  width: '24px',
  height: '24px'
});

export default function () {
  const [portals, setPortals] = useState(fakePortals);
  return (
    <MainLayout>
      <Box css={{ maxWidth: '90%', width: '1280px', margin: '60px auto 0' }}>
        <Box css={{ display: 'flex', justifyContent: 'space-between' }}>
          <PageTitle>Portals</PageTitle>
          <PrimaryButton>
            New Portal <AddPortalIcon />
          </PrimaryButton>
        </Box>
        <PortalItemsList>
          {portals.map((portal) => (
            <PortalItem key={portal.name}>
              {/* Portal name */}
              <PortalItemSection>
                <PortalItemSectionName>Name</PortalItemSectionName>
                <PortalItemSectionContent>
                  <PortalName>{portal.name}</PortalName>
                </PortalItemSectionContent>
              </PortalItemSection>

              {/* Portal script */}
              <PortalItemSection>
                <PortalItemSectionName>Script</PortalItemSectionName>
                <PortalItemSectionContent>
                  <PortalCopyValueInput readOnly={true} value={portal.scriptTag} />
                </PortalItemSectionContent>
              </PortalItemSection>

              {/* Portal Connect button ID */}
              <PortalItemSection>
                <PortalItemSectionName>Connect Button ID</PortalItemSectionName>
                <PortalItemSectionContent>
                  <PortalCopyValueInput readOnly={true} value={portal.connectButtonId} />
                </PortalItemSectionContent>
              </PortalItemSection>
            </PortalItem>
          ))}
        </PortalItemsList>
      </Box>
    </MainLayout>
  );
}
