import { baseUrl } from "../config";
import httpClient from '../http';

const basePath = baseUrl + "/api/assessments"
export default {
  addAssessment: (student_id, data) => {
    return httpClient.post(`${basePath}/?studentId=${student_id}`, {
      body: data
    });
  },
  updateAssessment: (assessment_id, data) => {
    return httpClient.put(`${basePath}/${assessment_id}`, {
      body: data
    });
  },
  deleteAssessment: assessment_id => {
    return httpClient.delete(`${basePath}/${assessment_id}`);
  },
};