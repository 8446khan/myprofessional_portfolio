import React from "react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

const Education = () => {
    const [qualification, setQualification] = useState([]);

    const education = [

        {
            degree:
                "Bachelor of Engineering (BE)",

            institute:
                "New Horizen Institute of Technology & Management, Thane — Mumbai University",

            year:
                "2023 — 2027"
        }

    ];

    const getQualification = async () => {

        try {

            const res = await axios.get(
                `https://myprofessional-portfolio-1.onrender.com/get_qualification`
            );

            setQualification(res.data);

        }
        catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {
        getQualification()
    }, [])
    console.log(qualification)

    return (

        <section
            id="education"
            className="py-12 sm:py-15 md:py-22 
            bg-black text-white px-4 sm:px-6"
        >



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

                Education 🎓

            </motion.h2>




            <div className="
                max-w-md 
                sm:max-w-2xl 
                md:max-w-3xl 
                mx-auto
            ">

                {qualification.map((item, index) => (

                    <motion.div

                        key={index}

                        initial={{
                            opacity: 0,
                            y: 50
                        }}

                        whileInView={{
                            opacity: 1,
                            y: 0
                        }}

                        transition={{
                            duration: 0.5
                        }}

                        whileHover={{
                            scale: 1.02
                        }}

                        className="
                        mb-6 md:mb-10

                        backdrop-blur-xl 
                        bg-white/10 
                        border border-white/20 
                        rounded-2xl 

                        p-5 
                        sm:p-6 
                        md:p-8

                        shadow-xl
                        transition
                        duration-300
                        "
                    >



                        <h3 className="
                            text-lg 
                            sm:text-xl 
                            md:text-2xl 
                            font-semibold 
                            mb-2
                        ">

                            {item.degree}

                        </h3>



                        <p className="
                            text-sm 
                            sm:text-base 
                            text-purple-400 
                            mb-2
                        ">

                            {item.college}

                        </p>



                        <p className="
                            text-xs 
                            sm:text-sm 
                            text-gray-400
                        ">

                            {item.year}

                        </p>

                    </motion.div>

                ))}

            </div>

        </section>

    );

};

export default Education;