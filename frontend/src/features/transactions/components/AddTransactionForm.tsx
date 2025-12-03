import { useState } from 'react'
import { useGetCategories } from '../../categories/hooks/useGetCategories'
import { useCreateTransaction } from '../hooks/useCreateTransactions'
import { clsx } from 'clsx'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const AddTransactionModal = ({ isOpen, onClose }: Props) => {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [type, setType] = useState<'EXPENSE' | 'INCOME'>('EXPENSE')
  const { data: categories } = useGetCategories()
  const { mutate, isPending } = useCreateTransaction()

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!amount || !categoryId) return

    mutate(
      {
        amount: Number(amount),
        description,
        categoryId,
        type,
        date: new Date().toISOString(),
      },
      {
        onSuccess: () => {
          onClose()
          setAmount('')
          setDescription('')
        },
      }
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-lg text-gray-800">Nueva Transacción</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {['EXPENSE', 'INCOME'].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t as 'EXPENSE' | 'INCOME')}
                className={clsx(
                  'flex-1 py-2 rounded-lg text-sm font-medium transition-all',
                  type === t
                    ? t === 'EXPENSE'
                      ? 'bg-red-100 text-red-700 shadow-sm'
                      : 'bg-green-100 text-green-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                )}
              >
                {t === 'EXPENSE' ? 'Gasto' : 'Ingreso'}
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Monto
            </label>
            <div className="relative mt-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                $
              </span>
              <input
                type="number"
                autoFocus
                className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none text-xl font-bold text-gray-800"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Descripción
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 mt-1 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Ej: Completos del carrito"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Categoría
            </label>
            <div className="grid grid-cols-3 gap-2 mt-2 max-h-32 overflow-y-auto">
              {categories?.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategoryId(cat.id)}
                  className={clsx(
                    'flex flex-col items-center justify-center p-2 rounded-xl border transition-all text-xs gap-1',
                    categoryId === cat.id
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-100 hover:bg-gray-50 text-gray-500'
                  )}
                >
                  <span className="text-xl">{cat.icon}</span>
                  <span className="truncate w-full text-center">
                    {cat.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={isPending}
            className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-lg hover:bg-black transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-gray-200"
          >
            {isPending ? 'Guardando...' : 'Guardar Movimiento'}
          </button>
        </form>
      </div>
    </div>
  )
}
