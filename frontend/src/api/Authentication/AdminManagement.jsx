import api from "../axiosInstance";

// CREATE ADMIN PORTAL — no token needed (public)
export const createAdmin = async (payload) => {
    return await api.post(`/api/adminAccountRegistration/adminCreate`, payload);
};

//CREATE TENANT ADMIN PORTAL
export const tenantCreate = async (payload) => {
    return await api.post(`/apiTenant/registering`, payload);        
}
