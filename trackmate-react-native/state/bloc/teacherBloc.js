import { baseUrl } from "../config";
import httpClient from '../http';

const basePath = baseUrl + "/api/teachers"
export default {
  getTeacher: () => {
    return httpClient.get(basePath);
  },
  signupTeacher: ({ firstName, lastName, fieldOptions }) => {
    return httpClient.post(basePath, { body: { firstName, lastName, fieldOptions } });
  },
};