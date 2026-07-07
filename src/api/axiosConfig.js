import axios from "axios";

// هنخلي المتصفح يقرأ الرابط من إعدادات Vercel اللي هنحطها، ولو مش موجود يستخدم الرابط الافتراضي
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://d62c24ad-8ea5-4d86-a9ed-c6489e1a30d6-00-17limy7gbm16k.spock.replit.dev/",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
