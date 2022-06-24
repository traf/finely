import { Portal, PortalMode, PortalRule } from '@prisma/client';
import { useForm } from 'react-hook-form';
import { styled } from '@root/stitches.config';
import * as SwitchPrimitive from '@radix-ui/react-switch';

// icons
import { TrashIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';

// components
import { Box, Button, H2, Text, Input } from '@components/core';
import { useMutationCreatePortal } from '../queries/useMutationCreatePortal';
import { useMutationUpdatePortal } from '../queries/useMutationUpdatePortal';
import { useMutationDeletePortal } from '../queries/useMutationDeletePortal';
import { isValidUrl } from '../helpers/isValidUrl';
import { Loader } from './Loader';
import { useEffect, useState } from 'react';

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
  redirectUrl: string;
  fallbackUrl: string;
  protectedUrl: string;
  mode: PortalMode;
  tokenType: TokenType;
  contractAddress: string;
}

const Form = styled('form', { width: '100%' });

const FormSection = styled(Box, {
  py: '34px',
  px: '24px',
  width: '100%',
  display: 'flex',
  position: 'relative',
  flexDirection: 'column',
  borderBottom: '1px solid $border'
});

const FormLabel = styled(Text, {
  color: '$grey',
  fontSize: '16px',
  fontWeight: '$bold'
});

const FormTextValueInput = styled(Input, {
  px: 16,
  py: 20,
  border: 'none',
  outline: 'none',
  color: '$white',
  fontSize: 18,
  fontWeight: 'bold',
  borderRadius: '$sm',
  backgroundColor: '$darkGrey'
});

const FormErrorText = styled(Text, {
  left: 36,
  bottom: 10,
  fontSize: '14px',
  color: '#f87171',
  position: 'absolute'
});

const TokenTypeLabel = styled('label', {
  cursor: 'pointer',
  fontWeight: 'bold'
});

const SwitchContainer = styled(SwitchPrimitive.Root, {
  all: 'unset',
  width: 42,
  height: 25,
  backgroundColor: '$darkGrey',
  borderRadius: '9999px',
  position: 'relative',
  // boxShadow: `0 2px 10px ${blackA.blackA7}`,
  WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
  '&:focus': { boxShadow: `0 0 0 2px black` },
  '&[data-state="checked"]': { backgroundColor: '$success' }
});

const SwitchThumb = styled(SwitchPrimitive.Thumb, {
  display: 'block',
  width: 21,
  height: 21,
  backgroundColor: '$white',
  borderRadius: '9999px',
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: 'translateX(19px)' }
});

function getDefaultValues({
  portal,
  rules,
  mode
}: {
  portal: Portal;
  rules: PortalRule[];
  mode: FormMode;
}): Partial<PortalFormValues> {
  if (mode === 'create') {
    return { tokenType: 'ERC20', mode: PortalMode.REGULAR };
  }

  return {
    id: portal.id,
    name: portal.name,
    mode: portal.mode,
    tokenType: rules[0].tokenType,
    redirectUrl: portal.redirectUrl || null,
    fallbackUrl: portal.fallbackPageUrl || null,
    protectedUrl: portal.protectedPageUrl || null,
    contractAddress: rules[0].contractAddress
  };
}

