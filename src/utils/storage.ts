import Cookies from 'js-cookie';

export const getItem = (key: string) => {
  const data = Cookies.get(key);

  try {
    return data ? JSON.parse(data) : null;
  } catch (error) {
    return data;
  }
};

export const setItem = (key: string, value: any) => {
  const stringify = typeof value !== 'string' ? JSON.stringify(value) : value;
  Cookies.set(key, stringify);
};

export const removeItem = (key: string) => {
  Cookies.remove(key);
};
