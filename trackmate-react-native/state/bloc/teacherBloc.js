import { baseUrl } from "../config";
import httpClient from '../http';

const basePath = baseUrl + "/api/teachers"
export default {
  getTeacher: () => {
    return httpClient.get(basePath);
  },
  signupTeacher: ({ firstName, lastName }) => {
    return httpClient.post(basePath, { body: { first_name: firstName, last_name: lastName } });
  },
};