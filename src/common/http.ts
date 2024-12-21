import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://gorest.co.in',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  get: (url: string, params: any, data: any, config: any) =>
    axiosClient({
      method: 'GET',
      url,
      params,
      data,
      ...config,
    }),

  post: (url: string, params: any, data: any, config: any) =>
    axiosClient({
      method: 'POST',
      url,
      params,
      data,
      ...config,
    }),

  put: (url: string, params: any, data: any, config: any) =>
    axiosClient({
      method: 'PUT',
      url,
      params,
      data,
      ...config,
    }),

  patch: (url: string, params: any, data: any, config: any) =>
    axiosClient({
      method: 'PATCH',
      url,
      params,
      data,
      ...config,
    }),

  delete: (url: string, params: any, data: any, config: any) =>
    axiosClient({
      method: 'DELETE',
      url,
      params,
      data,
      ...config,
    }),
};
