import React, { useState, useEffect, useRef } from "react";
import Pagination from "../../../../../components/common/paginations";
import useAdminManagement from "../../../../../hooks/services/RentalServices/branchAdmin/RoomManagement";
import useTenantManagement from "../../../../../hooks/services/RentalServices/branchAdmin/TenantManagement";
import ApprovalModal from "../../../../../features/rentalservice/admin/assigningroommodal";
import AssigningRoom from "../../../../../components/rentalservice/admin/forms/assignroomform";

const TenantView = () => {
  
  const PHOTO_URL = import.meta.env.VITE_API_PHOTO_URL;
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [openModal, setOpenModal] = useState({
    open: false,
    mode: "Assigning Room",
    data: null,
  });


    const {
    tenants,
    loading,
    error,
    alert,
    fetchBranchTenants,
    pagination,
    formDataRoomAssign,             
    handleChangeRoomAssign,         
    handleAssignRoom,               
    fetchRoomListToAssignForTenant,
    roomListToAssignForTenant,
    handleApproval,
    handleDeletion

  } = useTenantManagement(openModal.mode, openModal.data);

  
  const pressStart = useRef(null);

  const handleMouseDown = (user) => {
      pressStart.current = Date.now();
  }

  const handleMouseUp = (user) => {
      const duration = Date.now() - pressStart.current;
      if(duration >= 1000){
          handleDeletion(user); 
      }
  }
  const handleCloseModal = () => {

    setOpenModal({open: false, mode: "Assigning Room", data:null});
    
  }

  useEffect(() => {

    fetchBranchTenants(0, itemsPerPage);
    fetchRoomListToAssignForTenant();

  }, [fetchBranchTenants, fetchRoomListToAssignForTenant]);

  const handlePageChange = (page) => {

    fetchBranchTenants(page - 1, pagination.pageSize);

  };

  // Client-side search filter
 const filteredUsers = (tenants || []).filter((user) => {

    if (!searchTerm) return true;

    return user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;

});

  const currentItems = filteredUsers;

  const indexOfFirstItem = (pagination?.currentPage ?? 0) * (pagination?.pageSize ?? itemsPerPage);

  const indexOfLastItem  = indexOfFirstItem + currentItems.length;

  const userClient = selectedTenant;
  
  const profilePic = null;

  const renderUsers = () => {
    return currentItems.map((user) => (
      <tr
        key={user.customerid}
        className=" hover:bg-gray-50 cursor-pointer"
        onClick={() => setSelectedTenant(user)}
        onDoubleClick={() => {
        setSelectedTenant(user); 
        setOpenModal({open: true, mode: "Assigning Room", data: user});
        }}
        onContextMenu={(e) => {
        e.preventDefault();        
        handleApproval(user);     
    }}
        onMouseDown={() => handleMouseDown(user)}
        onMouseUp={() => handleMouseUp(user)}  
      >
        <td className="p-3">{user.roomnumber}</td>
        <td className="p-3">{user.fullname}</td>
        <td className="p-3">{user.gender}</td>
        <td className="p-3">{user.birthdate}</td>
        <td className="p-3">{user.phonenumber}</td>
        <td className="p-3">{user.occupation}</td>
        <td className="p-3">{user.email}</td>
        <td className="p-3">{user.address}</td>
        <td className="p-3">{user.contactname}</td>
        <td className="p-3">{user.contactnumber}</td>
        <td className="p-3">{user.relationshipcontact}</td>
        <td className="p-3 hidden">{user.profilephoto}</td>

        <td className="p-3">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            user.approval === "Approved"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}>
            {user.approval}
          </span>
        </td>

        <td className="p-3">
          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
            user.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-gray-100 text-gray-500"
          }`}>
            {user.status}
          </span>
        </td>

        <td className="p-3">{user.dateDue}</td>


      </tr>
    ));
  };

  return (
    <div className="h-full font-oswald px-6 md:px-20 bg-white">
      {/* Table */}
      <div className="mx-auto max-w-3xl grid grid-cols-1 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-md p-6 border mt-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-black mb-4 md:mb-0">🏠 Tenants List</h2>

            {/* Search box */}
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full md:w-64 px-4 py-2 border border-gray-300 bg-white text-black rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Items per page selector */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-2">
            <div className="text-sm text-gray-600">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredUsers.length)} of{" "}
              {pagination?.totalElements ?? filteredUsers.length} tenants
              {searchTerm && (
                <span>
                  {" "}for "<span className="font-semibold">{searchTerm}</span>"
                </span>
              )}
            </div>
          </div>{/* ← was missing, caused all nested divs to be mismatched */}

          {/* Scrollable wrapper */}
          <div className="overflow-x-auto max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent mb-4">
            <table className="w-full text-sm text-black table-fixed">
              <thead className="text-xs">
                <tr className="bg-gray-200">
                  <th className="text-left p-3 w-22">Room No.</th>
                  <th className="text-left p-3 w-48">Full Name</th>
                  <th className="text-left p-3 w-32">Gender</th>
                  <th className="text-left p-3 w-32">Birthdate</th>
                  <th className="text-left p-3 w-42">Phone #</th>
                  <th className="text-left p-3 w-62">Occupation</th>
                  <th className="text-left p-3 w-62">Email</th>
                  <th className="text-left p-3 w-100">Address</th>
                  <th className="text-left p-3 w-42">Contact Name</th>
                  <th className="text-left p-3 w-42">Contact Number</th>
                  <th className="text-left p-3 w-42">Relationship</th>
                  <th className="text-left p-3 w-32">Approval</th>
                  <th className="text-left p-3 w-36">Status</th>
                  <th className="text-left p-3  w-32">Date Due</th>
                  <th className="hidden text-left p-3  w-32">Profile Photo</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {currentItems.length > 0 ? (
                  renderUsers()
                ) : (
                  <tr>
                    <td colSpan="13" className="p-4 text-center text-gray-500">
                      No tenants found{searchTerm ? ` for "${searchTerm}"` : ""}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <Pagination
            currentPage={pagination.currentPage + 1}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalElements}
            itemsPerPage={pagination.pageSize}
            onPageChange={handlePageChange}
          />
        </div>{/* ← was missing, closes the card div */}

        {/* Tenant Details */}
        <div className="max-w-3xl mb-10">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 mb-10">
            {/* Profile Picture */}
            <div className="flex mb-6">
              <img
                src={
                    userClient?.profilephoto
                        ? `${PHOTO_URL}${userClient.profilephoto}`
                        : "https://placehold.co/150x150"
                }
                alt="Profile"
                className="w-48 h-48 rounded-2xl object-cover border-2 border-gray-300 shadow"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              📌 Personal Information
            </h2>

            {/* Personal Info Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
              <div><strong>Room #:</strong> {userClient?.roomnumber || ""}</div>
              <div><strong>Full Name:</strong> {userClient?.fullname || ""}</div>
              <div><strong>Gender:</strong> {userClient?.gender || ""}</div>
              <div><strong>Birthdate:</strong> {userClient?.birthdate || ""}</div>
              <div><strong>Phone #:</strong> {userClient?.phonenumber || ""}</div>
              <div><strong>Occupation:</strong> {userClient?.occupation || ""}</div>
              <div><strong>Email:</strong> {userClient?.email || ""}</div>
              <div className="sm:col-span-2"><strong>Address:</strong> {userClient?.address || ""}</div>
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Emergency Contact Section */}
            <h3 className="text-lg font-semibold text-gray-800 mb-4">🧑‍🤝‍🧑 Emergency Contact</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
              <div><strong>Contact Name:</strong> {userClient?.contactname || ""}</div>
              <div><strong>Contact Number:</strong> {userClient?.contactnumber || ""}</div>
              <div><strong>Relationship:</strong> {userClient?.relationshipcontact || ""}</div>
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Status Section */}
            <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Rental Status</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700">
              <div><strong>Approval:</strong> {userClient?.approval || ""}</div>
              <div><strong>Status:</strong> {userClient?.status || ""}</div>
            </div>
          </div>
        </div>

       
      </div>
       <ApprovalModal
               isOpen={openModal.open}
                onClose={handleCloseModal}
                title={openModal.mode}
       >
               

                {openModal.open && formDataRoomAssign && (
                  <AssigningRoom
                  key={openModal.mode}
                  mode={openModal.mode}
                  formData={formDataRoomAssign}
                  handleChange={handleChangeRoomAssign}
                  handleSubmit={handleAssignRoom}
                  roomlist={roomListToAssignForTenant}
                  error={error}
                  loading={loading}
                  alert={alert}

                />

                )
      
                }
            
        </ApprovalModal>
    </div>
  );
};

export default TenantView;