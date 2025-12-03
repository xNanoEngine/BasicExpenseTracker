import { QueryClient, type DefaultOptions } from '@tanstack/react-query'

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retry: 1,
    staleTime: 1000 * 60,
  },
}

export const queryClient = new QueryClient({ defaultOptions: queryConfig })
