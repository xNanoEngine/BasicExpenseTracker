import { api } from '@/lib/api'
import type { CreateTransactionDTO, Transaction } from '../types'
export const createTransaction = async (
  newTransaction: CreateTransactionDTO
): Promise<Transaction> => {
  const { data } = await api.post<Transaction>(
    '/transactions',
    newTransaction,
    {
      headers: {
        'x-user-id': 'user-temp-1',
      },
    }
  )
  return data
}
