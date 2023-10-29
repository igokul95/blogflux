import axios from "axios";

export const apiClient = axios.create({
  headers: {},
  validateStatus: (status) => {
    return status >= 200 && status < 300; // Reject only if status code is outside of the 2xx range
  },
});

export const fetchTopics = () => {
  const url = `/api/blogposts`;
  return apiClient.get(url, {});
};
