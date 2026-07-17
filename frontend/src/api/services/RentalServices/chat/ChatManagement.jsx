import api from "../../../axiosInstance"

export const getConversationMessages = (conversationId) =>
  api.get(`/chatMessage/conversation/${conversationId}`);

export const getOrCreateConversation = (tenantid) =>
    api.get(`/chatMessage/conversation/with/${tenantid}`);

export const getOrCreateConversationAsTenant = (adminid) =>
  api.get(`/chatMessage/conversation/as-tenant/${adminid}`);

// api/services/RentalServices/chat/ChatManagement.js
export const markAllDelivered = (conversationid) =>
  api.put(`/chatMessage/delivered/all?conversationid=${conversationid}`);

export const markAllRead = (conversationid) =>
  api.put(`/chatMessage/read/all?conversationid=${conversationid}`);


export const getConversationMessagesPaged = (conversationid, page = 0, size = 30) =>
  api.get(`/chatMessage/conversation/${conversationid}/paged?page=${page}&size=${size}`);