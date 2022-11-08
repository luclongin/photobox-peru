import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
  }
});

export const UploadHttp = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})