import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:8001",
    timeout: 5000
});

export const getHistory = async () => {
    const response = await apiClient.get("/history");
    return response.data;
};