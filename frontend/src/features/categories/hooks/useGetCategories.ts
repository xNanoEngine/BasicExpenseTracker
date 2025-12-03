import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api/getCategory'

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 1000 * 60 * 60,
  })
}
