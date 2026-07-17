import api from "../../axiosInstance";

// CREATE MESSAGE INQUIRY — public, no token needed
export const createMessageInquiry = async (formData) => {
    return await api.post(`/api/message/createMessage`, formData);
};

// GET ALL MESSAGES — protected, cookie sent automatically
export const getAllMessages = async (page = 0, size = 10) => {
    return await api.get(`/api/message/getMessages`, {
        params: { page, size }
    });
};

// DELETE MESSAGE — protected, cookie sent automatically
export const deleteMessage = async (messageid) => {
    return await api.delete(`/api/message/delete/${messageid}`);
};