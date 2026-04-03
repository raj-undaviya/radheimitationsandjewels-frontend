import API from "../api/axiosInstance";

// GET ALL COLLECTIONS
export const getCollections = async () => {
    try {
        const response = await API.get("/api/products/category"); // 🔥 change endpoint if needed
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Failed to fetch collections" };
    }
};