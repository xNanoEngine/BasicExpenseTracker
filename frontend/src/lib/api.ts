import axios from 'axios'

const API_URL = import.meta.env.VITE_BACKEND || 'http://localhost:3000/api'

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('authToken')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })
