import { useState } from 'react'
import { MainLayout } from '../components/layout/MainLayout'
import { ExpensesChart } from '../features/transactions/components/ExpenseChart'
import { TransactionItem } from '../features/transactions/components/TransactionItem'
import { useGetTransactions } from '../features/transactions/hooks/useGetTransactions'
import { useGetDashboard } from '../features/transactions/hooks/useGetDashboard'
import { clsx } from 'clsx'
import { CategoryList } from '../features/categories/components/CategoryList'
import { AddTransactionModal } from '../features/transactions/components/AddTransactionForm'
import { Plus } from 'lucide-react'

export const Home = () => {
  const [filter, setFilter] = useState<'ALL' | 'INCOME' | 'EXPENSE'>('ALL')
  const { data: transactions } = useGetTransactions()
  const { data: summary } = useGetDashboard()
  const filteredTransactions = transactions?.filter((transaction) => {
    if (filter === 'ALL') return true
    return transaction.type === filter
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <MainLayout>
      {/* Sección 1: Balance y Gráfico (Grid Responsive) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 text-white shadow-xl flex flex-col justify-between h-80">
          <div>
            <p className="text-gray-400 text-sm mb-1">Balance Total</p>
            <h2 className="text-4xl font-bold">
              ${summary?.balance.toLocaleString('es-CL')}
            </h2>
          </div>
          <div className="flex gap-4 mt-8">
            <div className="flex-1 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-xs text-gray-300 mb-1">Ingresos</p>
              <p className="text-lg font-semibold text-green-400">
                ↑ ${summary?.income.toLocaleString('es-CL')}
              </p>
            </div>
            <div className="flex-1 bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <p className="text-xs text-gray-300 mb-1">Gastos</p>
              <p className="text-lg font-semibold text-red-400">
                ↓ ${summary?.expense.toLocaleString('es-CL')}
              </p>
            </div>
          </div>
        </div>
        <ExpensesChart summary={summary} />
      </div>

      {/* Sección 2: Categorías (Scroll horizontal en móvil) */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        <CategoryList />
      </div>

      {/* Sección 3: Transacciones Recientes */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl text-gray-800">Movimientos</h3>
          <div className="bg-gray-100 p-1 rounded-xl flex text-sm font-medium">
            {(['ALL', 'EXPENSE', 'INCOME'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={clsx(
                  'px-4 py-2 rounded-lg transition-all',
                  filter === type
                    ? 'bg-white text-indigo-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                {type === 'ALL'
                  ? 'Todos'
                  : type === 'EXPENSE'
                  ? 'Gastos'
                  : 'Ingresos'}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Transacciones */}
        <div className="space-y-3">
          {filteredTransactions?.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              No hay movimientos en esta categoría 🍃
            </div>
          ) : (
            filteredTransactions?.map((t) => (
              <TransactionItem key={t.id} transaction={t} />
            ))
          )}
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="
            group 
            fixed bottom-6 right-6 z-50
            flex items-center justify-center 
            h-14 w-14 md:h-16 md:w-16 
            bg-linear-to-br from-indigo-600 to-purple-600 
            text-white 
            rounded-full 
            shadow-[0_8px_30px_rgb(79,70,229,0.3)] 
            border-2 border-white/20
            hover:scale-110 hover:shadow-indigo-500/50 
            active:scale-95
            transition-all duration-300 ease-out
        "
          aria-label="Agregar transacción"
        >
          <Plus
            className="w-8 h-8 md:w-9 md:h-9 transition-transform group-hover:rotate-90 duration-300"
            strokeWidth={2.5}
          />
        </button>
        <AddTransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </MainLayout>
  )
}
