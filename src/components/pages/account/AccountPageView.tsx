// context
import { useUserContext } from '@root/src/context/UserContext';

// hooks
import { useEnsOrAddress } from '@hooks/useEnsOrAddress';

// components
import { Box, Button, H1 } from '@components/core';
import NftMembershipCard from '@components/NftMembershipCard';

export function AccountPageView() {
  const { logout } = useUserContext();
  const ensOrAddress = useEnsOrAddress();

  return (
    <Box
      css={{
        width: '100%',
        px: 36,
        paddingTop: 36,
        mx: 'auto',
        '@lg': {
          px: 80,
          py: 80
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
        <H1 css={{ fontSize: '36px', marginBottom: 0 }}>{ensOrAddress}</H1>
        <Box css={{ display: 'flex', gap: '12px' }}>
          <Button shape="rounded" color="secondary" onClick={() => logout()}>
            Disconnect
          </Button>
        </Box>
      </Box>

      <Box
        css={{
          gap: 48,
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
        <NftMembershipCard />
        <NftMembershipCard />
        <NftMembershipCard />
      </Box>
    </Box>
  );
}