export function PortalForm({ portal, rules, mode, onClose }: PortalFormProps) {
  const defaultValues = getDefaultValues({ portal, rules, mode });
  const {
    watch,
    setValue,
    register,
    getValues,
    unregister,
    handleSubmit,
    formState: { errors }
  } = useForm<PortalFormValues>({ defaultValues, shouldUnregister: true });
  const portalId = watch('id');
  const portalMode = watch('mode');

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

  useEffect(() => {
    register('mode', { required: true });
  }, [register]);

  useEffect(() => {
    if (portalMode === PortalMode.ADVANCED) {
      unregister('protectedUrl');
      unregister('fallbackUrl');
      return;
    }

    unregister('redirectUrl');
  }, [portalMode]);

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
        {mode === 'edit' && portalId && (
          <Input type="hidden" {...register('id', { required: true })} />
        )}
        <FormSection>
          <FormLabel>Portal Name</FormLabel>
          <FormTextValueInput
            css={{ mt: 20 }}
            placeholder="Enter portal name"
            {...register('name', { required: true })}
          />
          <FormErrorText>
            {errors.name?.type === 'required' && `Portal name is required.`}
          </FormErrorText>
        </FormSection>
        <FormSection>
          <Box
            css={{
              gap: '8px',
              px: '16px',
              color: '$grey',
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormLabel>Token Type</FormLabel>
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
        </FormSection>
        <FormSection>
          <Box
            css={{
              gap: '8px',
              px: '16px',
              color: '$grey',
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormLabel>Token Contract Address</FormLabel>
            <QuestionMarkCircleIcon width={16} height={16} cursor="pointer" />
          </Box>
          <FormTextValueInput
            css={{ mt: 20 }}
            placeholder="0x8305...37B62"
            {...register('contractAddress', { pattern: /0x[a-fA-F0-9]{40}/g, required: true })}
          />
          <FormErrorText>
            {errors.contractAddress?.type === 'required' && `Contract address is required.`}
            {errors.contractAddress?.type === 'pattern' && `Contract address is invalid.`}
          </FormErrorText>
        </FormSection>
        <FormSection css={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
          <Box
            css={{
              gap: '8px',
              px: '16px',
              color: '$grey',
              display: 'flex',
              alignItems: 'center'
            }}>
            <FormLabel>Enable Server Side Gating</FormLabel>
            <QuestionMarkCircleIcon width={16} height={16} cursor="pointer" />
          </Box>
          <SwitchContainer
            value={portalMode}
            checked={portalMode === PortalMode.ADVANCED}
            onCheckedChange={(checked) =>
              setValue('mode', checked ? PortalMode.ADVANCED : PortalMode.REGULAR)
            }>
            <SwitchThumb />
          </SwitchContainer>
        </FormSection>
        {portalMode === PortalMode.ADVANCED && (
          <FormSection>
            <Box
              css={{
                gap: '8px',
                px: '16px',
                color: '$grey',
                display: 'flex',
                alignItems: 'center'
              }}>
              <FormLabel>Redirect URL</FormLabel>
              <QuestionMarkCircleIcon width={16} height={16} cursor="pointer" />
            </Box>
            <FormTextValueInput
              css={{ mt: 20 }}
              placeholder="https://domain.com/authenticate"
              {...register('redirectUrl', { validate: isValidUrl, required: true })}
            />
            <FormErrorText>
              {errors.redirectUrl?.type === 'required' && `Provide a redirect URL.`}
              {errors.redirectUrl?.type === 'validate' && `Invalid URL. It must be a valid URL.`}
            </FormErrorText>
          </FormSection>
        )}

        {portalMode === PortalMode.REGULAR && (
          <>
            <FormSection>
              <Box
                css={{
                  gap: '8px',
                  px: '16px',
                  color: '$grey',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <FormLabel>Gated URL</FormLabel>
                <QuestionMarkCircleIcon width={16} height={16} cursor="pointer" />
              </Box>
              <FormTextValueInput
                css={{ mt: 20 }}
                placeholder="https://domain.com/gated-page"
                {...register('protectedUrl', { validate: isValidUrl, required: true })}
              />
              <FormErrorText>
                {errors.protectedUrl?.type === 'required' && `Provide a gated URL.`}
                {errors.protectedUrl?.type === 'validate' && `Invalid URL. It must be a valid URL.`}
              </FormErrorText>
            </FormSection>
            <FormSection>
              <Box
                css={{
                  gap: '8px',
                  px: '16px',
                  color: '$grey',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                <FormLabel>Unauthorized Access URL Redirect</FormLabel>
                <QuestionMarkCircleIcon width={16} height={16} cursor="pointer" />
              </Box>
              <FormTextValueInput
                css={{ mt: 20 }}
                placeholder="domain.com/protected-page"
                {...register('fallbackUrl', { validate: isValidUrl, required: true })}
              />
              <FormErrorText>
                {errors.fallbackUrl?.type === 'required' && `Provide a fallback URL.`}
                {errors.fallbackUrl?.type === 'validate' && `Invalid URL. It must be a valid URL.`}
              </FormErrorText>
            </FormSection>
          </>
        )}

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
