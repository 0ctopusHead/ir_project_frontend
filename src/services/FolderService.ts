import type { AxiosResponse } from 'axios'
import type { Folder } from '@/type'
import type { RecipeBookmark } from '@/type'
import type { BookmarkFolder } from '@/type'
import type { Bookmark } from '@/type'
import type { RecommendItem } from '@/type'
import apiClient from './AxiosClient'

export default {
  createFolder(user_id: number, folder_name: string): Promise<AxiosResponse<Folder>> {
    return apiClient.post<Folder>('/folders', { user_id: user_id, name: folder_name })
  },
  getFolder(user_id: number): Promise<AxiosResponse<Folder[]>> {
    return apiClient.get<Folder[]>('/folders/' + user_id)
  },
  addBookmark(recipe: Bookmark): Promise<AxiosResponse<Bookmark>> {
    return apiClient.post<Bookmark>('/add_bookmarks', recipe)
  },
  getBookmark(folder_id: number): Promise<AxiosResponse<BookmarkFolder[]>> {
    return apiClient.get<BookmarkFolder[]>('/folders/bookmark/' + folder_id)
  },
  deleteFolder(folder_id: number): Promise<AxiosResponse<Folder>> {
    return apiClient.post<Folder>('/delete_folder/' + folder_id)
  },
  deleteBookmark(bookmark_id: number): Promise<AxiosResponse<BookmarkFolder>> {
    return apiClient.post<BookmarkFolder>('/delete_bookmark/' + bookmark_id)
  },
  getRecommend(user_id: number): Promise<AxiosResponse<RecommendItem[]>> {
    return apiClient.get<RecommendItem[]>('/recommend/' + user_id)
  }
}
