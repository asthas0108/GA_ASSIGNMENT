import axios from "axios";
// export const BASE_URL = "http://localhost:5000";
export const BASE_URL = "https://ga-assignment-1.onrender.com";

export const clientServer = axios.create({
    baseURL: BASE_URL,
});