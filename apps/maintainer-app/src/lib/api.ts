import axios from "axios";

const httpUnauthorized = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const projectRef = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(
      "https://",
      ""
    ).split(".")[0];
    const key = `sb-${projectRef}-auth-token`;

    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        
        const accessToken = parsed?.access_token;
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        
      } catch (error) {
        console.error(error);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { http, httpUnauthorized };
