import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import images from '../../../public/assets/services/RentalServices/images/homeimage.jpg';
import { FaMoneyBill, FaArrowRight, FaPrint, FaHandHoldingUsd, FaPills, FaShoppingBag, FaLaptopCode, FaUtensils, FaCode, FaHome } from 'react-icons/fa';
import DevNoticeModal from '../../components/noticeFromDev/noticeFromDev';

// ─── Motion variants (centralized, reusable) ──────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideRight = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
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



const viewportOnce = { once: true, margin: "-50px", amount: 0.2 };

const CATEGORIES = [
  { key: 'all',        label: 'All Services' },
  { key: 'financial',  label: 'Financial Support' },
  { key: 'technology', label: 'Technology' },
  { key: 'community',  label: 'Community Services' },
  { key: 'marketing',  label: 'Marketing' },
];

const SERVICES = [
  {
    id: 1,
    category: 'marketing',
    icon: <FaPrint className="text-green-700 text-xl group-hover:text-white transition duration-500" />,
    title: 'Digital Printing and Customization Services',
    description:
      'We provide customized printing and personalization services including acrylic awards, medals, t-shirt printing, ID lace printing, souvenirs, and promotional materials.',
  },
  {
    id: 2,
    category: 'financial',
    icon: <FaHandHoldingUsd className="text-green-700 text-xl group-hover:text-white transition duration-500" />,
    title: 'Islamic Financial Services',
    description:
      'We provide ethical and Sharia-compliant financial services that promote responsible financing, mutual support, and community growth.',
  },
  {
    id: 3,
    category: 'community',
    icon: <FaUtensils className="text-green-700 text-xl group-hover:text-white transition duration-500" />,
    title: 'Food Court Services',
    description:
      'We provide an affordable and student-friendly food court that offers quality meals, snacks, and beverages in a comfortable and accessible environment for students, employees, and visitors.',
  },
  {
    id: 4,
    category: 'community',
    icon: <FaPills className="text-green-700 text-xl group-hover:text-white transition duration-500" />,
    title: 'Pharmacy Services',
    description:
      'We offer reliable pharmaceutical services with quality medicines, medical supplies, and healthcare essentials while ensuring customer care, accessibility, and professional service.',
  },
  {
    id: 5,
    category: 'marketing',
    icon: <FaShoppingBag className="text-green-700 text-xl group-hover:text-white transition duration-500" />,
    title: 'General Merchandise Services',
    description:
      'We offer a variety of general merchandise products such as school supplies, office essentials, and daily necessities with a focus on affordability, quality, and convenience.',
  },
  {
    id: 6,
    category: 'technology',
    icon: <FaLaptopCode className="text-green-700 text-xl group-hover:text-white transition duration-500" />,
    title: 'IT Training Services',
    description:
      'We offer IT training programs focused on computer literacy, software applications, digital technologies, and technical skills development to prepare individuals for academic, professional, and business opportunities.',
  },
  {
    id: 7,
    category: 'technology',
    icon: <FaCode className="text-green-700 text-xl group-hover:text-white transition duration-500" />,
    title: 'IT Solutions',
    description:
      'We offer comprehensive IT solutions including software development, system integration, technical support, and digital transformation services to help clients streamline operations and adapt to modern technology.',
  },
  {
    id: 8,
    category: 'community',
    icon: <FaHome className="text-green-700 text-xl group-hover:text-white transition duration-500" />,
    title: 'Rental Services',
    description:
      'We provide student-focused rental housing that is affordable, secure, and accessible. Our goal is to support students by offering quality living spaces that promote convenience, safety, and a productive study environment.',
  },
];

