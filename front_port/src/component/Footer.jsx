import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-black text-gray-400 border-t border-white/10 py-8 px-6">

            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                <div className="text-center md:text-left space-y-2">
                    <p className="text-sm md:text-base">
                        © 2026 Khan Shoaib. Built with React | Tailwind CSS | Flask.
                    </p>

                    <button
                        onClick={() => navigate("/AdminLoginPage")}
                        className="text-sm text-cyan-400 hover:text-cyan-300 transition"
                    >
                        Admin Dashboard
                    </button>
                </div>

                <div className="flex flex-wrap justify-center gap-4">

                    <a href="https://www.linkedin.com/feed/">
                        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-purple-600 hover:to-indigo-500 text-white px-5 py-2 rounded-lg font-medium transition shadow-lg hover:shadow-purple-500/40">
                            Linkedin
                        </button>
                    </a>

                    <a href="https://github.com/8446khan">
                        <button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-teal-600 hover:to-emerald-500 text-white px-5 py-2 rounded-lg font-medium transition shadow-lg hover:shadow-teal-500/40">
                            Github
                        </button>
                    </a>

                </div>

            </div>

        </footer>
    );
};

export default Footer;