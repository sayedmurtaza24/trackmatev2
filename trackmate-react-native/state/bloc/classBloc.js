import { baseUrl } from "../config";
import httpClient from "../http"

const basePath = baseUrl + "/api/classes"
export default {
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