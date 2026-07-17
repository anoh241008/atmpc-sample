import React, { useEffect, useState } from "react";
import {
  PlusCircle,
  Wallet,
  TrendingUp,
  Users,
  Eye, Plus, Trash2Icon, Pencil
} from "lucide-react";

import InlineAlert from "../../../components/alert/inlineAlert";
import ProjectModal from "../../../features/main/admin/projectmodal";
import ProjectForm from "../../../components/main/admin/forms/adminprojectform";
import Pagination from "../../../components/common/paginations"; 
import useProjectManagement from "../../../hooks/main/admin/projectManagement";

export default function ProjectsPage() {

  const [openModal, setOpenModal] = useState({

    open: false,

    mode: "create",

    data: null,

  });

  const handleClose = () => {

    setOpenModal({ open: false, mode: "create", data: null});

    setError({});

  }

  const {

      formData, handleChange, handleSubmit, handleDelete,
      fileInputRef,
      projects, fetchAllProjects,
      pagination, error, setError, loading, alert, setAlert

  } = useProjectManagement(openModal.mode, openModal.data);

  useEffect(() => {

    fetchAllProjects(0, 10);

  }, [fetchAllProjects]);

  const handlePageChange = (page) => {

    fetchAllProjects(page - 1 , pagination.pageSize)
  }

  const handleFormSubmit = async (e) => {

    e.preventDefault();

    await handleSubmit(e);

  }
 
  return (
    <div className="p-6 bg-[#f5f6f8] min-h-screen md:ml-64">

      {/* HEADER (UNCHANGED) */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <p className="text-xs text-gray-400 uppercase">
            Console • Projects Management
          </p>
          <h1 className="text-3xl font-semibold text-gray-800">
            Active Projects Portfolio
          </h1>
        </div>

        <button
          onClick={() => {
           setOpenModal({
            open:true,
            mode:"create",
            data:null,
           })
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm shadow hover:bg-green-700"
        >
          <PlusCircle size={16} />
          New Project
        </button>
      </div>

      {/* TOP CARDS (UNCHANGED) */}
      <div className="grid md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-5 rounded-xl shadow-sm">
          <div className="flex items-center gap-2 text-gray-400 text-xs uppercase">
            <Wallet size={14} />
            Total Funding Secured
          </div>
          <h2 className="text-2xl font-semibold mt-2 text-black">
            $2.48M
          </h2>
          <p className="text-green-600 text-sm mt-1 flex items-center gap-1">
            <TrendingUp size={14} />
            12.5% increase
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm">
          <p className="text-xs text-gray-400 uppercase mb-3">
            Portfolio Allocation
          </p>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden flex">
            <div className="bg-yellow-600 w-32 h-full" />
            <div className="bg-green-600 w-24 h-full" />
            <div className="bg-yellow-400 w-12 h-full" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm flex flex-col justify-center">
          <p className="text-xs text-gray-400 uppercase">
            Active Projects
          </p>
          <h2 className="text-3xl font-semibold mt-2 text-black">
            {}
          </h2>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-6">
        <h2 className="font-semibold mb-4 text-gray-800">
          Project Directory
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase border-b">
              <tr>
                <th className="py-3">Project</th>
                <th>Type</th>
                <th>Status</th>
                <th>Budget</th>
                <th>Description</th>
                <th>Funding Progress</th>  
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
                ): projects.length > 0 ? (

                  projects.map((item) => (
                       <tr
                  key={item.projectid}
                  className="border-b last:border-none  hover:bg-gray-100"

                >
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`${import.meta.env.VITE_API_PHOTO_URL}${item.projectphoto}`}
                        className="w-9 h-9 rounded-full object-cover border"
                      />
                      <span className="font-medium text-gray-500">
                        {item.projectname}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-700">
                      {item.type}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        item.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Completed"
                          ? "bg-gray-200 text-gray-700"
                          : "bg-red-200 text-red-500"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                        <td>
                    <span className="font-medium text-gray-500">
                        {item.budget}
                      </span>
                  </td>
                    <td>
                      <span className="w-32 block truncate font-medium text-gray-500">
                        {item.description}
                      </span>
                    </td>
                  <td className="w-[260px]">
                    <div className="flex items-center gap-3">
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-green-600 h-2"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500 w-10">
                        {item.progress}% 
                      </span>
                    </div>
                  </td>
                   <td className="flex items-center justify-center gap-2 pt-6">
                                                              <Pencil
                                                                  size={16}
                                                                  className="text-gray-400 cursor-pointer group-hover:scale-110 transition"
                                                                  onClick={() => setOpenModal({ open: true, mode: "edit", data: item })}
                                                              />
                                                              <Trash2Icon
                                                                  size={16}
                                                                  onClick={() => handleDelete(item.projectid)}
                                                                  className="text-gray-400 cursor-pointer group-hover:scale-110 transition"
                                                              />
                                                          </td>
                </tr>
                  ))

                ) : (
                  <tr>
                                    <td colSpan={6} className="text-center py-10 text-gray-500">
                                         {error.general ? (

                                          <InlineAlert
                                            type="error"
                                            message={error.general}
                                          />

                                        ) : projects.length === 0 ? (

                                          <p className="text-gray-500 text-sm">
                                            No projects found
                                          </p>

                                        ) : null}
                                    </td>
                                </tr>  
                )}
               
            
            </tbody>
          </table>
        </div>

        {/* PAGINATION (UNCHANGED) */}
        <Pagination
            currentPage={pagination.currentPage + 1}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalElements}
            itemsPerPage={pagination.pageSize}
            onPageChange={handlePageChange}
        />
      </div>


     {/* MODAL */}
                <ProjectModal
                     isOpen={openModal.open}
                      title={openModal.mode === "create" ? "Create project" : "Edit Post"}  // ← add this
                      onClose={handleClose}
                >
                    {openModal.open && formData && (
                        <ProjectForm
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
  
                </ProjectModal>

    </div>
  );
}