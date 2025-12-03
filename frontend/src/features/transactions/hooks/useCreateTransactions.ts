import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createTransaction } from '../api/createTransaction'

export const useCreateTransaction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions'] })
      queryClient.invalidateQueries({ queryKey: ['dashboard-summary'] })
    },
    onError: (error) => {
      console.error('Falló al crear', error)
    },
  })
}
