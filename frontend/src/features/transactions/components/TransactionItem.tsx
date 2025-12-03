import type { Transaction } from '../types'
import { clsx } from 'clsx'

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(amount)
}
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'short',
  })
}

export const TransactionItem = ({
  transaction,
}: {
  transaction: Transaction
}) => {
  const isExpense = transaction.type === 'EXPENSE'

  return (
    <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors rounded-2xl border border-gray-100 mb-3 last:mb-0">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-xl">
          {transaction.category.icon || '💸'}
        </div>

        <div>
          <p className="font-semibold text-gray-800">
            {transaction.description}
          </p>
          <p className="text-xs text-gray-500">
            {transaction.category.name} • {formatDate(transaction.date)}
          </p>
        </div>
      </div>

      <span
        className={clsx(
          'font-bold text-sm md:text-base',
          isExpense ? 'text-red-500' : 'text-green-500'
        )}
      >
        {isExpense ? '-' : '+'}
        {formatCurrency(transaction.amount)}
      </span>
    </div>
  )
}
