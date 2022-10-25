import { baseUrl } from "../config";
import httpClient from "../http"

export default (function () {
  const basePath = baseUrl + "/api/classes"
  return {
    getClass: classId => {
      return httpClient.get(`${basePath}/${classId}`);
    },
    createClass: name => {
      return httpClient.post(`${basePath}`, { body: { name } });
    },
    getStatistics: classId => {
      return httpClient.get(`${basePath}/${classId}/statistics`);
    },
  };
})();