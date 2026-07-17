import api from "../axiosInstance";

// Sending email link 
export const sendResetLink = async (formDataPassword) => {
    return await api.post(`/api/adminAuth/forgot-password`, formDataPassword);
};

export const resetPassword = async(resetFormData) => {
    return await api.post(`/api/adminAuth/reset-password`, resetFormData);
}
// validate reset token
export const validateResetPasswordToken = async(token) => {
    return await api.get(`/api/adminAuth/validate-reset-token`,{
         params: { token }
    });
};