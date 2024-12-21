export const DEFAULT_ROUTES = {
  HOME: '/',
  CREATE: '/post/create',
  DETAIL: (id: string) => `/post/${id}`,
  UPDATE: (id: string) => `/post/${id}/update`,
};
