import { api } from './../../../lib/api'
import type { Category } from '../types'

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get<Category[]>('/category')
  return data
}
