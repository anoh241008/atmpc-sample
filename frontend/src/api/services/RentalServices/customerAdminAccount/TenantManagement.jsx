import api from "../../../axiosInstance";

export const getTenantDetailsLogged = async (customerid) => {
    return await api.get(`/apiTenant/getTenantDetails/${customerid}`);        
}

export const updateTenantProfile = async (customerid, data) => {
    return await api.put(`/apiTenant/updateProfile/${customerid}`, data, {
        headers: {
            "Content-Type": undefined, // let axios/browser set the multipart boundary
        },
    });
};

