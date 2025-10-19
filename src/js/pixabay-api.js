import axios from "axios";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "32802293-5821b85c58537e1609d134566"; 


export function getImagesByQuery(query) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    per_page: 40, 
  };

  return axios
    .get(BASE_URL, { params })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return Promise.reject(error);
    });
}
