import React, { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: "Home", href: "#home" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Education", href: "#education" },
        { name: "Certificates", href: "#certificates" },
        { name: "About", href: "#about" },
        { name: "Contact", href: "#contact" },

    ];

    return (

        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}

            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 
            backdrop-blur-xl bg-white/10 border border-white/20 
            rounded-full px-6 py-3 shadow-xl w-[90%] md:w-auto"
        >

            <div className="flex items-center justify-between">


                <div className="hidden md:flex gap-8 text-white font-medium">

                    {links.map((link, index) => (

                        <a
                            key={index}
                            href={link.href}
                            className="hover:text-purple-400 transition"
                        >
                            {link.name}
                        </a>

                    ))}

                </div>


                <div className="md:hidden text-white">

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>

                </div>

            </div>



            {isOpen && (

                <motion.div

                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}

                    className="md:hidden mt-4 flex flex-col gap-4 
                    text-white text-center"
                >

                    {links.map((link, index) => (

                        <a
                            key={index}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="hover:text-purple-400 transition"
                        >
                            {link.name}
                        </a>

                    ))}

                </motion.div>

            )}

        </motion.nav>

    );
};

export default Navbar;