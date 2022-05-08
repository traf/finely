import { useForm } from 'react-hook-form';
import { styled } from '@root/stitches.config';

// icons
import { TrashIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';

// components
import { Box, Button, H2, Text, Input } from '@components/core';

export type FormMode = 'create' | 'edit';
export type ContractType = 'erc20' | 'erc721' | 'erc1155';

interface CreatePortalProps {
  mode: FormMode;
  portal?: {
    id: string;
    name: string;
    contractType: ContractType;
    contractAddress: string;
    fallbackUrl: string;
    protectedUrl: string;
  };
  onClose: () => void;
}

const Form = styled('form', { width: '100%' });

const TokenTypeLabel = styled('label', {
  cursor: 'pointer',
  fontWeight: 'bold'
});

export function PortalForm({ portal, mode, onClose }: CreatePortalProps) {
  const { register, handleSubmit, watch, getValues } = useForm({
    ...(mode === 'edit' ? { defaultValues: portal } : { defaultValues: { contractType: 'erc20' } })
  });

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
          <H2 css={{ fontSize: '36px' }}>{mode === 'edit' ? 'Edit' : 'Create'} Portal</H2>
          {mode === 'edit' && (
            <Button
              type="button"
              css={{ padding: '12px', backgroundColor: '$border', color: '$error' }}>
              <TrashIcon width={24} height={24} />
            </Button>
          )}
        </Box>
        <Box css={{ width: '100%', py: '34px', px: '24px', borderBottom: '1px solid $border' }}>
          <Box
            css={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
            <Text css={{ fontSize: '16px', color: '$grey', px: '16px' }}>Portal Name</Text>
            <Input
              placeholder="Enter portal name"
              {...register('name')}
              css={{
                mt: 20,
                px: '16px',
                py: '20px',
                border: 'none',
                outline: 'none',
                color: '$white',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: '$sm',
                backgroundColor: '$darkGrey'
              }}
            />
          </Box>
        </Box>
        <Box css={{ width: '100%', py: '34px', px: '24px', borderBottom: '1px solid $border' }}>
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
              <Text css={{ fontSize: '16px' }}>Contract Type</Text>
              <QuestionMarkCircleIcon width={16} height={16} cursor="pointer" />
            </Box>
            <Box css={{ display: 'flex', gap: '20px', px: '16px', mt: '20px' }}>
              <Box>
                <Input
                  type="radio"
                  id="erc20"
                  name="contractType"
                  value="erc20"
                  hidden
                  {...register('contractType')}
                />
                <TokenTypeLabel
                  htmlFor="erc20"
                  css={{ color: watch('contractType') === 'erc20' ? '$white' : '$grey' }}>
                  ERC-20
                </TokenTypeLabel>
              </Box>
              <Box>
                <Input
                  type="radio"
                  id="erc721"
                  name="contractType"
                  value="erc721"
                  hidden
                  {...register('contractType')}
                />
                <TokenTypeLabel
                  htmlFor="erc721"
                  css={{ color: getValues('contractType') === 'erc721' ? '$white' : '$grey' }}>
                  ERC-721
                </TokenTypeLabel>
              </Box>
              <Box>
                <Input
                  type="radio"
                  id="erc1155"
                  name="contractType"
                  value="erc1155"
                  hidden
                  {...register('contractType')}
                />
                <TokenTypeLabel
                  htmlFor="erc1155"
                  css={{ color: getValues('contractType') === 'erc1155' ? '$white' : '$grey' }}>
                  ERC-1155
                </TokenTypeLabel>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box css={{ width: '100%', py: '34px', px: '24px', borderBottom: '1px solid $border' }}>
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
              <Text css={{ fontSize: '16px' }}>Token Contract Address</Text>
              <QuestionMarkCircleIcon width={16} height={16} cursor="pointer" />
            </Box>
            <Input
              placeholder="0x8305...37B62"
              {...register('contractAddress')}
              css={{
                mt: 20,
                px: '16px',
                py: '20px',
                border: 'none',
                outline: 'none',
                color: '$white',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: '$sm',
                backgroundColor: '$darkGrey'
              }}
            />
          </Box>
        </Box>
        <Box css={{ width: '100%', py: '34px', px: '24px', borderBottom: '1px solid $border' }}>
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
              <Text css={{ fontSize: '16px' }}>Gated URL</Text>
              <QuestionMarkCircleIcon width={16} height={16} cursor="pointer" />
            </Box>
            <Box
              css={{
                mt: 20,
                px: '16px',
                py: '20px',
                display: 'flex',
                border: 'none',
                outline: 'none',
                color: '$white',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: '$sm',
                backgroundColor: '$darkGrey'
              }}>
              <span>https://</span>
              <Input
                placeholder="domain.com/protected-page"
                {...register('protectedUrl')}
                css={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  color: '$white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  backgroundColor: 'transparent'
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box css={{ width: '100%', py: '34px', px: '24px', borderBottom: '1px solid $border' }}>
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
              <Text css={{ fontSize: '16px' }}>Unauthorized Access URL Redirect</Text>
              <QuestionMarkCircleIcon width={16} height={16} cursor="pointer" />
            </Box>
            <Box
              css={{
                mt: 20,
                px: '16px',
                py: '20px',
                display: 'flex',
                border: 'none',
                outline: 'none',
                color: '$white',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: '$sm',
                backgroundColor: '$darkGrey'
              }}>
              <span>https://</span>
              <Input
                placeholder="domain.com/protected-page"
                {...register('fallbackUrl')}
                css={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  color: '$white',
                  fontSize: '18px',
                  fontWeight: 'bold',
                  backgroundColor: 'transparent'
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          css={{
            py: '34px',
            px: '24px',
            mt: 'auto',
            gap: '12px',
            width: '100%',
            display: 'flex',
            borderBottom: '1px solid $border'
          }}>
          <Button shape="rounded" type="submit">
            Create
          </Button>
          <Button
            type="button"
            shape="rounded"
            color="secondary"
            css={{ backgroundColor: '$border' }}
            onClick={onClose}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Form>
  );
}
