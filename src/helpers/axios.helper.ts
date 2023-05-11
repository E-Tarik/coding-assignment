import axios, { Method, AxiosRequestConfig, AxiosResponse } from 'axios';

const Axios = axios.create();

async function axiosHelper<T>(
  url: string,
  options?: {
    method: Method;
    headers?: Record<string, string>;
    params?: Record<string, unknown>;
    body?: unknown;
  }
) {
  const data: AxiosRequestConfig = {
    ...options,
    url,
    baseURL: process.env.REACT_APP_BASE_URL_API,
    data: options?.body,
  };

  return await Axios(data).then((response: AxiosResponse<T>) => response.data);
}

export default axiosHelper;
