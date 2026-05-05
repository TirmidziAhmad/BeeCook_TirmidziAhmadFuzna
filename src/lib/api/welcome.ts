import { fetcher } from './config';

export const welcomeService = {
  /**
   * Get welcome message
   */
  async getWelcome(): Promise<any> {
    return fetcher<any>('/welcome');
  },
};
