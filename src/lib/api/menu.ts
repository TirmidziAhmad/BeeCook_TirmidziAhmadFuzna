import { fetcher, type ApiResponse } from './config';
import type {
  GetMenusParams,
  CreateMenuPayload,
  UpdateMenuPayload,
} from '@/types/api';

export interface MenusResponse {
  menus: any[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export const menuService = {
  /**
   * Get all menus with optional pagination and filtering.
   * API returns: { code, status, message, data: { menus: [...], totalItems, totalPages, ... } }
   */
  async getMenus(params?: GetMenusParams): Promise<MenusResponse> {
    const query = new URLSearchParams();
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.search) query.append('search', params.search);
    if (params?.category_id) query.append('category_id', params.category_id.toString());
    
    const queryString = query.toString() ? `?${query.toString()}` : '';
    const response = await fetcher<ApiResponse<MenusResponse>>(`/menu${queryString}`);
    return response.data;
  },

  /**
   * Get a specific menu by ID.
   * API returns: { code, status, message, data: { menu: { ... } } }
   */
  async getMenuById(id: string | number) {
    const response = await fetcher<ApiResponse<{ menu: any }>>(`/menu/find/${id}`);
    return response.data.menu;
  },

  /**
   * Get menu details by its slug.
   * API returns: { code, status, message, data: { menu: { ... } } }
   */
  async getMenuDetailBySlug(slug: string) {
    const response = await fetcher<ApiResponse<{ menu: any }>>(`/menu/detail/${slug}`);
    return response.data.menu;
  },

  /**
   * Create a new menu
   */
  async createMenu(data: CreateMenuPayload) {
    return fetcher<ApiResponse<any>>('/menu', {
      method: 'POST',
      body: data as any,
    });
  },

  /**
   * Update an existing menu
   */
  async updateMenu(id: string | number, data: UpdateMenuPayload) {
    return fetcher<ApiResponse<any>>(`/menu/update/${id}`, {
      method: 'PATCH',
      body: data as any,
    });
  },

  /**
   * Delete a menu by ID
   */
  async deleteMenu(id: string | number) {
    return fetcher<ApiResponse<any>>(`/menu/delete/${id}`, {
      method: 'DELETE',
    });
  },

  /**
   * Upload an image for a specific menu
   */
  async uploadImage(id: string | number, image: File) {
    const formData = new FormData();
    formData.append('image', image);

    return fetcher<ApiResponse<any>>(`/menu/upload/${id}`, {
      method: 'PUT',
      body: formData,
    });
  },
};
