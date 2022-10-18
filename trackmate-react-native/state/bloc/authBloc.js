import { baseUrl } from "../config";
import httpClient from './httpClient';

const isDevelopment = process.env.NODE_ENV === "development";

export default (function () {
  const basePath = baseUrl + "/api/auth"
  return {
    login: async id_token => {
      const res = await httpClient.post(`${basePath}/login?id_token=${id_token}`);
      if (isDevelopment) localStorage.setItem('token', res.token);
    },
    logout: () => {
      return httpClient.post(`${basePath}/logout`);
    },
  };
})();