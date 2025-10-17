import axios from "axios";

const http = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_URL,
  baseURL: "http://localhost:3000/api",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
