import type { AxiosResponse } from 'axios'
import type { Folder } from '@/type'
import apiClient from './AxiosClient'

export default {
  createFolder(user_id: number, folder_name: string): Promise<AxiosResponse<Folder>> {
    return apiClient.post<Folder>('/folders', { user_id: user_id, name: folder_name })
  },
  getFolder(user_id: number): Promise<AxiosResponse<Folder[]>> {
    return apiClient.get<Folder[]>('/folders/' + user_id)
  }
}
