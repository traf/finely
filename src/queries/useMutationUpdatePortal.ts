import { Portal } from '@prisma/client';
import { useMutation, UseMutationOptions, useQueryClient } from 'react-query';

import { api } from '@lib/axios';

interface UpdatePortalResponse {
  portal: any;
}

interface UpdatePortalParams {
  portal: Portal;
}

async function fetcher({ portal }: UpdatePortalParams) {
  const response = await api({
    method: 'PATCH',
    url: `/account/portals/${portal.id}/update`,
    data: { portal }
  });

  return response.data;
}

export function useMutationUpdatePortal(
  options: UseMutationOptions<UpdatePortalResponse, Error, UpdatePortalParams> = {}
) {
  const queryClient = useQueryClient();
  return useMutation<UpdatePortalResponse, Error, UpdatePortalParams>(fetcher, {
    onSettled: (...args) => {
      if (options.onSettled) options.onSettled(...args);
      queryClient.invalidateQueries('useQueryGetPortals');
    },
    ...options
  });
}
