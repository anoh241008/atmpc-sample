import { useEffect, useState } from "react";
import { Eye, Plus, Trash2Icon, Pencil } from "lucide-react";
import InlineAlert from "../../../components/alert/inlineAlert";
import useMessageManagement from "../../../hooks/main/admin/messageManagement";
import Pagination from "../../../components/common/paginations";
import MessageModal from "../../../features/main/admin/messagemodal";
export default function MessagePage() {

    const { 
            loading,

            error, 

            pagination, 

            messages, 

            fetchAllMessages, 

            handleDelete 



        } = useMessageManagement();


    const handleRowClick = (item) => {

        setSelectedMessage(item);

        setIsModalOpen(true);
        
    }

    const handleCloseModal = () => {
        
        setIsModalOpen(false);

        setSelectedMessage(null);

    }

    useEffect(() => {

        fetchAllMessages(0, 10);

    }, [fetchAllMessages]);

    const handlePageChange = (page) => {

        fetchAllMessages(page - 1, pagination.pageSize);

    }
    
    const [selectedMessage, setSelectedMessage] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="p-6 bg-[#f5f6f8] min-h-screen md:ml-64">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">List of Inquiries</h1>
                    <p className="text-gray-500 text-sm">
                        View and manage messages sent by members and visitors through the contact form.
                    </p>
                </div>
                
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="font-semibold text-gray-800">Message Content</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase border-b">
                            <tr>
                                <th className="py-3">Messages</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={2} className="text-center py-10 text-gray-500">
                                        Loading...
                                    </td>
                                </tr>
                            ) : messages.length > 0 ? (
                                messages.map((item) => (
                                    <tr key={item.messageid} className="border-b last:border-none group hover:bg-gray-100 transition">
                                        <td 
                                        onClick={() => handleRowClick(item)}
                                        className="py-4 cursor-pointer">
                                            <div className="flex gap-4 items-center">
                                                <div>
                                                    <p className="text-xs uppercase text-gray-400">Subject Type : {item.subjecttype}</p>
                                                <p className="text-xs  uppercase text-gray-500">Email : {item.email}</p>
                                                    <p className="text-xs text-gray-600">Full Name :{item.fullname}</p>
                                                    <p className="text-sm text-gray-700 truncate max-w-xs">Message: {item.messagedesc}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="flex items-center justify-center gap-2 pt-9">
                                            <Trash2Icon 
                                            size={16} 
                                            className="text-gray-400 cursor-pointer"
                                            onClick={() => handleDelete(item.messageid)}
                                             />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={2} className="text-center py-10 text-gray-500">
                                           {error.general ? (
                                       
                                                                                 <InlineAlert
                                                                                   type="error"
                                                                                   message={error.general}
                                                                                 />
                                       
                                                                               ) : messages.length === 0 ? (
                                       
                                                                                 <p className="text-gray-500 text-sm">
                                                                                   No messages found
                                                                                 </p>
                                       
                                                                               ) : null}
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
                         {/* MODAL */}
            <MessageModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={selectedMessage?.subjecttype}
            >
                {selectedMessage && (
                    <div className="space-y-4">

                                             {selectedMessage.email && (
                            <div>
                                <p className="text-xs text-gray-400 uppercase mb-1">Email</p>
                                <p className="text-gray-800 text-xs">{selectedMessage.email}</p>
                            </div>
                        )}



                        <div>
                            <p className="text-xs text-gray-400 uppercase mb-1">Message</p>
                            <p className="text-gray-700 text-xs leading-relaxed h-40 overflow-y-auto break-words overflow-y-hidden">
                                {selectedMessage.messagedesc}
                            </p>
                        </div>

  
                        {selectedMessage.createdat && (
                            <div>
                                <p className="text-xs text-gray-400 uppercase mb-1">Date</p>
                                <p className="text-gray-500 text-sm">
                                    {new Date(selectedMessage.createdat).toLocaleDateString("en-US", {
                                        year:  "numeric",
                                        month: "long",
                                        day:   "numeric",
                                    })}
                                </p>
                            </div>
                        )}

                    </div>
                )}
            </MessageModal>

            </div>
        </div>
    );
}