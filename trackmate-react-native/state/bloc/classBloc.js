import { baseUrl } from "../config";
import httpClient from "../http"

const basePath = baseUrl + "/api/classes"
export default {
  getClass: classId => {
    return httpClient.get(`${basePath}/${classId}`);
  },
  createClass: className => {
    return httpClient.post(`${basePath}`, { body: { className } });
  },
  getStatistics: classId => {
    return httpClient.get(`${basePath}/${classId}/statistics`);
  },
};