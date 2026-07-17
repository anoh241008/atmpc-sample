import { useEffect, useState } from "react";
import { Eye, Plus, Trash2Icon, Pencil } from "lucide-react";

import ContentModal from "../../../features/main/admin/contentmodal";
import ContentForm  from "../../../components/main/admin/forms/admincontentform";
import Pagination   from "../../../components/common/paginations";
import useContentManagement from "../../../hooks/main/admin/contentManagement";
import InlineAlert from "../../../components/alert/inlineAlert";

export default function ContentPage() {

    const [openModal, setOpenModal] = useState({
        open: false,
        mode: "create",
        data: null,
    });

    
    // ── Modal helpers ─────────────────────────────────────
    const handleClose = () => {
      setOpenModal({ open: false, mode: "create", data: null }); 
        setError({});
        
    };

    const {
        formData, handleChange, handleSubmit, handleDelete,
        fileInputRef,
        contents, fetchAllContents,
        pagination, error, setError, loading,alert,setAlert
    } = useContentManagement(openModal.mode, openModal.data);

    // ── Initial table load ────────────────────────────────
    useEffect(() => {
        fetchAllContents(0, 10);
    }, [fetchAllContents]);

    // ── Pagination ────────────────────────────────────────
    const handlePageChange = (page) => {
        fetchAllContents(page - 1, pagination.pageSize);
    };

    // handleSubmit owns e.preventDefault() — don't call it here
    const handleFormSubmit = async (e) => {
      e.preventDefault();
      await handleSubmit();

    };

    return (
        <div className="p-6 bg-[#f5f6f8] min-h-screen md:ml-64">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div>
                    <h1 className="text-3xl font-semibold text-gray-800">News & Events</h1>
                    <p className="text-gray-500 text-sm">
                        Manage the cooperative's public voice and community updates.
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-black border rounded-lg text-sm bg-white shadow-sm hover:bg-gray-100">
                        <Eye size={16} /> Preview on Website
                    </button>
                    <button
                        onClick={() => setOpenModal({ open: true, mode: "create", data: null })}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm shadow hover:bg-green-700"
                    >
                        <Plus size={16} /> New Post
                    </button>
                </div>
            </div>

            {/* TABLE */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="font-semibold text-gray-800">Recent Content</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase border-b">
                            <tr>
                                <th className="py-3">Content</th>
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
                            ) : contents.length > 0 ? (
                                contents.map((item) => (
                                    <tr key={item.contentid} className="border-b last:border-none group hover:bg-gray-100 transition">
                                        <td className="py-4">
                                            <div className="flex gap-4 items-center">
                                                <img
                                                    src={`${import.meta.env.VITE_API_PHOTO_URL}${item.contentphoto}`}
                                                    alt={item.title}
                                                    className="w-12 h-12 rounded-lg object-cover bg-gray-200"
                                                />
                                                <div>
                                                    <p className="text-xs uppercase text-gray-400">{item.type}</p>
                                                    <h3 className="font-medium text-gray-800">{item.title}</h3>
                                                    <p className="text-sm text-gray-500">{item.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="flex items-center justify-center gap-2 pt-9">
                                            <Pencil
                                                size={16}
                                                className="text-gray-400 cursor-pointer group-hover:scale-110 transition"
                                                onClick={() => setOpenModal({ open: true, mode: "edit", data: item })}
                                            />
                                            <Trash2Icon 
                                            size={16} 
                                            className="text-gray-400 cursor-pointer"
                                            onClick={() => handleDelete(item.contentid)}
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
                                       
                                                                               ) : contents.length === 0 ? (
                                       
                                                                                 <p className="text-gray-500 text-sm">
                                                                                   No contents found
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
            </div>
                            
            {/* MODAL */}
            <ContentModal
                 isOpen={openModal.open}
                  title={openModal.mode === "create" ? "Create Content" : "Edit Post"}  // ← add this
                  onClose={handleClose}
            >
                {openModal.open && formData && (
                    <ContentForm
                        key={openModal.mode}
                        mode={openModal.mode}
                        formData={formData}
                        handleChange={handleChange}
                        fileInputRef={fileInputRef}  
                        handleSubmit={handleFormSubmit}
                        error={error}
                        loading={loading}
                        alert={alert}
                        
                    />
                )}
            </ContentModal>

        </div>
    );
}