const Servicepage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();

  // If your layout scrolls an inner div instead of the window, point this ref
  // at that scrollable container (e.g. by adding ref={scrollRef} on it in your
  // layout component) and pass scrollRef into viewport={{ root: scrollRef }} below.
  const scrollRef = useRef(null);

  const filtered = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* Service hero section */}
      <div className="bg-white">
        <div className="lg:container mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 px-2 py-20 md:py-24 lg:py-32 md:grid-cols-2 gap-7 md:gap-2 items-center">
            <motion.div
              className="flex flex-col"
              initial="hidden"
              animate="show"
              variants={fadeUp}
            >
              <div className="flex self-start bg-green-100 text-green-800 items-center gap-1 text-xs font-bold rounded-full tracking-widest uppercase px-4 py-1.5">
                Our Mission
              </div>
              <div className="font-dm-sans text-black text-5xl sm:text-7xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mt-6">
                <h1>Empowering members through collective strength.</h1>
              </div>
              <div className="text-gray-500 text-sm md:text-base lg:text-lg mt-6 tracking-wide leading-relaxed max-w-md">
                Discover how our cooperative provides the specialized tools, financial support, and
                community resources you need to thrive in today's landscape.
              </div>
              <div className="flex gap-4 mt-8">
                <button className="bg-green-700 text-white px-7 py-3 rounded-full flex justify-center items-center gap-2 font-bold text-xs tracking-wide hover:bg-green-800 transition duration-300 shadow-sm">
                  Join the Cooperative
                </button>
                <button className="bg-white text-green-800 border-2 border-green-700 px-7 py-3 rounded-full font-bold text-xs tracking-wide hover:bg-green-50 transition duration-300">
                  View Case Studies
                </button>
              </div>
            </motion.div>
            <motion.div
              className="flex justify-center items-center"
              initial="hidden"
              animate="show"
              variants={slideRight}
            >
              <div className="w-full h-96 rounded-2xl overflow-hidden shadow-xl">
                <img src={images} alt="ATMPC Gathering member" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* All services section */}
      <div className="bg-gray-50">
        <div className="lg:container mx-auto max-w-[1200px] py-10 px-2">

          {/* Desktop tabs */}
          <motion.div
            className="hidden md:flex flex-row items-center text-gray-500 text-xs tracking-wide border-b border-gray-200"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={fadeUp}
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-4 cursor-pointer border-b-2 -mb-px transition duration-300 ${
                  activeCategory === cat.key
                    ? 'border-green-700 text-green-700 font-semibold'
                    : 'border-transparent hover:border-green-400 hover:text-green-700'
                }`}
              >
                {cat.label}
              </div>
            ))}
          </motion.div>

          {/* Mobile select */}
          <select
            className="block md:hidden w-full p-3 border border-gray-200 rounded-xl bg-white text-gray-700 text-xs tracking-wide shadow-sm"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat.key} value={cat.key}>
                {cat.label}
              </option>
            ))}
          </select>

          {/* Service cards */}
          <motion.div
            key={activeCategory}
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 gap-6 py-14 md:px-4"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={staggerContainer}
          >
            {filtered.length > 0 ? (
              filtered.map((service) => (
                <motion.div
                  key={service.id}
                  variants={staggerItem}
                  onClick={() => service.id === 8 && navigate('/services/RentalServices/')}
                  className="group bg-white border border-gray-100 hover:border-green-200 rounded-2xl flex flex-col gap-4 p-6 cursor-pointer shadow-sm hover:shadow-lg transition duration-300"
                >
                  <div className="self-start rounded-xl p-3 bg-green-100 group-hover:bg-green-700 transition duration-500">
                    {service.icon}
                  </div>
                  <div className="text-black text-xs sm:text-sm lg:text-base tracking-tight font-bold leading-snug">
                    {service.title}
                  </div>
                  <div className="text-gray-400 text-xs tracking-wide leading-relaxed overflow-y-auto max-h-24 scrollbar-hidden">
                    {service.description}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center text-gray-400 text-sm py-10">
                No services found for this category.
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Get in touch section */}
      <div className="bg-green-900">
        <div className="lg:container mx-auto max-w-[1200px]">
          <motion.div
            className="flex flex-col gap-6 py-20 items-center justify-center px-2 lg:px-0"
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            variants={scaleIn}
          >
            <div className="title text-white font-extrabold tracking-tight text-xl md:text-2xl lg:text-4xl text-center leading-tight">
              Don't see what you're looking for?
            </div>
            <div className="text-green-300 text-xs sm:text-sm text-center max-w-md leading-relaxed">
              Our cooperative is constantly evolving. If you have a specific need or suggestion for a
              new service, we want to hear from you.
            </div>
            <div className="flex flex-row gap-4 mt-2">
              <button className="bg-yellow-400 text-black font-bold text-xs sm:text-sm tracking-wide px-7 py-3 rounded-full hover:bg-yellow-300 transition duration-300 shadow-sm">
                Get In Touch
              </button>
              <button className="bg-transparent text-white border-2 border-white font-semibold text-xs sm:text-sm tracking-wide px-7 py-3 rounded-full hover:bg-white hover:text-green-900 transition duration-300">
                Request a Call
              </button>
            </div>
          </motion.div>
        </div>
      </div>
      <DevNoticeModal/>
    </>
  );
};

export default Servicepage;