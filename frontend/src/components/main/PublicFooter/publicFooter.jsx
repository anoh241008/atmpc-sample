import images from '../../../../public/assets/services/RentalServices/images/atmpclogo.png'
import { FaFacebook, FaLinkedinIn, FaTwitter, FaGoogle, FaPaperPlane } from 'react-icons/fa'

export default function MainPageFooter() {
    return (
        <div className="bg-green-950 w-full">
            <div className="lg:container mx-auto max-w-[1200px]">
                <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 py-16 px-4 gap-10 border-b border-green-900">

                    {/* Brand */}
                    <div className="flex flex-col gap-4">
                        <div className="text-white text-sm font-extrabold flex gap-2 items-center tracking-tight">
                            <img
                                src={images}
                                alt="ATMPC LOGO"
                                className="w-14 h-14 rounded-xl object-cover"
                            />
                            Al-Amanah Trust Multi Purpose Cooperative
                        </div>
                        <div className="text-green-300 text-xs leading-relaxed">
                            Building a collective future through shared resources and sustainable values.
                        </div>
                        <div className="flex flex-row items-center gap-3 pt-2">
       
                           <a
                                href="https://www.linkedin.com/company/al-amanah-trust-multi-purpose-cooperative-official/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <div className="bg-green-900 p-2.5 rounded-xl cursor-pointer hover:bg-blue-600 transition duration-300 text-white">
                                    <FaLinkedinIn className="w-3 h-3" />
                                </div>
                            </a>
                             <a
                                href="https://www.facebook.com/profile.php?id=61591364258497"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Faecbook"
                            >
                                <div className="bg-green-900 p-2.5 rounded-xl cursor-pointer hover:bg-blue-800 transition duration-300 text-white">
                                    <FaFacebook className="w-3 h-3" />
                                </div>
                            </a>
                          <a href="mailto:atmpcofficial@email.com">
                                <div className="bg-green-900 p-2.5 rounded-xl cursor-pointer hover:bg-red-600 transition duration-300 text-white">
                                    <FaGoogle className="w-3 h-3" />
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Government Compliance */}
                    <div className="flex flex-col gap-3">
                        <div className="text-white text-xs font-bold tracking-widest uppercase mb-1">
                            Government Compliance & Registration
                        </div>
                        <div className="text-green-400 text-xs leading-relaxed">
                            <a
                                href="https://www.bir.gov.ph"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-green-400 text-xs leading-relaxed hover:text-green-300 transition"
                            >
                                Bureau Internal Revenue<br />
                                BIR TIN # 006-163 841
                            </a>
                        </div>
                        <div className="text-green-400 text-xs leading-relaxed">
                           <a
                                href="https://www.dti.gov.ph"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-green-400 text-xs leading-relaxed hover:text-green-300 transition"
                            >
                                Department of Trade & Industry<br />
                                DTI REG # 00156548
                            </a>
                        </div>
                        <div className="text-green-400 text-xs leading-relaxed">
                            <a
                                href="https://www.cda.gov.ph"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-green-400 text-xs leading-relaxed hover:text-green-300 transition"
                            >
                                Cooperative Development Authority<br />
                                CDA REG # 9520-14013061
                            </a>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="flex flex-col gap-3">
                        <div className="text-white text-xs font-bold tracking-widest uppercase mb-1">
                            Resources
                        </div>
                        <div className="text-green-400 text-xs cursor-pointer hover:text-white transition duration-200">
                            Member Portal
                        </div>
                        <div className="text-green-400 text-xs cursor-pointer hover:text-white transition duration-200">
                            Annual Reports
                        </div>
                        <div className="text-green-400 text-xs cursor-pointer hover:text-white transition duration-200">
                            Investment Guide
                        </div>
                        <div className="text-green-400 text-xs cursor-pointer hover:text-white transition duration-200">
                            Sustainability Policy
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="flex flex-col gap-3">
                        <div className="text-white text-xs font-bold tracking-widest uppercase mb-1">
                            Newsletter
                        </div>
                        <div className="text-green-400 text-xs leading-relaxed">
                            Get the latest news and impacts delivered monthly.
                        </div>
                        <div className="flex flex-row gap-2 mt-1">
                            <input
                                className="bg-green-900 border border-green-800 text-white text-xs p-2.5 rounded-xl outline-none flex-1 placeholder-green-600 focus:border-green-500 transition"
                                placeholder="email@address.com"
                            />
                            <button className="bg-yellow-400 p-2.5 rounded-xl hover:bg-yellow-300 transition duration-300 flex-shrink-0">
                                <FaPaperPlane className="text-green-900 w-3.5 h-3.5"/>
                            </button>
                        </div>
                    </div>

                </div>

                {/* Bottom bar */}
                <div className="credit py-5 px-4 lg:px-0 flex flex-row justify-between items-center">
                    <div className="text-xs text-green-600">
                        © 2026 ATMPC Cooperative. All rights reserved.
                    </div>
                    <div className="text-xs text-green-600 cursor-pointer hover:text-green-400 transition duration-200">
                        Developed by ATMPC IT Solutions
                    </div>
                </div>
            </div>
        </div>
    )
}