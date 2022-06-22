import Image from 'next/image';
import { LinkIcon, BadgeCheckIcon } from '@heroicons/react/outline';

// components
import { Box, Button, H2, Text } from '@components/core';
import { styled } from '@root/stitches.config';

const CardContainer = styled(Box, {
  width: '100%',
  maxWidth: '960px',
  display: 'flex',
  overflow: 'hidden',
  borderRadius: '$md',
  alignItems: 'stretch',
  flexDirection: 'column',
  border: '1px solid $border',
  '@media (min-width: 900px)': {
    flexDirection: 'row'
  }
});

const NftImageContainer = styled(Box, {
  width: '100%',
  aspectRatio: '1/1',
  position: 'relative',
  '@lg': { maxWidth: '240px' }
});

const NftDetailsContainer = styled(Box, {
  display: 'flex',
  gap: '24px',
  padding: 16,
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  '@lg': {
    px: 24,
    py: 38
  },
  '@xl': {
    px: 26,
    py: 48
  }
});

const NftTopContainer = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  gap: 6,
  '@lg': { gap: 12 }
});

const MarketplaceButtonGroup = styled(Box, {
  display: 'flex',
  width: '100%',
  gap: '12px',
  flexWrap: 'wrap',
  flexDirection: 'column',
  '@lg': { flexDirection: 'row' }
});

const MarketplaceButton = styled(Button, {
  flexGrow: 1,
  width: '100%',
  justifyContent: 'center',
  flexBasis: 'fit-content'
});

export default function NftMembershipCard() {
  return (
    <CardContainer>
      {/* Nft Image */}
      <NftImageContainer>
        <Image
          layout="fill"
          src="https://ipfs.io/ipfs/QmUhCiKFwGTTkpjvDubFaHouFVVc5tigCJsez7MZWemccj/1.gif"
          objectFit="cover"
        />
      </NftImageContainer>

      <NftDetailsContainer>
        <NftTopContainer>
          <Box css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <H2 css={{ fontSize: '24px' }}>Finely Beta</H2>
            <BadgeCheckIcon width={24} height={24} color="rgb(103, 224, 220)" />
          </Box>
          <Text css={{ fontSize: '18px', color: '$grey' }}>Expired</Text>
        </NftTopContainer>

        <MarketplaceButtonGroup>
          <MarketplaceButton color="secondary" size="medium">
            View on Opensea
            <Box css={{ color: '$grey' }}>
              <LinkIcon width={16} height={16} />
            </Box>
          </MarketplaceButton>
          <MarketplaceButton color="secondary" size="medium">
            View on Rarible
            <Box css={{ color: '$grey' }}>
              <LinkIcon width={16} height={16} />
            </Box>
          </MarketplaceButton>
          <MarketplaceButton color="secondary" size="medium">
            View on Etherscan
            <Box css={{ color: '$grey' }}>
              <LinkIcon width={16} height={16} />
            </Box>
          </MarketplaceButton>
        </MarketplaceButtonGroup>
      </NftDetailsContainer>
    </CardContainer>
  );
}
