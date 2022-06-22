import { Portal, PortalRule } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { styled } from '@root/stitches.config';

// icons
import { TrashIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';

// components
import { Box, Button, H2, Text, Input } from '@components/core';
import { useMutationCreatePortal } from '../queries/useMutationCreatePortal';
import { useMutationUpdatePortal } from '../queries/useMutationUpdatePortal';
import { useMutationDeletePortal } from '../queries/useMutationDeletePortal';
import { isValidUrl } from '../helpers/isValidUrl';
import { Loader } from './Loader';

export type FormMode = 'create' | 'edit';
export type TokenType = 'ERC20' | 'ERC721' | 'ERC1155';

interface PortalFormProps {
  mode: FormMode;
  portal?: Portal;
  rules?: PortalRule[];
  onClose: () => void;
}

interface PortalFormValues {
  id: string;
  name: string;
  tokenType: TokenType;
  contractAddress: string;
  fallbackUrl: string;
  protectedUrl: string;
}

const Form = styled('form', { width: '100%' });

const TokenTypeLabel = styled('label', {
  cursor: 'pointer',
  fontWeight: 'bold'
});

export function PortalForm({ portal, rules, mode, onClose }: PortalFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors }
  } = useForm<PortalFormValues>({
    ...(mode === 'edit'
      ? {
          defaultValues: {
            id: portal.id,
            name: portal.name,
            tokenType: rules[0].tokenType,
            fallbackUrl: portal.fallbackPageUrl,
            protectedUrl: portal.protectedPageUrl,
            contractAddress: rules[0].contractAddress
          }
        }
      : { defaultValues: { tokenType: 'ERC20' } })
  });

  const createPortalMutation = useMutationCreatePortal({
    onSuccess: () => {
      onClose();
    }
  });
  const updatePortalMutation = useMutationUpdatePortal({
    onSuccess: () => {
      onClose();
    }
  });

  const deletePortalMutation = useMutationDeletePortal({
    onSuccess: () => {
      onClose();
    }
  });

  function onSubmit(portal: any) {
    if (mode === 'create') {
      createPortalMutation.mutate({ portal });
      return;
    }

    updatePortalMutation.mutate({ portal });
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
              onClick={() => deletePortalMutation.mutate({ portalId: portal.id })}
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
              position: 'relative',
              flexDirection: 'column'
            }}>
            <Text css={{ fontSize: '16px', color: '$grey', px: '16px' }}>Portal Name</Text>
            <Input
              placeholder="Enter portal name"
              {...register('name', { required: true })}
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
            <Text
              css={{
                left: '16px',
                bottom: '-24px',
                fontSize: '14px',
                color: '#f87171',
                position: 'absolute'
              }}>
              {errors.name?.type === 'required' && `Portal name is required.`}
            </Text>
          </Box>
        </Box>
        <Box css={{ width: '100%', py: '34px', px: '24px', borderBottom: '1px solid $border' }}>
          <Box
            css={{
              width: '100%',
              display: 'flex',
              position: 'relative',
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
              <Text css={{ fontSize: '16px' }}>Token Type</Text>
              <QuestionMarkCircleIcon width={16} height={16} cursor="pointer" />
            </Box>
            <Box css={{ display: 'flex', gap: '20px', px: '16px', mt: '20px' }}>
              <Box>
                <Input
                  type="radio"
                  id="erc20"
                  name="tokenType"
                  value="ERC20"
                  hidden
                  {...register('tokenType', { required: true })}
                />
                <TokenTypeLabel
                  htmlFor="erc20"
                  css={{ color: watch('tokenType') === 'ERC20' ? '$white' : '$grey' }}>
                  ERC-20
                </TokenTypeLabel>
              </Box>
              <Box>
                <Input
                  type="radio"
                  id="erc721"
                  name="tokenType"
                  value="ERC721"
                  hidden
                  {...register('tokenType', { required: true })}
                />
                <TokenTypeLabel
                  htmlFor="erc721"
                  css={{ color: getValues('tokenType') === 'ERC721' ? '$white' : '$grey' }}>
                  ERC-721
                </TokenTypeLabel>
              </Box>
              <Box>
                <Input
                  type="radio"
                  id="erc1155"
                  name="tokenType"
                  value="ERC1155"
                  hidden
                  {...register('tokenType', { required: true })}
                />
                <TokenTypeLabel
                  htmlFor="erc1155"
                  css={{ color: getValues('tokenType') === 'ERC1155' ? '$white' : '$grey' }}>
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
              position: 'relative',
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
              {...register('contractAddress', { pattern: /0x[a-fA-F0-9]{40}/g, required: true })}
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
            <Text
              css={{
                left: '16px',
                bottom: '-24px',
                fontSize: '14px',
                color: '#f87171',
                position: 'absolute'
              }}>
              {errors.contractAddress?.type === 'required' && `Contract address is required.`}
              {errors.contractAddress?.type === 'pattern' && `Contract address is invalid.`}
            </Text>
          </Box>
        </Box>
        <Box css={{ width: '100%', py: '34px', px: '24px', borderBottom: '1px solid $border' }}>
          <Box
            css={{
              width: '100%',
              display: 'flex',
              position: 'relative',
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
              <Input
                placeholder="https://domain.com/gated-page"
                {...register('protectedUrl', { validate: isValidUrl, required: true })}
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
            <Text
              css={{
                left: '16px',
                bottom: '-24px',
                fontSize: '14px',
                color: '#f87171',
                position: 'absolute'
              }}>
              {errors.protectedUrl?.type === 'required' && `Provide a gated URL.`}
              {errors.protectedUrl?.type === 'validate' &&
                `Invalid URL. It must be a valid https URL.`}
            </Text>
          </Box>
        </Box>
        <Box css={{ width: '100%', py: '34px', px: '24px', borderBottom: '1px solid $border' }}>
          <Box
            css={{
              width: '100%',
              display: 'flex',
              position: 'relative',
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
              <Input
                placeholder="domain.com/protected-page"
                {...register('fallbackUrl', { validate: isValidUrl, required: true })}
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
            <Text
              css={{
                left: '16px',
                bottom: '-24px',
                fontSize: '14px',
                color: '#f87171',
                position: 'absolute'
              }}>
              {errors.fallbackUrl?.type === 'required' && `Provide a fallback URL.`}
              {errors.fallbackUrl?.type === 'validate' &&
                `Invalid URL. It must be a valid https URL.`}
            </Text>
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
            alignItems: 'center',
            borderBottom: '1px solid $border'
          }}>
          <Button shape="rounded" type="submit">
            {mode === 'create' ? 'Create' : 'Update'}
          </Button>
          <Button
            type="button"
            shape="rounded"
            color="secondary"
            css={{ backgroundColor: '$border' }}
            onClick={onClose}>
            Cancel
          </Button>

          {(createPortalMutation.isLoading ||
            updatePortalMutation.isLoading ||
            deletePortalMutation.isLoading) && <Loader />}
        </Box>
      </Box>
    </Form>
  );
}
