import { FaArrowRight, FaMapMarkedAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import images from '../../../public/assets/services/RentalServices/images/renterimage.jpg';
import useProjectManagement from '../../hooks/main/admin/projectManagement';
import Pagination from '../../components/common/paginations';
import React, { useEffect, useState } from 'react';
import DevNoticeModal from '../../components/noticeFromDev/noticeFromDev';

// ─── Motion variants (centralized, reusable) ──────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Projectpage = () =>{

    const {projects, fetchAllProjects, handleSeeMore, pagination, loading} = useProjectManagement();

    const [selectedType, setSelectedType] = useState("");

    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {

        fetchAllProjects(0, 10);

    }, [fetchAllProjects]);

      const handlePageChange = (page) => {
        fetchAllProjects(page - 1 , pagination.pageSize)
      }

    return(
        <>
            {/* project page section */}
            <div className="bg-white">
                <div className="lg:container mx-auto max-w-[1200px] py-32">
                    <div className="flex flex-col px-2 gap-4">

                        <motion.div
                            className="font-dm-sans text-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                        >
                            Our Cooperative Projects
                        </motion.div>
                        <motion.div
                            className="text-gray-500 text-sm md:text-base lg:text-lg tracking-wide leading-relaxed max-w-xl"
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                        >
                            Empowering local communities through sustainable initiatives, shared resources,
                            and collective progress. Explore our active ventures below.
                        </motion.div>

                               <Pagination
                            currentPage={pagination.currentPage + 1}
                            totalPages={pagination.totalPages}
                            totalItems={pagination.totalElements}
                            itemsPerPage={pagination.pageSize}
                            onPageChange={handlePageChange}
                        />

                        {/* Desktop filter pills */}
                        <motion.div
                            className="hidden md:flex flex-row items-center text-xs tracking-wide mt-10 font-semibold gap-2 flex-wrap"
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                        >
                            <div
                                onClick={() => { setSelectedType(""); fetchAllProjects(0, 10); }}
                                className="px-5 py-2 bg-green-700 text-white rounded-full font-semibold cursor-pointer hover:bg-green-800 transition duration-300 shadow-sm">
                                All Projects
                            </div>
                            <div
                                onClick={() => setSelectedType("Energy")}
                                className={`px-5 py-2 rounded-full font-semibold cursor-pointer transition duration-300
                                ${selectedType === "Energy"
                                    ? "bg-green-700 text-white shadow-sm"
                                    : "bg-gray-100 text-gray-600 hover:bg-green-700 hover:text-white"
                                }`}>
                                Energy
                            </div>
                            <div
                                onClick={() => setSelectedType("Agriculture")}
                                className={`px-5 py-2 rounded-full font-semibold cursor-pointer transition duration-300
                                ${selectedType === "Agriculture"
                                    ? "bg-green-700 text-white shadow-sm"
                                    : "bg-gray-100 text-gray-600 hover:bg-green-700 hover:text-white"
                                }`}>
                                Agricultural
                            </div>
                            <div
                                onClick={() => setSelectedType("Tech")}
                                className={`px-5 py-2 rounded-full font-semibold cursor-pointer transition duration-300
                                ${selectedType === "Tech"
                                    ? "bg-green-700 text-white shadow-sm"
                                    : "bg-gray-100 text-gray-600 hover:bg-green-700 hover:text-white"
                                }`}>
                                Technology
                            </div>
                            <div
                                onClick={() => setSelectedType("Construction")}
                                className={`px-5 py-2 rounded-full font-semibold cursor-pointer transition duration-300
                                ${selectedType === "Construction"
                                    ? "bg-green-700 text-white shadow-sm"
                                    : "bg-gray-100 text-gray-600 hover:bg-green-700 hover:text-white"
                                }`}>
                                Build and Housing
                            </div>
                        </motion.div>

                        {/* Mobile select */}
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="block md:hidden w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-700 text-xs tracking-wide mt-10 shadow-sm">
                            <option value="">All Projects</option>
                            <option value="Energy">Energy</option>
                            <option value="Agriculture">Agricultural</option>
                            <option value="Tech">Technology</option>
                            <option value="Construction">Build and Housing</option>
                        </select>

                        <Pagination
                            currentPage={pagination.currentPage + 1}
                            totalPages={pagination.totalPages}
                            totalItems={pagination.totalElements}
                            itemsPerPage={pagination.pageSize}
                            onPageChange={handlePageChange}
                        />

                        {/* Project cards */}
                        <motion.div
                            key={selectedType}
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10"
                            initial="hidden"
                            animate="show"
                            variants={staggerContainer}
                        >

                            {projects
                                .filter((item) => selectedType ? item.type === selectedType : true)
                                .map((item) => (

                                    <motion.div
                                        key={item.projectid || item.projectname}
                                        variants={staggerItem}
                                        className="group card bg-white border border-gray-100 rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-lg transition duration-300"
                                    >
                                        <div className="card-image-content w-full h-40 relative overflow-hidden">
                                            <img
                                                src={`${import.meta.env.VITE_API_PHOTO_URL}${item.projectphoto}`}
                                                alt={item.projectname}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                            <div
                                                className={`absolute top-3 right-2 px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide transition duration-500
                                                    ${item.status === "Active"
                                                    ? "bg-green-600 text-white group-hover:bg-gray-200 group-hover:text-black"
                                                    : item.status === "In Progress"
                                                    ? "bg-yellow-100 text-yellow-900 group-hover:bg-gray-200 group-hover:text-black"
                                                    : "bg-gray-900 text-white group-hover:bg-gray-200 group-hover:text-black"}
                                                `}>
                                                {item.status}
                                            </div>
                                        </div>

                                        <div className="hidden">
                                            {item.type}
                                        </div>

                                        <div className="description flex flex-col px-4 py-5 gap-3 flex-1">

                                            <div className="title text-black text-xs lg:text-sm font-bold tracking-tight leading-snug">
                                                {item.projectname}
                                            </div>
                                            <div className="image-description text-xs w-full text-gray-400 overflow-y-auto max-h-16 scrollbar-hidden tracking-wide leading-relaxed">
                                                {item.description}
                                            </div>

                                            <div className="flex flex-row justify-between text-xs font-bold tracking-widest mt-1">
                                                <div className="text-gray-400 uppercase">
                                                    Progress
                                                </div>
                                                <div className="text-green-700">
                                                    {item.progress}%
                                                </div>
                                            </div>
                                            <div className="bg-gray-100 w-full h-1.5 rounded-full overflow-hidden">
                                                <div className="bg-green-600 h-1.5 rounded-full transition-all duration-500" style={{ width: `${item.progress}%` }}></div>
                                            </div>

                                            <div className="flex flex-row justify-between text-gray-400 tracking-wide text-xs">
                                                <div>
                                                    Raised Fund: PHP {item.budget}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setSelectedProject(item)}
                                                className="mt-auto text-green-700 border border-green-200 font-semibold cursor-pointer tracking-wide text-xs py-2 px-4 rounded-xl bg-green-50 hover:bg-green-700 hover:text-white flex flex-row items-center gap-1 justify-center transition duration-300">
                                                View Details <FaArrowRight/>
                                            </button>

                                        </div>
                                    </motion.div>

                                ))}

                        </motion.div>

                    </div>
                </div>
            </div>

            {/* Project Detail Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] flex flex-col"
                            initial={{ opacity: 0, scale: 0.92, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }}
                            exit={{ opacity: 0, scale: 0.92, y: 30, transition: { duration: 0.2 } }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image */}
                            <div className="w-full h-56 relative overflow-hidden flex-shrink-0">
                                <img
                                    src={`${import.meta.env.VITE_API_PHOTO_URL}${selectedProject.projectphoto}`}
                                    alt={selectedProject.projectname}
                                    className="w-full h-full object-cover"
                                />
                                {/* Status badge */}
                                <span
                                    className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full tracking-wide
                                        ${selectedProject.status === "Active"
                                        ? "bg-green-600 text-white"
                                        : selectedProject.status === "In Progress"
                                        ? "bg-yellow-100 text-yellow-900"
                                        : "bg-gray-900 text-white"}
                                    `}>
                                    {selectedProject.status}
                                </span>
                                {/* Type badge */}
                                <span className="absolute top-3 right-10 bg-white/80 text-black text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                                    {selectedProject.type}
                                </span>
                                {/* Close button */}
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center transition duration-200"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Content */}
                            <div className="px-6 py-5 flex flex-col gap-3 overflow-y-auto">
                                <h2 className="text-black text-lg font-extrabold tracking-tight leading-snug">
                                    {selectedProject.projectname}
                                </h2>
                                <div className="h-0.5 w-10 bg-yellow-400 rounded-full" />
                                <p className="text-gray-500 text-sm leading-relaxed tracking-wide">
                                    {selectedProject.description}
                                </p>

                                {/* Progress */}
                                <div className="flex flex-row justify-between text-xs font-bold tracking-widest mt-1">
                                    <div className="text-gray-400 uppercase">Progress</div>
                                    <div className="text-green-700">{selectedProject.progress}%</div>
                                </div>
                                <div className="bg-gray-100 w-full h-1.5 rounded-full overflow-hidden">
                                    <div
                                        className="bg-green-600 h-1.5 rounded-full transition-all duration-500"
                                        style={{ width: `${selectedProject.progress}%` }}
                                    />
                                </div>

                                {/* Budget */}
                                <div className="flex justify-between items-center text-xs text-gray-400 tracking-wide mt-1">
                                    <span>Raised Fund</span>
                                    <span className="font-bold text-gray-700">PHP {selectedProject.budget}</span>
                                </div>

                                {/* Close */}
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="mt-2 w-full py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white text-xs font-bold tracking-wide transition duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <DevNoticeModal/>
        </>
    )

}

export default Projectpage;