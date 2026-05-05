import { fetcher, type ApiResponse } from './config';
import type { GetCategoriesParams } from '@/types/api';

export const categoryService = {
  /**
   * Get all categories, optionally filtered by search term.
   * API returns: { code, status, message, data: { categories: [...] } }
   */
  async getCategories(params?: GetCategoriesParams) {
    const query = new URLSearchParams();
    if (params?.search) {
      query.append('search', params.search);
    }
    const queryString = query.toString() ? `?${query.toString()}` : '';
    const response = await fetcher<ApiResponse<{ categories: any[] }>>(`/category${queryString}`);
    return response.data.categories;
  },

  /**
   * Upload an image for a specific category
   */
  async uploadImage(id: string | number, image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return fetcher<ApiResponse<any>>(`/category/upload/${id}`, {
      method: 'PUT',
      body: formData,
    });
  },
};
