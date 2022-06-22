import copyToClipboard from 'copy-to-clipboard';
import { Portal } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { styled } from '@root/stitches.config';

// icons
import { QuestionMarkCircleIcon, DuplicateIcon } from '@heroicons/react/outline';

// components
import { Box, Button, H2, H3, Input } from '@components/core';

interface CreatePortalProps {
  portal: Portal;
  onClose: () => void;
}

const Form = styled('form', { width: '100%' });

const ThemeModeLabel = styled('label', {
  cursor: 'pointer',
  fontWeight: 'bold'
});

const PortalValueSection = styled(Box, {
  py: '34px',
  px: '40px',
  width: '100%',
  borderBottom: '1px solid $border'
});

const SectionName = styled(H3, {
  color: '$grey',
  fontSize: '16px',
  fontWeight: 'bold'
});

const ValueContainer = styled(Box, {
  flex: 1,
  px: '12px',
  py: '12px',
  border: 'none',
  outline: 'none',
  color: '$white',
  fontSize: '14px',
  fontWeight: 'bold',
  overflowX: 'scroll',
  whiteSpace: 'nowrap',
  borderRadius: '$sm',
  backgroundColor: '$darkGrey'
});

export function PortalEmbedDetailsForm({ portal, onClose }: CreatePortalProps) {
  const { handleSubmit } = useForm({});

  function onSubmit(data: any) {
    console.log({ submitData: data });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Box css={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          css={{
            px: '40px',
            width: '100%',
            display: 'flex',
            paddingTop: '80px',
            alignItems: 'center',
            paddingBottom: '50px',
            justifyContent: 'space-between',
            borderBottom: '1px solid $border'
          }}>
          <H2 css={{ fontSize: '36px' }}>Embed Portal</H2>
        </Box>
        {/* <Box css={{ width: '100%', py: '34px', px: '24px', borderBottom: '1px solid $border' }}>
          <Box
            css={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <Box
              css={{
                gap: '8px',
                px: '16px',
                color: '$grey',
                display: 'flex',
                alignItems: 'center'
              }}>
              <SectionName css={{ fontSize: '16px' }}>Contract Type</SectionName>
              <QuestionMarkCircleIcon width={16} height={16} cursor="pointer" />
            </Box>
            <Box css={{ display: 'flex', gap: '20px', px: '16px', mt: '20px' }}>
              <Box>
                <Input
                  type="radio"
                  id="themeDark"
                  name="themeMode"
                  value="dark"
                  hidden
                  {...register('themeMode')}
                />
                <ThemeModeLabel
                  htmlFor="themeDark"
                  css={{ color: watch('themeMode') === 'dark' ? '$white' : '$grey' }}>
                  Dark mode
                </ThemeModeLabel>
              </Box>
              <Box>
                <Input
                  type="radio"
                  id="themeLight"
                  name="themeMode"
                  value="light"
                  hidden
                  {...register('themeMode')}
                />
                <ThemeModeLabel
                  htmlFor="themeLight"
                  css={{ color: getValues('themeMode') === 'light' ? '$white' : '$grey' }}>
                  Light mode
                </ThemeModeLabel>
              </Box>
            </Box>
          </Box>
        </Box> */}
        <PortalValueSection
          css={{ width: '100%', py: '34px', px: '40px', borderBottom: '1px solid $border' }}>
          <Box
            css={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <Box
              css={{
                gap: '8px',
                color: '$grey',
                display: 'flex',
                alignItems: 'center'
              }}>
              <SectionName css={{ fontSize: '16px' }}>Token Gated Script</SectionName>
              <QuestionMarkCircleIcon width={16} height={16} cursor="pointer" />
            </Box>
            <Box css={{ display: 'flex', alignItems: 'center', gap: '8px', mt: 20 }}>
              <ValueContainer>{`<script src="https://finely.co/portal/${portal.id}"></script>`}</ValueContainer>
              <Button
                type="button"
                color="secondary"
                css={{ padding: '12px', backgroundColor: '$darkGrey' }}
                onClick={() =>
                  copyToClipboard(`<script src="https://finely.co/portal/${portal.id}"></script>`)
                }>
                <DuplicateIcon width={16} height={16} />
              </Button>
            </Box>
          </Box>
        </PortalValueSection>
        <PortalValueSection
          css={{ width: '100%', py: '34px', px: '40px', borderBottom: '1px solid $border' }}>
          <Box
            css={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <Box
              css={{
                gap: '8px',
                color: '$grey',
                display: 'flex',
                alignItems: 'center'
              }}>
              <SectionName css={{ fontSize: '16px' }}>Connect Button</SectionName>
              <QuestionMarkCircleIcon width={16} height={16} cursor="pointer" />
            </Box>
            <Box css={{ display: 'flex', alignItems: 'center', gap: '8px', mt: 20 }}>
              <ValueContainer css={{ flex: 'initial' }}>
                .{portal.connectButtonClassName}
              </ValueContainer>
              <Button
                type="button"
                color="secondary"
                css={{ padding: '12px', backgroundColor: '$darkGrey' }}
                onClick={() => copyToClipboard(`.${portal.connectButtonClassName}`)}>
                <DuplicateIcon width={16} height={16} />
              </Button>
            </Box>
          </Box>
        </PortalValueSection>
        <PortalValueSection
          css={{ width: '100%', py: '34px', px: '40px', borderBottom: '1px solid $border' }}>
          <Box
            css={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <Box
              css={{
                gap: '8px',
                color: '$grey',
                display: 'flex',
                alignItems: 'center'
              }}>
              <SectionName css={{ fontSize: '16px' }}>ENS/ETH Address Placeholder</SectionName>
              <QuestionMarkCircleIcon width={16} height={16} cursor="pointer" />
            </Box>
            <Box css={{ display: 'flex', alignItems: 'center', gap: '8px', mt: 20 }}>
              <ValueContainer css={{ flex: 'initial' }}>
                .{portal.walletAddressPlaceholderClassName}
              </ValueContainer>
              <Button
                type="button"
                color="secondary"
                css={{ padding: '12px', backgroundColor: '$darkGrey' }}
                onClick={() => copyToClipboard(`.${portal.walletAddressPlaceholderClassName}`)}>
                <DuplicateIcon width={16} height={16} />
              </Button>
            </Box>
          </Box>
        </PortalValueSection>
        <PortalValueSection
          css={{
            mt: 'auto',
            gap: '12px',
            display: 'flex'
          }}>
          <Button shape="rounded" type="submit">
            Done <span>→</span>
          </Button>
          <Button
            type="button"
            shape="rounded"
            color="secondary"
            css={{ backgroundColor: '$border' }}
            onClick={onClose}>
            Cancel
          </Button>
        </PortalValueSection>
      </Box>
    </Form>
  );
}
