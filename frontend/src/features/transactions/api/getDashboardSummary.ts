import { api } from './../../../lib/api'
import type { DashboardSummary } from '../types'

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
  const { data } = await api.get<DashboardSummary>(
    '/transactions/summary/dashboard'
  )
  return data
}
