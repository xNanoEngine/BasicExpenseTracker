import type { Category } from '../../categories/types'

export type TransactionType = 'INCOME' | 'EXPENSE'

export type Transaction = {
  id: string
  amount: number
  description: string
  date: string
  type: TransactionType
  category: Category
  userId: string
}

export type DashboardSummary = {
  income: number
  expense: number
  balance: number
}

export type CreateTransactionDTO = {
  amount: number
  description: string
  categoryId: string
  type: 'INCOME' | 'EXPENSE'
  date: string
}
