import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {

    return (

        <footer className="py-10 bg-black text-center text-gray-400 border-t border-white/70">

            <p>

                © 2026 khan Shoaib.
                Built with React |Tailwind CSS| Flask.

            </p>
            <Link className="hover:text-orange-500" to="/admin/AdminLoginPage">
                Admin Dashboard
            </Link>

        </footer>

    );

};

export default Footer;