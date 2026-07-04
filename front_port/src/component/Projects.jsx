import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                const res = await axios.get(
                    "https://myprofessional-portfolio-1.onrender.com/viewprojects"
                );

                setProjects(res.data);
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
            id="projects"
            className="
                relative
                py-8 sm:py-12 md:py-18
                bg-black
                text-white
                px-4 sm:px-6
            "
        >
            <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="
                    text-2xl
                    sm:text-3xl
                    md:text-4xl
                    font-bold
                    text-center
                    mb-14 md:mb-20
                "
            >
                My Engineering Journey 🚀
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
                <div className="relative max-w-5xl mx-auto">
                    {/* Timeline Line */}
                    <div
                        className="
                            absolute
                            left-4 sm:left-6 md:left-8
                            top-0
                            bottom-0
                            w-[2px]
                            bg-white/20
                        "
                    />

                    {/* Scrollable Container */}
                    <div
                        className="
                            max-h-[500px]
                            sm:max-h-[550px]
                            md:max-h-[600px]
                            overflow-y-auto
                            scroll-hidden
                        "
                    >
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.15,
                                }}
                                className="
                                    relative
                                    pl-12 sm:pl-16 md:pl-20
                                    mb-12
                                "
                            >
                                {/* Timeline Dot */}
                                <div
                                    className="
                                        absolute
                                        left-[10px]
                                        sm:left-[14px]
                                        md:left-[18px]
                                        top-3
                                        w-3 h-3
                                        sm:w-4 sm:h-4
                                        bg-purple-500
                                        rounded-full
                                        shadow-lg
                                    "
                                />

                                {/* Project Card */}
                                <div
                                    className="
                                        group
                                        backdrop-blur-xl
                                        bg-white/5
                                        border border-white/10
                                        rounded-2xl
                                        p-4 sm:p-5 md:p-6
                                        hover:bg-white/10
                                        hover:border-purple-500/40
                                        transition
                                        duration-300
                                    "
                                >
                                    <h3
                                        className="
                                            text-lg sm:text-xl md:text-2xl
                                            font-semibold
                                            group-hover:text-purple-400
                                            transition
                                            mb-2
                                        "
                                    >
                                        {project.title}
                                    </h3>

                                    <p
                                        className="
                                            text-sm sm:text-base
                                            text-gray-400
                                            group-hover:text-gray-300
                                            mb-4
                                        "
                                    >
                                        {project.description}
                                    </p>

                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="
                                            inline-block
                                            text-xs sm:text-sm
                                            text-purple-400
                                            hover:text-purple-300
                                            underline
                                            break-all
                                        "
                                    >
                                        {project.url} →
                                    </a>
                                </div>
                            </motion.div>
                        ))}

                        {/* No Projects Found */}
                        {!loading && projects.length === 0 && (
                            <div className="text-center py-16 text-gray-400">
                                No projects available.
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Projects;