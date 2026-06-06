import React from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer className="py-10 bg-black text-center text-gray-400 border-t border-white/70">

            <p>
                © 2026 Khan Shoaib. Built with React | Tailwind CSS | Flask.
            </p>

            <button
                onClick={() => navigate("/AdminLoginPage")}
                className="hover:text-orange-500 mt-2"
            >
                Admin Dashboard
            </button>

        </footer>
    );
};

export default Footer;