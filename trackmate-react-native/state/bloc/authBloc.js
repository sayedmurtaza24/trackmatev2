import { baseUrl } from "../config";
import httpClient from '../http';

const isDevelopment = process.env.NODE_ENV === "development";
const basePath = baseUrl + "/api/auth";

export default {
  login: async idToken => {
    const res = await httpClient.post(`${basePath}/login`, { body: { idToken } });
    if (isDevelopment) localStorage.setItem('token', res.token);
  },
  logout: async () => {
    await httpClient.post(`${basePath}/logout`);
    if (isDevelopment) localStorage.clear('token');
  },
};
