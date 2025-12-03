import { api } from '../../../lib/api'
import type { Transaction } from '../types'

export const getTransactions = async (): Promise<Transaction[]> => {
  const { data } = await api.get<Transaction[]>('/transactions')
  return data
}
