import React from "react";
import { motion } from "framer-motion";

const About = () => {

    return (

        <section
            id="about"
            className="py-10 md:py-18 bg-black text-white"
        >

            <div className="max-w-6xl mx-auto px-4 sm:px-6 
            grid md:grid-cols-2 gap-12 md:gap-16 items-center">



                <motion.div

                    initial={{
                        opacity: 0,
                        x: -60
                    }}

                    whileInView={{
                        opacity: 1,
                        x: 0
                    }}

                    viewport={{ once: true }}

                    transition={{
                        duration: 0.6
                    }}

                    className="text-center md:text-left"
                >

                    <h2 className="text-3xl sm:text-4xl md:text-5xl 
                    font-bold mb-6 md:mb-8">

                        About Me

                    </h2>

                    <p className="text-gray-400 
                    text-sm sm:text-base md:text-lg
                    leading-relaxed mb-4 md:mb-6">

                        I'm a passionate Full Stack Developer and
                        AI/ML enthusiast focused on building
                        intelligent systems and scalable web
                        applications. I enjoy solving real-world
                        problems using modern technologies.

                    </p>

                    <p className="text-gray-400 
                    text-sm sm:text-base md:text-lg
                    leading-relaxed">

                        My interests include Machine Learning,
                        Web Development, and Software Engineering.
                        I continuously explore new technologies
                        and build innovative projects.

                    </p>

                </motion.div>




                <motion.div

                    initial={{
                        opacity: 0,
                        x: 60
                    }}

                    whileInView={{
                        opacity: 1,
                        x: 0
                    }}

                    viewport={{ once: true }}

                    transition={{
                        duration: 0.6
                    }}

                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6"
                >

                    {[
                        "Full Stack Development",
                        "Machine Learning",
                        "React & Flask",
                        "AI System Design"
                    ].map((item, index) => (

                        <div
                            key={index}

                            className="backdrop-blur-xl 
                            bg-white/10 
                            border border-white/20 
                            rounded-2xl 
                            p-4 sm:p-6 
                            text-center
                            text-sm sm:text-base
                            hover:bg-purple-500/20
                            transition"
                        >

                            {item}

                        </div>

                    ))}

                </motion.div>

            </div>

        </section>

    );

};

export default About;