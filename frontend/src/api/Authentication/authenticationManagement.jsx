import api from "../axiosInstance";

// LOGIN ALL ADMIN PORTAL — no token needed (public)
export const loginAdmin = async (payload) => {
    return await api.post(`/api/adminAuth/login`, payload);
};


// VALIDATE ADMIN TOKEN — sends cookie automatically
export const validateToken = async () => {
    return await api.get(`/api/adminAuth/validate`);
};

// LOGOUT ADMIN — sends cookie automatically
export const logoutAdmin = async () => {
    return await api.post(`/api/adminAuth/logout`);
};