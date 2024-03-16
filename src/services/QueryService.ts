import type { AxiosResponse } from 'axios'
import type { QueryItems } from '@/type'
import apiClient from './AxiosClient'

export default {
  getQuery(query: string): Promise<AxiosResponse<QueryItems[]>> {
    return apiClient.get<QueryItems[]>('/search?query=' + query)
  }
}
