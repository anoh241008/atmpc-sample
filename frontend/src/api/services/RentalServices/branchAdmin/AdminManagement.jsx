import api from "../../../axiosInstance";

// GET ALL TENANTLIST BASE ON ADMIN BRANCH
export const getBranchTenants = async (page = 0, size = 10) => {

    return await api.get(`/api/rental/admin/tenantList?page=${page}&size=${size}`);

};

//TENANT FOR APPROVAL
export const ToApprovalTenant = async(customerid) => {

    return await api.put(`/api/rental/admin/approvalTenant/${customerid}`);

}

//SET DUE ON TENANT
export const ToSetDueTenant = async(customerid, dueDate) => {
        console.log("customerid:", customerid, "dueDate:", dueDate); // ADD THIS
      return await api.put(`/api/rental/admin/setDueTenant/${customerid}`, { dateDue: dueDate });

}

//TENANT FOR DELETION
export const deleteTenant = async(customerid) => {

    return await api.delete(`/api/rental/admin/deleteTenant/${customerid}`);

}

// GET ALL ROOMLIST TO ASSIGN FOR TENANT
export const getRoomListForTenantToAssign = async() => {
    return await api.get(`/api/rental/admin/getRoomListToAssignForTenant`);
}

//ASSIGNING ROOM FOR TENANT
export const AssgningRoomTenant = async(customerid, formData) => {

    return await api.put(`/api/rental/admin/assigningRoomToTenant/${customerid}`, formData);

}
// CREATE ROOM
export const createRoom = async(formData) => {

    return await api.post(`/api/rental/admin/createRoom`, formData);

}
//UPDATE ROOM
export const updateRoom = async(roomid, formData) => {

    return await api.put(`/api/rental/admin/updateRoom/${roomid}`, formData);

}
// GET ROOMLIST BASED ON ADMIN BRACNH
export const getRoomList = async(page = 0, size = 0) => {

    return await api.get(`/api/rental/admin/roomList?page=${page}&size=${size}`);

}

//GET CHATLIST
export const getChatlist = async() => {

    return await api.get(`/api/rental/admin/getChatList`);
    
}