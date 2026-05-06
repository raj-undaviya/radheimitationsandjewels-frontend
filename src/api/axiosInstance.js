import axios from "axios";

const API = axios.create({
    baseURL: "import.meta.env.BACKEND_BASE_URL",
    headers: {
        "Content-Type": "application/json",
    },
});

// VERY IMPORTANT
API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default API;