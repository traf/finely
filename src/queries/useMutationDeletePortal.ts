import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';

import { api } from '@lib/axios';

interface DeletePortalResponse {
  ok: boolean;
}

interface DeletePortalParams {
  portalId: string;
}

async function fetcher({ portalId }: DeletePortalParams) {
  const response = await api({
    method: 'DELETE',
    url: `/account/portals/${portalId}/delete`
  });

  return response.data;
}

export function useMutationDeletePortal(
  options: UseMutationOptions<DeletePortalResponse, Error, DeletePortalParams> = {}
) {
  const queryClient = useQueryClient();
  return useMutation<DeletePortalResponse, Error, DeletePortalParams>(fetcher, {
    onSettled: (...args) => {
      if (options.onSettled) options.onSettled(...args);
      queryClient.invalidateQueries('useQueryGetPortals');
    },
    ...options
  });
}
