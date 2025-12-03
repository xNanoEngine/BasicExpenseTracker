import { getDashboardSummary } from './../api/getDashboardSummary'
import { useQuery } from '@tanstack/react-query'

export const useGetDashboard = () => {
  return useQuery({
    queryKey: ['dashboard-summary'],
    queryFn: getDashboardSummary,
    staleTime: 1000 * 60 * 2,
  })
}
