import {  FaPeopleCarry, FaMapMarkedAlt, FaArrowRight, FaCalendar , FaNewspaper, FaCameraRetro, FaMicrophone, FaBlog} from "react-icons/fa";
import React, {useEffect, useState} from "react";
import { motion, AnimatePresence } from "framer-motion";
import images from '../../../public/assets/services/RentalServices/images/renterimage.jpg';
import Pagination from "../../components/common/paginations";
import useContentManagement from "../../hooks/main/admin/contentManagement";
import DevNoticeModal from "../../components/noticeFromDev/noticeFromDev";

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

const Newseventpage = () =>{

    const {pagination, newsAndEvents, fetchNewsAndEvents} = useContentManagement();

    const [type, setType] = useState("News");

    const [selectedItem, setSelectedItem] = useState(null);

    const newsOnly = newsAndEvents.filter(
        (item) => item.type === "News"
    );

    const eventsOnly = newsAndEvents.filter(
        (item) => item.type === "Event"
    );

    useEffect(() => {
        fetchNewsAndEvents(0, 4, "News");
    }, [fetchNewsAndEvents]);

    const handlePageChange = (page) => {
        fetchNewsAndEvents(page - 1 , pagination.pageSize, type)
    }

    return(
        <>
            {/* News event hero section */}
            <div className="bg-white">
                <div className="lg:container mx-auto max-w-[1200px]">
                    <div className="flex flex-col px-2 gap-4 py-32">

                        <motion.div
                            className="font-dm-sans text-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                        >
                            The Collective Hub
                        </motion.div>
                        <motion.div
                            className="text-gray-500 text-sm md:text-base lg:text-lg tracking-wide leading-relaxed max-w-xl"
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                        >
                            Staying connected, celebrating growth and sharing our vision for a sustainable
                            cooperative future.
                        </motion.div>

                        <Pagination
                            currentPage={pagination.currentPage + 1}
                            totalPages={pagination.totalPages}
                            totalItems={pagination.totalElements}
                            itemsPerPage={pagination.pageSize}
                            onPageChange={(page) =>
                                fetchNewsAndEvents(page - 1, 4, type)
                            }
                        />

                        {/* Latest News heading */}
                        <motion.div
                            className="text-black text-base md:text-2xl lg:text-3xl tracking-tight font-extrabold pt-6 pb-2"
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                        >
                            Latest News
                        </motion.div>
                        <div className="h-1 w-16 bg-yellow-400 rounded-full mb-4"></div>

                        {/* News cards */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                            initial="hidden"
                            animate="show"
                            variants={staggerContainer}
                        >
                            {newsOnly.length > 0 ? (
                                newsOnly.map(item => (
                                    <motion.div
                                        key={item.contentid}
                                        variants={staggerItem}
                                        onClick={() => setSelectedItem(item)}
                                        className="group bg-white border border-gray-100 rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
                                    >
                                        <div className="card-image-content w-full h-40 relative overflow-hidden">
                                            <img
                                                src={`${import.meta.env.VITE_API_PHOTO_URL}${item.contentphoto}`}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                            />
                                        </div>
                                        <div className="description flex flex-col px-4 py-5 gap-3 flex-1">
                                            <div className="title text-black text-sm lg:text-base font-bold tracking-tight leading-snug">
                                                {item.title}
                                            </div>
                                            <div className="image-description text-xs w-full text-gray-400 overflow-y-auto max-h-20 scrollbar-hidden tracking-wide leading-relaxed">
                                                {item.description}
                                            </div>
                                            <button className="text-green-700 font-semibold tracking-wide text-xs md:text-sm py-1 flex flex-row items-center gap-1 justify-start hover:text-green-900 transition duration-200">
                                                Read Story <FaArrowRight/>
                                            </button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-400 text-sm py-10">
                                    No news found.
                                </div>
                            )}
                        </motion.div>

                        {/* Past Events heading */}
                        <motion.div
                            className="text-black text-base md:text-2xl lg:text-3xl tracking-tight font-extrabold pt-10 pb-2"
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                        >
                            Past Events
                        </motion.div>
                        <div className="h-1 w-16 bg-yellow-400 rounded-full mb-4"></div>

                        {/* Events cards */}
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                            initial="hidden"
                            animate="show"
                            variants={staggerContainer}
                        >
                            {eventsOnly.length > 0 ? (
                                eventsOnly.map(item => (
                                    <motion.div
                                        key={item.contentid}
                                        variants={staggerItem}
                                        onClick={() => setSelectedItem(item)}
                                        className="group card-image-content w-full h-64 relative rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 cursor-pointer"
                                    >
                                        <img
                                            src={`${import.meta.env.VITE_API_PHOTO_URL}${item.contentphoto}`}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10"></div>
                                        <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1 z-20">
                                            <div className="text-white text-sm font-bold leading-snug tracking-tight">
                                                {item.title}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-gray-400 text-sm py-10">
                                    No events found.
                                </div>
                            )}
                        </motion.div>

                    </div>
                </div>
            </div>

            {/* Detail Modal */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
                            initial={{ opacity: 0, scale: 0.92, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }}
                            exit={{ opacity: 0, scale: 0.92, y: 30, transition: { duration: 0.2 } }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image */}
                            <div className="w-full h-56 relative overflow-hidden">
                                <img
                                    src={`${import.meta.env.VITE_API_PHOTO_URL}${selectedItem.contentphoto}`}
                                    alt={selectedItem.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Type badge */}
                                <span className="absolute top-3 left-3 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full tracking-wide">
                                    {selectedItem.type}
                                </span>
                                {/* Close button */}
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center transition duration-200"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Content */}
                            <div className="px-6 py-5 flex flex-col gap-3">
                                <h2 className="text-black text-lg font-extrabold tracking-tight leading-snug">
                                    {selectedItem.title}
                                </h2>
                                <div className="h-0.5 w-10 bg-yellow-400 rounded-full" />
                                <p className="text-gray-500 text-sm leading-relaxed tracking-wide">
                                    {selectedItem.description}
                                </p>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="mt-2 self-end text-xs font-semibold text-green-700 hover:text-green-900 transition duration-200 flex items-center gap-1"
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

export default Newseventpage;