import { baseUrl } from "../config";
import httpClient from './httpClient';

export default (function () {
  const basePath = baseUrl + "/api/teachers"
  return {
    getTeacher: () => {
      return httpClient.get(basePath);
    },
    signupTeacher: name => {
      return httpClient.post(basePath, { body: { name } });
    },
  };
})();