import api from "../../axiosInstance";

// CREATE
export const createContent = async (formData) => {
    return await api.post(`/api/content/create`, formData);
};

// UPDATE
export const updateContent = async (contentid, formData) => {
    return await api.put(`/api/content/update/${contentid}`, formData);
};

// DELETE
export const deleteContent = async (contentid) => {
    return await api.delete(`/api/content/delete/${contentid}`);
};

// GET ALL WITH PAGINATION
export const getAllContents = async (page = 0, size = 10) => {
    return await api.get(`/api/content/getAllContents?page=${page}&size=${size}`);
};

// GET ANNOUNCEMENT AND UPDATE
export const getLatestContents = async (page = 0, size = 4) => {
    return await api.get(`/api/content/getAnnouncementUpdate`, {
        params: {
            page,
            size,
            types: ["Announcement", "Update"]
        }
    });
};

// GET NEWS AND EVENT
export const getNewsAndEvents = async (page = 0, size = 4) => {
    return await api.get(`/api/content/getNewsEvent`, {
        params: {
            page,
            size,
            types: ["News", "Event"]
        }
    });
};