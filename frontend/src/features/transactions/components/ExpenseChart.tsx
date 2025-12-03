import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { DashboardSummary } from '../types'

type Props = {
  summary?: DashboardSummary
}

export const ExpensesChart = ({ summary }: Props) => {
  // 1. Si no hay summary o todo es cero, mostramos mensaje
  const hasData = summary && (summary.income > 0 || summary.expense > 0)

  if (!hasData) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-80 flex flex-col items-center justify-center text-center">
        <h3 className="text-gray-500 font-medium mb-2 text-sm uppercase tracking-wider">
          Resumen Financiero
        </h3>
        <div className="bg-gray-50 p-4 rounded-full mb-3">
          <span className="text-3xl">📊</span>
        </div>
        <p className="text-gray-400 text-sm">Aún no hay datos para graficar</p>
      </div>
    )
  }

  // 2. Si hay datos, mostramos el gráfico
  const data = [
    { name: 'Ingresos', amount: summary.income, color: '#22c55e' },
    { name: 'Gastos', amount: summary.expense, color: '#ef4444' },
  ]

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 h-80">
      <h3 className="text-gray-500 font-medium mb-4 text-sm uppercase tracking-wider">
        Resumen Financiero
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            dy={10}
          />
          <Tooltip
            cursor={{ fill: 'transparent' }}
            contentStyle={{
              borderRadius: '12px',
              border: 'none',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
            }}
            formatter={(value: number) => [
              `$${value.toLocaleString('es-CL')}`,
              'Monto',
            ]}
          />
          <Bar dataKey="amount" radius={[8, 8, 8, 8]} barSize={60}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
