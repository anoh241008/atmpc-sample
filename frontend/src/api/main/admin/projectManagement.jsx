import api from "../../axiosInstance";

// CREATE
export const createProject = async (formData) => {
    return await api.post(`/api/project/create`, formData);
};

// UPDATE
export const updateProject = async (projectid, formData) => {
    return await api.put(`/api/project/update/${projectid}`, formData);
};

// DELETE
export const deleteProject = async (projectid) => {
    return await api.delete(`/api/project/delete/${projectid}`);
};

// GET ALL WITH PAGINATION
export const getAllProjects = async (page = 0, size = 10) => {
    return await api.get(`/api/project/getAllProject`, {
        params: { page, size }
    });
};

// GET FEATURED PROJECTS
export const getFeaturedProjects = async (page = 0, size = 4) => {
    return await api.get(`/api/project/getFeatureProjects`, {
        params: { page, size }
    });
};