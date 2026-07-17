import React, { useEffect, useState } from 'react';

import { ShieldCheck, ArrowUpRightFromSquare, ArrowRight } from 'lucide-react';

import { FaArrowRight } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import images from '../../../public/assets/main/images/gatheringhome.jpg';


import useProjectManagement from '../../hooks/main/admin/projectManagement';

import useContentManagement from '../../hooks/main/admin/contentManagement';
import DevNoticeModal from '../../components/noticeFromDev/noticeFromDev';

// ─── Motion variants (centralized, reusable) ──────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

const slideLeft = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const viewportOnce = { once: true, margin: "-50px" };

const Homepage = () => {

  const { fetchLatestUpdate, latestUpdate } = useContentManagement();

  const { fetchFeaturedProjects, fetchProject } = useProjectManagement();

  const [detailModal, setDetailModal] = useState({ open: false, image: null, title: "", description: "" });

  const openDetailModal = (image, title, description) => {
    setDetailModal({ open: true, image, title, description });
  };

  const closeDetailModal = () => {
    setDetailModal({ open: false, image: null, title: "", description: "" });
  };

  useEffect(() => {

    fetchFeaturedProjects(0, 4);

  }, [fetchFeaturedProjects]);

  useEffect(() => {

    fetchLatestUpdate(0, 4);

  }, [fetchLatestUpdate]);

  const chunkArray = (arr, size) => {

    const result = [];

    for (let i = 0; i < arr.length; i += size) {

      result.push(arr.slice(i, i + size));

    }

    return result;

  };

  return (
    <>
      {/* hero section cooperative */}
      <div className="bg-white p-0">
        <div className="lg:container mx-auto max-w-[1200px] mb-20">
          <div className="grid md:grid-cols-2 gap-7 md:gap-2 mt-20 md:mt-20 lg:mt-28 items-center px-2">

            <motion.div
              className="flex flex-col"
              initial="hidden"
              animate="show"
              variants={fadeUp}
            >
              <div className="flex self-start bg-green-100 text-green-800 items-center gap-1 text-xs font-bold rounded-full tracking-widest px-4 py-1.5 uppercase">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                Community Driven Success
              </div>

              <div className="font-dm-sans text-black text-5xl sm:text-7xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mt-6 leading-[1.05]">
                <h1>
                  Empowering <br />
                  <span className="bg-yellow-300 px-2 w-fit inline-block rounded-sm">
                    Communities,
                  </span>{" "}
                  <br />
                  Sustaining <br />
                  Features.
                </h1>
              </div>

              <div className="text-gray-500 text-sm md:text-base lg:text-lg mt-6 tracking-wide leading-relaxed max-w-md">
                Join our cooperative to build a more sustainable and equitable future for everyone.
                We connect local talent with global opportunities.
              </div>

              <div className="flex gap-4 mt-8">
                <button className="bg-green-700 text-white px-7 py-3 rounded-full flex items-center gap-2 font-bold text-xs tracking-wide hover:bg-green-800 transition duration-300 shadow-sm">
                  Get Started <FaArrowRight />
                </button>
                 
                              
                <Link to="/projects" className="bg-white text-green-800 border-2 border-green-700 px-7 py-3 rounded-full font-bold text-xs tracking-wide hover:bg-green-50 transition duration-300">
                   
                  View Projects
                </Link>
             
              </div>
            </motion.div>

            <motion.div
              className="flex justify-center items-center"
              initial="hidden"
              animate="show"
              variants={slideRight}
            >
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-xl ">
                <img
                  src={images}
                  alt="ATMPC Members Gathering"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </div>

      {/* numbers about cooperative */}
      <div className="bg-green-900">
        <div className="lg:container mx-auto max-w-[1200px]">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 py-14 px-2"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            <motion.div className="text-white flex flex-col gap-1 px-4 border-r border-green-700 last:border-r-0" variants={staggerItem}>
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight">20+</span>
              <span className="text-green-300 font-medium tracking-widest text-xs uppercase">Members</span>
            </motion.div>
            <motion.div className="text-white flex flex-col gap-1 px-4 border-r border-green-700 last:border-r-0" variants={staggerItem}>
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight">8+</span>
              <span className="text-green-300 font-medium tracking-widest text-xs uppercase">Active Projects</span>
            </motion.div>
            <motion.div className="text-white flex flex-col gap-1 px-4 border-r border-green-700 last:border-r-0" variants={staggerItem}>
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight">2+</span>
              <span className="text-green-300 font-medium tracking-widest text-xs uppercase">Communities</span>
            </motion.div>
            <motion.div className="text-white flex flex-col gap-1 px-4" variants={staggerItem}>
              <span className="text-4xl md:text-5xl font-extrabold tracking-tight">8+</span>
              <span className="text-green-300 font-medium tracking-widest text-xs uppercase">Services</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* featured projects section */}
      <div className="bg-white">
        <div className="lg:container mx-auto max-w-[1200px] py-20 px-2">
          <motion.div
            className="text-black text-2xl font-extrabold tracking-tight"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            Featured Projects
          </motion.div>
          <motion.div
            className="flex items-center justify-between mt-2"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            <div className="text-gray-500 text-sm md:text-base tracking-wide">
              Innovative initiatives making a difference today.
            </div>
            <div className="text-green-700 flex flex-row items-center tracking-wide text-xs font-semibold gap-1 cursor-pointer hover:text-green-900 transition">
              
                 <a
                                href="/projects"
                              
                            className="flex flex-row gap-1 items-center">
              View All
           
              <ArrowUpRightFromSquare className="w-4 h-4 cursor-pointer" />
                 </a>
            </div>
          </motion.div>

          <div className="flex justify-center">
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 lg:gap-2 md:gap-3 sm:gap-4 xl:gap-8 gap-2 mt-8 xl:flex xl:justify-items-center"
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={staggerContainer}
            >

              {fetchProject.map((item) => (

                <motion.div
                  key={item.projectid || item.projectname}
                  onClick={() => openDetailModal(
                    `${import.meta.env.VITE_API_PHOTO_URL}${item.projectphoto}`,
                    item.projectname,
                    item.description
                  )}
                  className="card group w-full max-w-[280px] bg-white border border-gray-100 rounded-2xl pb-5 shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
                  variants={staggerItem}
                >
                  <div className="card-content rounded-2xl h-72">
                    <div className="card-image-content rounded-t-2xl w-full h-36 relative overflow-hidden">
                      <img
                        src={`${import.meta.env.VITE_API_PHOTO_URL}${item.projectphoto}`}
                        alt={item.projectname}
                        className="w-full h-full object-cover rounded-t-2xl group-hover:scale-105 transition duration-500"
                      />
                      <div
                        className={`absolute top-3 right-2 px-2 py-1 rounded-full text-xs font-semibold tracking-wide transition duration-500
                          ${item.status === "Active"
                            ? "bg-green-600 text-white group-hover:bg-gray-200 group-hover:text-black"
                            : item.status === "In Progress"
                            ? "bg-yellow-100 text-yellow-900 group-hover:bg-gray-200 group-hover:text-black"
                            : "bg-gray-900 text-white group-hover:bg-gray-200 group-hover:text-black"}
                        `}
                      >
                        {item.status}
                      </div>
                    </div>
                    <div className="title text-black text-xs lg:text-sm font-semibold tracking-tight p-3 leading-snug">
                      {item.projectname}
                    </div>
                    <div className="image-description px-3 flex flex-col text-xs text-gray-400 overflow-y-auto max-h-24 scrollbar-hidden tracking-wide leading-relaxed">
                      {item.description}
                    </div>
                  </div>
                </motion.div>

              ))}

            </motion.div>
          </div>

          {/* News Updates */}
          <div className="bg-white">
            <div className="lg:container mx-auto max-w-[1200px] mt-32 mb-16">

              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Section */}
                <motion.div
                  className="flex flex-col rounded-xl p-1"
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={slideLeft}
                >
                  <div className="text-black text-2xl font-extrabold tracking-tight leading-snug">
                    Latest Announcements and Updates
                  </div>

                  <div className="text-gray-500 text-sm md:text-base tracking-wide mt-5 leading-relaxed">
                    Stay informed about our latest milestones, community meetings, and policy changes.
                  </div>

                  <div className="flex flex-row">
                    <div className="text-green-700 font-semibold text-xs mt-4 tracking-wide flex flex-row gap-1 cursor-pointer hover:text-green-900 transition items-center">
                       <a
                                href="/news&event"
                              
                            className="flex flex-row gap-1 items-center">
                      Go to Newsroom
                      <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Right Section */}
                <motion.div
                  className="md:col-span-2 flex flex-col gap-3"
                  initial="hidden"
                  whileInView="show"
                  viewport={viewportOnce}
                  variants={slideRight}
                >

                  {chunkArray(latestUpdate || [], 2).map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-3">

                      {row.map((item) => (
                        <div
                          key={item.contentid}
                          onClick={() => openDetailModal(
                            `${import.meta.env.VITE_API_PHOTO_URL}${item.contentphoto}`,
                            item.title,
                            item.description
                          )}
                          className="card-white flex flex-row gap-3 rounded-xl p-3 border border-gray-100 hover:border-green-200 hover:shadow-sm transition duration-300 cursor-pointer"
                        >
                          <div className="Image-news w-24 h-24 relative flex-shrink-0 rounded-xl overflow-hidden">
                            <img
                              src={`${import.meta.env.VITE_API_PHOTO_URL}${item.contentphoto}`}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="Image-news-description flex flex-col justify-center">
                            <div className="title text-xs lg:text-sm font-semibold text-gray-800 px-1 py-1 leading-snug">
                              {item.title}
                            </div>

                            <div className="description text-xs text-gray-400 px-1 py-1 tracking-wide overflow-y-auto max-h-40 scrollbar-hidden leading-relaxed">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      ))}

                    </div>
                  ))}

                </motion.div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Detail Modal - shared by Featured Projects & Latest Announcements */}
      {detailModal.open && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          onClick={closeDetailModal}
        >
          <div
            className="bg-white rounded-2xl shadow-lg w-full max-w-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-56">
              <img
                src={detailModal.image}
                alt={detailModal.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={closeDetailModal}
                className="absolute top-3 right-3 bg-white/90 hover:bg-white text-gray-600 hover:text-gray-900 rounded-full w-8 h-8 flex items-center justify-center text-lg leading-none shadow-sm transition"
              >
                &times;
              </button>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">{detailModal.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed max-h-64 overflow-y-auto">
                {detailModal.description}
              </p>
            </div>
          </div>
        </div>
      )}

      <DevNoticeModal />
    </>
  );
};

export default Homepage;