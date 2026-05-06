import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// REQUEST INTERCEPTOR
API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// RESPONSE INTERCEPTOR
API.interceptors.response.use(

    // SUCCESS
    (response) => response,

    // ERROR
    (error) => {

        const isLoginAPI =
            error.config?.url?.includes("/users/auth/");

        // TOKEN EXPIRED
        if (
            error.response?.status === 401 &&
            !isLoginAPI
        ) {

            const code = error.response?.data?.code;

            if (code === "token_not_valid") {

                // REMOVE OLD DATA
                localStorage.removeItem("token");
                localStorage.removeItem("user");

                // MESSAGE
                toast.error("Session expired. Please login again.");

                // REDIRECT
                setTimeout(() => {
                    window.location.href = "/login";
                }, 1500);
            }
        }

        return Promise.reject(error);
    }
);

export default API;