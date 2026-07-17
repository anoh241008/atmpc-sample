import React,{useEffect,useState} from 'react';
import RoomModal from '../../../../../features/rentalservice/admin/roommodal';
import CreateRoomForm from '../../../../../components/rentalservice/admin/forms/roomform';
import Pagination from '../../../../../components/common/paginations';
import useRoomManagement from '../../../../../hooks/services/RentalServices/branchAdmin/RoomManagement';
const RoomView = () => {

  const [openModal, setOpenModal] = useState({
    open:false,
    mode:"Create Room",
    data:null

  })

  const handleCloseModal = () => {

    setOpenModal({open: false, mode:"Create Room", data: null});

  }

  const {

    error,
    alert,
    formData,
    handleChange,
    handleSubmit,
    loading,
    fetchRoomList,
    roomList,
    pagination,

  } = useRoomManagement(openModal.mode, openModal.data);

  // Initial table load
  useEffect(() => {

    fetchRoomList(0,10);

  }, [fetchRoomList]);

  //Pagination
  const handlePageChange = (page) => {

    fetchRoomList(page - 1, pagination.pageSize)

  }

  return (
    <div className="h-screen font-oswald px-6 md:px-20 bg-white">
      <div className="mx-auto max-w-3xl grid grid-cols-1 gap-6 mb-10">

        {/* Rooms List Table */}
        <div className="bg-white rounded-xl shadow-md p-6 border mt-10 mb-10">
          <h2 className="text-lg font-bold text-black mb-4">🏘️ Rooms List</h2>
          <button 
          onClick={() => {setOpenModal({open: true, mode: "Create Room", data: null});
        }}
          className="bg-green-500 text-white text-xs px-3 py-1 mb-2 cursor-pointer rounded hover:bg-green-600">Add Room</button>
          <div className="overflow-x-auto max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
            <table className="w-full text-sm text-black">
              <thead className="text-xs">
                <tr className="bg-gray-200">
                  <th className="text-left p-3">Room No.</th>
                  <th className="text-left p-3">Capacity</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Price</th>
                  <th className="text-left p-3">Occupants</th>
                </tr>
              </thead>
              <tbody className="text-xs">

                {loading ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-500">
                      Loading...
                    </td>
                  </tr>
                ) : roomList.length > 0 ? (
                  roomList.map((item) => (
                    <tr key={item.roomid}
                      onDoubleClick={() => {
                        setOpenModal({open: true, mode: "Edit Room", data: item});}}
                    className=" hover:bg-gray-50 cursor-pointer">
                      <td className="p-3">{item.roomnumber}</td>
                      <td className="p-3">{item.capacity}</td>
                      <td className="p-3"><span className={`${item.status === "Occupied" ? "bg-red-100 text-red-600": "bg-green-100 text-green-600"}`}>{item.status}</span></td>
                      <td className="p-3">₱{item.monthlyrent}</td>
                      <td className="p-3">
                        {item.occupants && item.occupants.length > 0 ? (
                          <select className="text-xs border border-gray-300 rounded px-2 py-1 bg-white text-black focus:outline-none focus:ring-1 focus:ring-black">
                            {item.occupants.map((name, index) => (
                              <option key={index} value={name}>
                                {name}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="text-gray-400 text-xs">No occupants</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500">
                      No rooms found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
            <Pagination
                              currentPage={pagination.currentPage + 1}
                              totalPages={pagination.totalPages}
                              totalItems={pagination.totalElements}
                              itemsPerPage={pagination.pageSize}
                              onPageChange={handlePageChange}
                          />
        </div>
      </div>

    <RoomModal
    
      isOpen={openModal.open}
      onClose={handleCloseModal}
      title={openModal.mode === "Create Room" ? "Create Room" : "Edit Room"}

    >

      {openModal.open && formData && (

        <CreateRoomForm

          key={openModal.open}
          mode={openModal.mode}
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          error={error}
          loading={loading}
          alert={alert}
          
        />

      )}

    </RoomModal>

    </div>
  );
};

export default RoomView;