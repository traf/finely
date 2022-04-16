import { styled } from '@root/stitches.config';

// components
import { Box } from '@components/core/Box';

const Title = styled('h1', {
  fontSize: '68px'
});

export default function Home() {
  return (
    <Box
      css={{
        width: '100%',
        height: '600px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Title css={{ maxWidth: '800px', textAlign: 'center' }}>
        Token-gate any website with one line of code
      </Title>
    </Box>
  );
}
