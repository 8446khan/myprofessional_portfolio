import React, { useState } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import CodeRain from "./CodeRain";

const Hero = () => {

    const [pos, setPos] = useState({
        x: 0,
        y: 0
    });

    const handleMouseMove = (e) => {

        setPos({
            x: e.clientX,
            y: e.clientY
        });

    };

    return (

        <section
            id="home"
            onMouseMove={handleMouseMove}
            className="relative  h-screen flex items-center justify-center bg-black text-white overflow-hidden"
        >


            <CodeRain />



            <motion.div
                className="pointer-events-none absolute w-[400px] h-[400px] rounded-full bg-purple-500 blur-3xl opacity-20"
                animate={{
                    x: pos.x - 200,
                    y: pos.y - 200
                }}
                transition={{
                    type: "spring",
                    stiffness: 60
                }}
            />



            <motion.div

                initial={{
                    opacity: 0,
                    scale: 0.9
                }}

                animate={{
                    opacity: 1,
                    scale: 1
                }}

                transition={{
                    duration: 0.8
                }}

                className="relative z-10 
                backdrop-blur-xl 
                bg-white/10 
                border border-white/20 
                shadow-2xl 
                rounded-3xl 
                p-10 
                text-center 
                max-w-2xl mx-6"
            >



                <h1 className="text-5xl md:text-6xl font-bold mb-6">

                    Hi, I'm

                    <span className="text-purple-400">
                        {" "}Shoaib
                    </span>

                    👋

                </h1>



                <h2 className="text-2xl md:text-3xl font-semibold text-blue-300 mb-6">

                    <Typewriter
                        words={[

                            "Full Stack Developer",
                            "Data analyst",
                            "AI/ML Enthusiast",
                        ]}
                        loop
                        cursor
                        cursorStyle="|"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1500}
                    />

                </h2>



                <p className="text-gray-300 mb-8 leading-relaxed">

                    I build intelligent applications,
                    scalable web systems, and analysis data to get insights using modern technologies.

                </p>



                <div className="flex justify-center gap-4 flex-wrap">

                    <a href="#projects">

                        <button
                            className="bg-purple-600 
                            hover:bg-purple-700 
                            px-6 py-3 
                            rounded-xl 
                            font-semibold 
                            transition"
                        >

                            View Projects

                        </button>

                    </a>

                    <a href="#contact">

                        <button
                            className="border border-white/30 
                            hover:bg-white/10 
                            px-6 py-3 
                            rounded-xl 
                            font-semibold 
                            transition"
                        >

                            Contact Me

                        </button>

                    </a>

                </div>

            </motion.div>

        </section>

    );
};

export default Hero;