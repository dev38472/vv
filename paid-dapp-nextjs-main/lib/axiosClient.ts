import axios, { AxiosInstance } from 'axios'

enum BackendRoutes {
  AUTH = '/auth/login',
}

let axiosInstance: AxiosInstance

const createAxiosInstace = <T = string>(token: string): AxiosInstance => {
  global.localStorage.setItem('token', token)

  axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return axiosInstance
}

export { createAxiosInstace, axiosInstance, BackendRoutes }
