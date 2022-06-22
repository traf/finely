import { useQuery, UseQueryOptions } from 'react-query';

import { api } from '@lib/axios';
import { Portal } from '@prisma/client';

export function useQueryGetPortals(options: UseQueryOptions<Portal[], Error> = {}) {
  async function fetcher() {
    const { data } = await api({
      method: 'GET',
      url: `account/portals`
    });

    return data.portals;
  }

  return useQuery<Portal[], Error>(['useQueryGetPortals'], fetcher, {
    initialData: [],
    ...options
  });
}
