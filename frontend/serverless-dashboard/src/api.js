import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Backend API URL

export const api = axios.create({
  baseURL: API_BASE_URL,
});

// Functions API
export const getFunctions = () => api.get("/functions/");
export const getFunctionById = (id) => api.get(`/functions/${id}`);
export const createFunction = (data) => api.post("/functions/", data);
export const updateFunction = (id, data) => api.put(`/functions/${id}`, data);
export const deleteFunction = (id) => api.delete(`/functions/${id}`);