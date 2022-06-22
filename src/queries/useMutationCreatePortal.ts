import { Portal } from '@prisma/client';
import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';

import { api } from '@lib/axios';

interface CreatePortalResponse {
  portal: any;
}

interface CreatePortalParams {
  portal: any;
}

export function useMutationCreatePortal(
  options: UseMutationOptions<CreatePortalResponse, Error, CreatePortalParams> = {}
) {
  const queryClient = useQueryClient();
  async function fetcher({ portal }: CreatePortalParams) {
    const response = await api({
      method: 'POST',
      url: `/account/portals/create`,
      data: { portal }
    });

    return response.data;
  }

  return useMutation<CreatePortalResponse, Error, CreatePortalParams>(fetcher, {
    onSettled: (...args) => {
      if (options.onSettled) options.onSettled(...args);
      queryClient.invalidateQueries('useQueryGetPortals');
    },
    ...options
  });
}
