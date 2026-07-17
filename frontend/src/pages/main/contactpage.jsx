import { FaEnvelope, FaMapMarker, FaPhone } from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { motion } from "framer-motion";
import InlineAlert from "../../components/alert/inlineAlert";
import useMessageManagement from "../../hooks/main/admin/messageManagement";
import Turnstile from "react-turnstile";
import DevNoticeModal from "../../components/noticeFromDev/noticeFromDev";

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

const Contactpage = () =>{

    const { 
        formData, 
        handleChange,
        handleSubmit,
        error, 
        alert,
        loading,
        captchaToken,
        setCaptchaToken,
        turnstileRef,
        captchaKey,
        setCaptchaKey
     } = useMessageManagement();

    return(
        <>
            <div className="bg-white">
                <div className="lg:container mx-auto max-w-[1200px]">
                    <div className="px-2 py-20 md:py-24 lg:py-32 gap-7 md:gap-2 items-center">
                        <div className="flex flex-col">

                            <motion.div
                                className="flex self-start bg-green-100 text-green-800 items-center gap-1 text-xs font-bold rounded-full tracking-widest uppercase px-4 py-1.5"
                                initial="hidden"
                                animate="show"
                                variants={fadeUp}
                            >
                                Contact Support
                            </motion.div>

                            <motion.div
                                className="font-dm-sans text-black text-5xl sm:text-7xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mt-6"
                                initial="hidden"
                                animate="show"
                                variants={fadeUp}
                            >
                                Get in Touch &<br />
                                Become a Member
                            </motion.div>

                            <motion.div
                                className="text-gray-500 text-sm md:text-base lg:text-lg mt-6 tracking-wide leading-relaxed max-w-xl"
                                initial="hidden"
                                animate="show"
                                variants={fadeUp}
                            >
                                Discover how our cooperative provides the specialized tools,
                                financial support, and community resources you
                                need to thrive in today's landscape.
                            </motion.div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-10">

                                {/* Form */}
                                <motion.form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-5 border border-gray-100 rounded-2xl py-10 px-6 shadow-sm"
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={viewportOnce}
                                    variants={slideLeft}
                                >
                                    <div className="text-black text-lg tracking-tight font-bold">
                                        Send us a Message
                                    </div>

                                    <InlineAlert
                                        type={alert?.type}
                                        message={alert?.message}
                                    />

                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <div className="flex flex-col gap-1.5 w-full">
                                            <label className="text-gray-400 font-semibold text-xs tracking-widest uppercase">Full Name</label>
                                            <input
                                                name="fullname"
                                                value={formData.fullname}
                                                onChange={handleChange}
                                                className="bg-gray-50 text-black border border-gray-200 rounded-xl text-sm px-3 py-2.5 tracking-wide focus:outline-none focus:border-green-400 transition"
                                                placeholder="John Doe"
                                            />
                                            {error.fullname && <p className="text-red-500 text-xs">{error.fullname}</p>}
                                        </div>
                                        <div className="flex flex-col gap-1.5 w-full">
                                            <label className="text-gray-400 font-semibold text-xs tracking-widest uppercase">Email Address</label>
                                            <input
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="bg-gray-50 text-black border border-gray-200 rounded-xl text-sm px-3 py-2.5 tracking-wide focus:outline-none focus:border-green-400 transition"
                                                placeholder="JohnDoe@gmail.com"
                                            />
                                            {error.email && <p className="text-red-500 text-xs">{error.email}</p>}
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-1.5 w-full">
                                        <label className="text-gray-400 font-semibold text-xs tracking-widest uppercase">Subject</label>
                                        <select
                                            name="subjecttype"
                                            value={formData.subjecttype}
                                            onChange={handleChange}
                                            className="flex w-full px-3 py-2.5 bg-gray-50 text-black border border-gray-200 text-xs tracking-wide rounded-xl focus:outline-none focus:border-green-400 transition">
                                            <option value="">Select Subject</option>
                                            <option>General Inquiry</option>
                                            <option>Collaboration Partnership</option>
                                            <option>Other</option>
                                        </select>
                                        {error.subjecttype && <p className="text-red-500 text-xs">{error.subjecttype}</p>}
                                    </div>

                                    <div className="flex flex-col gap-1.5 w-full">
                                        <label className="text-gray-400 font-semibold text-xs tracking-widest uppercase">Your Message</label>
                                        <textarea
                                            name="messagedesc"
                                            value={formData.messagedesc}
                                            onChange={handleChange}
                                            className="bg-gray-50 text-black text-xs border border-gray-200 tracking-wide px-3 py-2.5 h-32 rounded-xl focus:outline-none focus:border-green-400 transition"
                                            placeholder="Tell us how we can help"
                                        />
                                        {error.messagedesc && <p className="text-red-500 text-xs">{error.messagedesc}</p>}
                                    </div>

                                    <Turnstile
                                        key={captchaKey}
                                        ref={turnstileRef}
                                        sitekey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
                                        options={{ appearance: "always" }}
                                        onVerify={(token) => { setCaptchaToken(token); }}
                                        onExpire={() => { setCaptchaToken(""); }}
                                        onError={() => { setCaptchaToken(""); }}
                                    />

                                    <p className="text-xs text-gray-400 leading-relaxed">
                                        This captcha automatically detects bots. If verification does not complete automatically, please check the box to confirm you are human.
                                    </p>

                                    <button
                                        disabled={loading}
                                        type="submit"
                                        className="bg-green-700 text-white cursor-pointer py-3 rounded-xl font-bold tracking-wide text-sm hover:bg-green-800 transition duration-300 shadow-sm disabled:opacity-60">
                                        {loading ? "Sending..." : "Send Message"}
                                    </button>
                                </motion.form>

                                {/* Contact info */}
                                <motion.div
                                    className="flex flex-col gap-3"
                                    initial="hidden"
                                    whileInView="show"
                                    viewport={viewportOnce}
                                    variants={staggerContainer}
                                >
                                    <motion.div
                                        className="flex flex-row gap-3 rounded-2xl items-center p-5 bg-green-50 border border-green-100"
                                        variants={staggerItem}
                                    >
                                        <div className="bg-white p-3 text-green-700 rounded-xl shadow-sm">
                                            <FaEnvelope/>
                                        </div>
                                        <div className="flex flex-col text-gray-500 gap-0.5 text-xs">
                                            <span className="text-black font-bold text-sm">Email Us</span>
                                            atmpcofficial@gmail.com
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex flex-row gap-3 rounded-2xl items-center p-5 bg-yellow-50 border border-yellow-100"
                                        variants={staggerItem}
                                    >
                                        <div className="bg-white p-3 text-yellow-600 rounded-xl shadow-sm">
                                            <FaPhone/>
                                        </div>
                                        <div className="flex flex-col text-gray-500 gap-0.5 text-xs">
                                            <span className="text-black font-bold text-sm">Contact Us</span>
                                            0924-110-0542
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="flex flex-row gap-3 rounded-2xl items-start p-5 bg-gray-50 border border-gray-100"
                                        variants={staggerItem}
                                    >
                                        <div className="bg-white p-3 text-gray-600 rounded-xl shadow-sm mt-0.5">
                                            <FaMapMarker/>
                                        </div>
                                        <div className="flex flex-col text-gray-500 gap-1 text-xs leading-relaxed">
                                            <span className="text-black font-bold text-sm">Visit Us</span>
                                            <span>Marawi Poblacion, Marawi City, Lanao Del Sur, Philippines</span>
                                            <span>22nd Street, Brgy. Nazareth, Cagayan De Oro City, Misamis Oriental, Philippines</span>
                                        </div>
                                    </motion.div>

                                    <motion.div variants={staggerItem}>
                                        <MapContainer
                                            className="rounded-2xl overflow-hidden shadow-sm"
                                            center={[8.00149879203555, 124.28329276748134]}
                                            zoom={13}
                                            style={{ height: "250px", width: "100%", zIndex: 9 }}
                                        >
                                            <TileLayer
                                                attribution='&copy; OpenStreetMap contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={[8.00149879203555, 124.28329276748134]}>
                                                <Popup>You are here</Popup>
                                            </Marker>
                                        </MapContainer>
                                    </motion.div>
                                </motion.div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DevNoticeModal/>
        </>
    )
}

export default Contactpage;