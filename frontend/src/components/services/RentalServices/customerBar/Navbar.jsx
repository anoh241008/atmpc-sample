import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import 'animate.css';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [navbarBackground, setNavbarBackground] = useState(false);
    const [animateDelay, setAnimateDelay] = useState(false);
    const [animationKey, setAnimationKey] = useState(0);
    const location = useLocation();

    // Re-trigger animations on every navigation and briefly force transparent so animation plays
    useEffect(() => {
        setAnimationKey(prev => prev + 1);
        setNavbarBackground(false);
        const timer = setTimeout(() => {
            if (window.scrollY > 0) setNavbarBackground(true);
        }, 600);
        return () => clearTimeout(timer);
    }, [location.pathname, location.hash]);

    // Track scroll position only for homepage
    useEffect(() => {
        const normalizedPath = location.pathname === "/"
            ? "/"
            : location.pathname.replace(/\/+$/, "");

        if (normalizedPath === "/services/RentalServices" || normalizedPath === "/") {
            const sectionId = location.hash.replace("#", "");
            const section = sectionId ? document.getElementById(sectionId) : null;

            const getOffset = () => {
                if (!section) return 0;
                const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                // Never require more scroll than is actually reachable
                return Math.min(section.offsetTop, Math.max(maxScroll - 5, 0));
            };

            const handleScroll = () => {
                const offset = getOffset();
                if (window.scrollY > offset) {
                    setNavbarBackground(true);
                } else {
                    setNavbarBackground(false);
                }
            };

            // Delay activating the scroll listener so it doesn't race with the
            // animation-window effect above (which needs ~600ms of transparency to play)
            const activateTimer = setTimeout(() => {
                handleScroll();
                window.addEventListener("scroll", handleScroll);
            }, 650);

            return () => {
                clearTimeout(activateTimer);
                window.removeEventListener("scroll", handleScroll);
            };
        } else {
            setNavbarBackground(true);
        }
    }, [location]);

    // Scroll to section whenever the hash changes (works even after navigating from another page)
    useEffect(() => {
        if (location.hash) {
            const sectionId = location.hash.replace("#", "");

            const scrollToSection = () => {
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            };

            let attempts = 0;
            const maxAttempts = 30;
            const interval = setInterval(() => {
                const section = document.getElementById(sectionId);
                if (section) {
                    scrollToSection();
                    clearInterval(interval);

                    // Re-affirm scroll after layout settles (images/iframes loading can shift height)
                    setTimeout(scrollToSection, 400);
                    setTimeout(scrollToSection, 1000);
                } else if (++attempts >= maxAttempts) {
                    clearInterval(interval);
                }
            }, 100);

            return () => clearInterval(interval);
        }
    }, [location.pathname, location.hash]);

    // Check localStorage for introShown
    useEffect(() => {
        const introShown = localStorage.getItem("introShown");
        setAnimateDelay(!introShown);
    }, []);

    return (
        <nav
            className={`px-8 py-5 fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
                navbarBackground
                    ? "bg-white shadow-md"
                    : "bg-transparent"
            }`}
        >
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                <div
                    key={`logo-${animationKey}`}
                    className={`text-2xl font-black tracking-tight animate__animated animate__fadeInLeft ${
                        animateDelay ? "animate__delay-4s" : ""
                    } transition-colors duration-500 ${
                        navbarBackground ? "text-green-700" : "text-white drop-shadow-md"
                    }`}
                >
                    ANNIEX
                </div>

                <button
                    className={`bg-transparent animate-fade-slide border-none focus:outline-none md:hidden text-2xl transition-all duration-500 ease-in-out ${
                        menuOpen ? "rotate-45" : ""
                    } ${navbarBackground ? "text-gray-800" : "text-white drop-shadow-md"}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? "✖" : "☰"}
                </button>

                <ul className="hidden md:flex items-center justify-end gap-10 pr-2">
                    <li>
                        <Link
                            key={`home-${animationKey}`}
                            className={`text-sm font-semibold tracking-wide transition-all duration-500 animate__animated animate__fadeInDown ${
                                animateDelay ? "animate__delay-4s" : ""
                            } ${
                                navbarBackground
                                    ? "text-gray-700 hover:text-green-700"
                                    : "text-white drop-shadow-md hover:text-green-200"
                            }`}
                            to="/services/RentalServices"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            key={`about-${animationKey}`}
                            className={`text-sm font-semibold tracking-wide transition-all duration-500 animate__animated animate__fadeInDown ${
                                animateDelay ? "animate__delay-4s" : ""
                            } ${
                                navbarBackground
                                    ? "text-gray-700 hover:text-green-700"
                                    : "text-white drop-shadow-md hover:text-green-200"
                            }`}
                            to="/services/RentalServices#aboutid"
                            onClick={() => setMenuOpen(false)}
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            key={`contact-${animationKey}`}
                            className={`text-sm font-semibold tracking-wide transition-all duration-500 animate__animated animate__fadeInDown ${
                                animateDelay ? "animate__delay-4s" : ""
                            } ${
                                navbarBackground
                                    ? "text-gray-700 hover:text-green-700"
                                    : "text-white drop-shadow-md hover:text-green-200"
                            }`}
                            to="/services/RentalServices#contactid"
                            onClick={() => setMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link
                            key={`login-${animationKey}`}
                            className={`text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-500 animate__animated animate__fadeInDown ${
                                animateDelay ? "animate__delay-4s" : ""
                            } ${
                                navbarBackground
                                    ? "bg-green-700 text-white hover:bg-green-800 shadow-sm"
                                    : "bg-white/20 text-white border border-white/40 hover:bg-white hover:text-green-700 backdrop-blur-sm"
                            }`}
                            to="/services/RentalServices/loginpage"
                        >
                            Login/Register
                        </Link>
                    </li>
                </ul>
            </div>

            <div
                className={`md:hidden overflow-hidden transition-all duration-1000 ease-in-out ${
                    menuOpen ? "max-h-96" : "max-h-0"
                }`}
            >
                <ul className={`flex flex-col px-4 pt-4 pb-4 mt-3 space-y-4 rounded-2xl ${
                    navbarBackground
                        ? "bg-white border border-gray-100 shadow-lg"
                        : "bg-black/40 backdrop-blur-md border border-white/10"
                }`}>
                    <li>
                        <Link
                            className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
                                navbarBackground ? "text-gray-700 hover:text-green-700" : "text-white hover:text-green-200"
                            }`}
                            to="/services/RentalServices"
                            onClick={() => window.scrollTo(0, 0)}
                        >
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
                                navbarBackground ? "text-gray-700 hover:text-green-700" : "text-white hover:text-green-200"
                            }`}
                            to="/services/RentalServices#aboutid"
                            onClick={() => setMenuOpen(false)}
                        >
                            About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={`text-sm font-semibold tracking-wide transition-colors duration-300 ${
                                navbarBackground ? "text-gray-700 hover:text-green-700" : "text-white hover:text-green-200"
                            }`}
                            to="/services/RentalServices#contactid"
                            onClick={() => setMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link
                            className="bg-green-700 text-white text-sm font-bold px-5 py-2 rounded-full hover:bg-green-800 transition duration-300 inline-block"
                            to="/services/RentalServices/loginpage"
                        >
                            Login/Register
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}