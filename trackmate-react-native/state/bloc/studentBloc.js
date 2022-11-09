import { baseUrl } from "../config";
import httpClient from '../http';

const basePath = baseUrl + "/api/students"
export default {
  getStudent: student_id => {
    return httpClient.get(`${basePath}/${student_id}`);
  },
  createStudent: (class_id, { firstName, lastName, gender, dob }) => {
    return httpClient.post(`${basePath}/?classId=${class_id}`, {
      body: { firstName, lastName, dob, gender }
    })
  },
  updateStudent: (student_id, { firstName, lastName, gender, dob, phone, email }) => {
    return httpClient.patch(`${basePath}/${student_id}`, {
      body: { firstName, lastName, dob, gender, guardianNumber: phone, guardianEmail: email, }
    })
  },
  deleteStudent: student_id => {
    return httpClient.delete(`${basePath}/${student_id}`);
  },
};