import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Skills = () => {
    const [skillView, setSkillView] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    "https://myprofessional-portfolio-1.onrender.com/viewskills"
                );

                setSkillView(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <section
            id="skills"
            className="
                py-12 sm:py-15 md:py-22
                bg-black
                text-white
                px-4 sm:px-6
            "
        >
            {/* Heading */}
            <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="
                    text-3xl
                    sm:text-4xl
                    md:text-5xl
                    font-bold
                    text-center
                    mb-12
                    md:mb-16
                "
            >
                Skills ⚡
            </motion.h2>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    {/* Spinner */}
                    <div className="w-12 h-12 border-4 border-gray-600 border-t-purple-500 rounded-full animate-spin"></div>

                    <h3 className="mt-6 text-xl font-semibold text-white">
                        Loading portfolio content...
                    </h3>

                    <p className="mt-2 text-gray-400 text-center max-w-md">
                        Please wait while we retrieve the latest information.
                        Thank you for your patience.
                    </p>
                </div>
            ) : (
                <div
                    className="
                        max-w-md
                        sm:max-w-3xl
                        md:max-w-6xl
                        mx-auto

                        grid
                        grid-cols-2
                        sm:grid-cols-3
                        md:grid-cols-4
                        lg:grid-cols-5

                        gap-4 sm:gap-6 md:gap-8
                    "
                >
                    {skillView.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className="
                                backdrop-blur-xl
                                bg-white/10
                                border border-white/20

                                rounded-2xl

                                p-4 sm:p-5 md:p-6

                                text-center
                                text-sm sm:text-base md:text-lg

                                shadow-xl
                                transition
                                duration-300

                                hover:bg-white/20
                                hover:border-purple-500/50
                            "
                        >
                            {skill.skill}
                        </motion.div>
                    ))}

                    {!loading && skillView.length === 0 && (
                        <div className="col-span-full text-center text-gray-400 py-10">
                            No skills available.
                        </div>
                    )}
                </div>
            )}
        </section>
    );
};

export default Skills;