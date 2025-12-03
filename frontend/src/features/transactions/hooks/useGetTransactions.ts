import { useQuery } from '@tanstack/react-query'
import { getTransactions } from '../api/getTransaction'
import type { Transaction } from '../types'

export const useGetTransactions = () => {
  return useQuery<Transaction[], Error>({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  })
}
