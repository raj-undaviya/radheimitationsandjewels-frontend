import axios from "axios";

const API = axios.create({
    baseURL: "/api", // IMPORTANT (proxy will handle real URL)
    headers: {
        "Content-Type": "application/json",
    },
});

// Attach token automatically (optional)
// API.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export default API;