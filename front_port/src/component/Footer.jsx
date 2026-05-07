import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

    return (

        <footer className="py-10 bg-black text-center text-gray-400 border-t border-white/70">

            <p>

                © 2026 Shoaib.
                Built with React & Tailwind CSS.

            </p>
            <Link className="hover:text-orange-500" to="/admin">
                Admin Dashboard
            </Link>

        </footer>

    );

};

export default Footer;