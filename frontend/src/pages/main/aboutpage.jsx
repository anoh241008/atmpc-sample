import { FaRocket,FaEye, FaHandHolding, FaLeaf, FaPeopleCarry, FaBalanceScale, FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import images from '../../../public/assets/services/RentalServices/images/chairman.jpg';
import DevNoticeModal from "../../components/noticeFromDev/noticeFromDev";

// ─── Motion variants (centralized, reusable) ──────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideLeft = {
    hidden: { opacity: 0, x: -50 },
    show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
        transition: { staggerChildren: 0.12 },
    },
};

const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const viewportOnce = { once: true, margin: "-50px" };

const Aboutpage = () =>{
    return(
        <>
            <div className="bg-white">
                <div className="lg:container mx-auto max-w-[1200px]">

                    {/* Hero about us */}
                    <div className="grid grid-cols-1 gap-7 md:gap-2 mt-8 md:mt-10 lg:mt-14 items-center px-2 md:p-2">
                        <motion.div
                            clasName="flex flex-cols"
                            initial="hidden"
                            animate="show"
                            variants={fadeUp}
                        >
                            <div className="inline-block bg-green-100 text-green-800 text-xs font-bold rounded-full px-4 py-1.5 mt-20 tracking-widest uppercase">
                                Established 2006
                            </div>
                            <div className="font-dm-sans text-black text-5xl sm:text-7xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mt-6">
                                <h1>
                                    Owned by people, <br />
                                    <span className="bg-yellow-300 px-2 w-fit inline-block rounded-sm">
                                        driven by purpose.
                                    </span>{" "}
                                </h1>
                            </div>
                            <div className="text-gray-500 text-sm md:text-base lg:text-lg mt-6 tracking-wide leading-relaxed max-w-xl">
                                Join our cooperative to build a more sustainable and equitable future for everyone.<br />
                                We connect local talent with global opportunities.
                            </div>
                        </motion.div>
                    </div>

                    {/* Mission, Vision, Goal */}
                    <motion.div
                        className="flex flex-wrap justify-center gap-6 mt-20 sm:mt-32 md:mt-24 lg:mt-36 px-2 "
                        initial="hidden"
                        whileInView="show"
                        viewport={viewportOnce}
                        variants={staggerContainer}
                    >
                        <motion.div className="group w-full sm:w-[320px] md:w-[450px] flex flex-col gap-4 border border-gray-100 rounded-2xl p-8 hover:bg-green-900 transition duration-500 shadow-sm hover:shadow-lg" variants={staggerItem}>
                            <div className="inline-block">
                                <FaRocket className="text-yellow-400 w-8 h-10"/>
                            </div>
                            <div className="text-black text-sm md:text-base lg:text-lg font-bold tracking-tight group-hover:text-white transition duration-500">
                                Our Mission
                            </div>
                            <div className="text-gray-400 text-xs sm:text-sm group-hover:text-green-200 overflow-y-auto max-h-24 scrollbar-hidden tracking-wide leading-relaxed transition duration-500">
                                Continuous econmic well being, through believing and God fearing members and sustained outreaching community services.
                            </div>
                        </motion.div>
                        <motion.div className="group w-full sm:w-[320px] md:w-[450px] flex flex-col gap-4 border border-gray-100 rounded-2xl p-8 hover:bg-green-900 transition duration-500 shadow-sm hover:shadow-lg" variants={staggerItem}>
                            <div className="inline-block">
                                <FaEye className="text-yellow-400 w-8 h-10"/>
                            </div>
                            <div className="text-black text-sm md:text-base lg:text-lg font-bold tracking-tight group-hover:text-white transition duration-500">
                                Our Vision
                            </div>
                            <div className="text-gray-400 text-xs sm:text-sm group-hover:text-green-200 overflow-y-auto max-h-24 scrollbar-hidden tracking-wide leading-relaxed transition duration-500">
                               To promote education, social, spritual and economic well being under a truly, just and democratic society through islamic endeavor.
                            </div>
                        </motion.div>
              
                    </motion.div>

                    {/* The Principles */}
                    <div className="bg-white">
                        <div className="flex flex-col px-2 py-16">
                            <motion.div
                                className="title text-black py-2 tracking-tight text-2xl font-extrabold flex self-start"
                                initial="hidden"
                                whileInView="show"
                                viewport={viewportOnce}
                                variants={fadeUp}
                            >
                                The Principles We Live By
                            </motion.div>
                            <div className="border-b-4 w-16 border-yellow-400 rounded-full mt-1"></div>
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-3 gap-6 py-14"
                                initial="hidden"
                                whileInView="show"
                                viewport={viewportOnce}
                                variants={staggerContainer}
                            >
                                <motion.div className="group flex flex-col p-8 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition duration-500 gap-5" variants={staggerItem}>
                                    <div className="bg-green-100 p-3 self-start rounded-xl group-hover:bg-green-700 transition duration-500">
                                        <FaLeaf className="text-green-700 group-hover:text-white transition duration-500 w-5 h-5"/>
                                    </div>
                                    <div className="text-black text-sm md:text-base font-bold tracking-tight">
                                        Sustainability
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-500 overflow-y-auto max-h-24 scrollbar-hidden tracking-wide leading-relaxed">
                                        We prioritize long-term ecological health over short-term financial gains in every decision we make.
                                    </div>
                                </motion.div>
                                <motion.div className="group flex flex-col p-8 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition duration-500 gap-5" variants={staggerItem}>
                                    <div className="bg-green-100 p-3 self-start rounded-xl group-hover:bg-green-700 transition duration-500">
                                        <FaPeopleCarry className="text-green-700 group-hover:text-white transition duration-500 w-5 h-5"/>
                                    </div>
                                    <div className="text-black text-sm md:text-base font-bold tracking-tight">
                                        Inclusivity
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-500 overflow-y-auto max-h-24 scrollbar-hidden tracking-wide leading-relaxed">
                                        We prioritize long-term ecological health over short-term financial gains in every decision we make.
                                    </div>
                                </motion.div>
                                <motion.div className="group flex flex-col p-8 rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-lg transition duration-500 gap-5" variants={staggerItem}>
                                    <div className="bg-green-100 p-3 self-start rounded-xl group-hover:bg-green-700 transition duration-500">
                                        <FaBalanceScale className="text-green-700 group-hover:text-white transition duration-500 w-5 h-5"/>
                                    </div>
                                    <div className="text-black text-sm md:text-base font-bold tracking-tight">
                                        Transparency
                                    </div>
                                    <div className="text-xs sm:text-sm text-gray-500 overflow-y-auto max-h-24 scrollbar-hidden tracking-wide leading-relaxed">
                                        We prioritize long-term ecological health over short-term financial gains in every decision we make.
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Our History */}
                    <div className="bg-white">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-2 pb-16">
                            <motion.div
                                className="flex flex-col gap-5"
                                initial="hidden"
                                whileInView="show"
                                viewport={viewportOnce}
                                variants={slideLeft}
                            >
                                <div className="text-black text-xl font-extrabold tracking-tight">
                                    Our History
                                </div>
                                <div className="flex flex-col sm:flex-col lg:flex-row gap-4">
                                      <div className="Image-news w-40 h-32 md:h-40 md:w-40 lg:w-64 relative flex-shrink-0 rounded-2xl overflow-hidden shadow-md">
                                    <img
                                        src={images}
                                        alt="ATMPC BUILDING"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="text-gray-500 text-xs leading-relaxed ">
                                  THe Al-amanh Trust Multi-purpose Cooperative (ATMPC) is a legacy.
                                    Hence, it is being created and established in memory of late Hadja Sittie Omaira Alonto Manoga.
                                    The family of Manoga and Alonto Have convened and conceived this cooperative upon consultation with all the relatives,
                                    and friends sometimes in 2002. This cooperative is continuously widening is territorial jurisdiction, features/services
                                    and its members. The concept behind the cooperative is to outreach relatives, members and the community the services that
                                    benefit them which are affordable by the the cooperative..
                                    Aside from the shares contributed by the regular member but not the associate members for its annual
                                    operating budget, the ATMPC is beginning to tapping philanthropies for its vision, mission, features and others services.
                                    The cooperative is open to all people who endeavors are for God (s.w.t),
                                    services to humanity and for the establishment of peace and development, sociality, economically, spiritually through endeavors, advocacy and Productivity
                                    Enhancement Program.
                                </div>
                               
                                </div>
                               
                            </motion.div>
                            <motion.div
                                className="flex flex-col gap-6"
                                initial="hidden"
                                whileInView="show"
                                viewport={viewportOnce}
                                variants={staggerContainer}
                            >
                                <motion.div className="border-l-4 border-yellow-400 pl-4 rounded-r-lg" variants={staggerItem}>
                                    <div className="text-black font-bold tracking-tight gap-4 text-xs md:text-sm lg:text-base mb-1">
                                       The bases of establishment of ATM-PC are:
                                    </div>
                                    <div className="text-gray-500 text-xs sm:text-sm overflow-y-auto max-h-24 scrollbar-hidden leading-relaxed">
                                        Republic Act No. 6938 & RA No. 6989
                                    </div>
                                </motion.div>
                                <motion.div className="border-l-4 border-yellow-400 pl-4 rounded-r-lg" variants={staggerItem}>
       
                                    <div className="text-gray-500 text-xs sm:text-sm overflow-y-auto max-h-24 scrollbar-hidden leading-relaxed">
                                       Holy Qur-an, 3:104;(Form a group "ummah" among yourselves who invite to goodness and enjoin right conduct and forbid indecency,
            indecency, such are they who are successful)
                                    </div>
                                </motion.div>
                                <motion.div className="border-l-4 border-yellow-400 pl-4 rounded-r-lg" variants={staggerItem}>

                                    <div className="text-gray-500 text-xs sm:text-sm overflow-y-auto max-h-24 scrollbar-hidden leading-relaxed">
                                       Holy Qur-an, 103;2-3 (Lo! Man is in a state of loss save those who
                                        believe and do good works and exhort one another to truth and one another to endurance).
                                    </div>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>

                    {/* CTA Banner */}
                    <div className="bg-white py-20 px-2">
                        <motion.div
                            className="bg-green-900 gap-4 py-14 px-6 rounded-2xl flex flex-col items-center justify-center text-center"
                            initial="hidden"
                            whileInView="show"
                            viewport={viewportOnce}
                            variants={scaleIn}
                        >
                            <div className="text-white text-2xl font-extrabold tracking-tight">
                                Ready to be part of the change?
                            </div>
                            <div className="text-green-200 max-w-sm tracking-wide text-sm leading-relaxed">
                                Join thousands of members who are building a more equitable and sustainable local economy together. Your voice matters here.
                            </div>
                            <div className="flex flex-row gap-4 mt-2">
                                <button className="flex items-center gap-2 bg-yellow-400 text-black py-2 px-6 rounded-full tracking-wide text-xs md:text-sm font-bold hover:bg-yellow-300 transition duration-300">
                                    Get Started <FaArrowRight/>
                                </button>
                                <button className="bg-transparent text-white border-2 border-white text-xs md:text-sm py-2 px-6 rounded-full font-semibold tracking-wide hover:bg-white hover:text-green-900 transition duration-300">
                                    View Membership Perks
                                </button>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
            <DevNoticeModal/>
        </>
    )
}

export default Aboutpage;