import { baseUrl } from "../config";
import httpClient from '../http';

const basePath = baseUrl + "/api/students"
export default {
  getStudent: student_id => {
    return httpClient.get(`${basePath}/${student_id}`);
  },
  createStudent: (class_id, { name, gender, dob }) => {
    return httpClient.post(`${basePath}/?class_id=${class_id}`, {
      body: { name, dob, gender }
    })
  },
  updateStudent: (student_id, { name, gender, dob, phone, email }) => {
    return httpClient.patch(`${basePath}/${student_id}`, {
      body: { name, dob, gender, emergency_contact_phone: phone, emergency_contact_email: email, }
    })
  },
  deleteStudent: student_id => {
    return httpClient.delete(`${basePath}/${student_id}`);
  },
};