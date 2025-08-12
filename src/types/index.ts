import { AxiosError } from 'axios'

export interface ApiResponseWithContent<T> {
  result: T
  success: boolean
}

export interface Sort {
  direction: 'asc' | 'desc'
  property: string
  ignoreCase: boolean
  nullHandling: string
  ascending: boolean
}

export interface Pageable {
  sort: Sort[]
  pageNumber: number
  pageSize: number
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface ResponseByPagination<T> {
  totalPages: number
  totalElements: number
  first: boolean
  last: boolean
  size: number
  number: number
  numberOfElements: number
  empty: boolean
  content: T[]
  sort: Sort[]
  pageable: Pageable
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<any>
  }
}
