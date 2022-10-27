import { baseUrl } from "../config";
import httpClient from '../http';

const basePath = baseUrl + "/api/assessments"
export default {
  addAssessment: (student_id, { present, good_behave, good_perf, behave_comment, perf_comment, date }) => {
    return httpClient.post(`${basePath}/?student_id=${student_id}`, {
      body: {
        present,
        good_behave,
        good_perf,
        behave_comment,
        perf_comment,
        date,
      },
    });
  },
  updateAssessment: (assessment_id, { present, good_behave, good_perf, behave_comment, perf_comment }) => {
    return httpClient.patch(`${basePath}/${assessment_id}`, {
      body: {
        present,
        good_behave,
        good_perf,
        behave_comment,
        perf_comment,
      },
    });
  },
  deleteAssessment: assessment_id => {
    return httpClient.delete(`${basePath}/${assessment_id}`);
  },
};