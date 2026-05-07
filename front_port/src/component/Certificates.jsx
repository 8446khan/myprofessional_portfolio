import React from "react";
import { motion } from "framer-motion";

const Certificates = () => {

    // const certificates = [

    //     {
    //         name: "Machine Learning Certification",
    //         issuer: "Coursera",

    //         description:
    //             "Completed machine learning fundamentals including regression, classification, and clustering.",

    //         image:
    //             "/images/ml-certificate.png",

    //         url:
    //             "/images/ml-certificate.png"
    //     },

    //     {
    //         name: "Python Programming Certification",
    //         issuer: "Udemy",

    //         description:
    //             "Learned Python fundamentals, data structures, and real-world applications.",

    //         image:
    //             "/images/ml-certificate.png",

    //         url:
    //             "/images/ml-certificate.png"
    //     },

    //     {
    //         name: "Full Stack Web Development",
    //         issuer: "freeCodeCamp",

    //         description:
    //             "Built responsive web applications using React, APIs, and backend technologies.",

    //         image:
    //             "/images/ml-certificate.png",

    //         url:
    //             "/images/ml-certificate.png"
    //     }

    // ];

    return (

        <section
            id="certificates"
            className="py-16 md:py-16 bg-black text-white overflow-hidden"
        >



            <motion.h2

                initial={{ opacity: 0, y: 40 }}

                whileInView={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.6 }}

                className="text-3xl sm:text-4xl md:text-5xl 
                font-bold text-center mb-14 md:mb-20"
            >

                Certificates 🎓

            </motion.h2>




            <div className="px-4 sm:px-6 md:px-10">



                <div className="
                    grid 
                    grid-cols-1 
                    sm:grid-cols-2 
                    lg:grid-cols-3 
                    gap-8
                ">

                    {certificates.map((cert, index) => (

                        <motion.a

                            key={index}

                            href={cert.url}

                            target="_blank"
                            rel="noopener noreferrer"

                            initial={{ opacity: 0, y: 50 }}

                            whileInView={{ opacity: 1, y: 0 }}

                            whileHover={{ scale: 1.05 }}

                            transition={{ duration: 0.5 }}

                            className="
                                group
                                backdrop-blur-xl
                                bg-white/10
                                border border-white/20
                                rounded-2xl
                                overflow-hidden
                                shadow-xl
                            "
                        >



                            <img
                                src={cert.image}
                                alt={cert.name}

                                className="
                                    h-40 sm:h-44 md:h-48
                                    w-full object-cover
                                    group-hover:scale-110
                                    transition duration-500
                                "
                            />



                            <div className="p-5 md:p-6">

                                <h3
                                    className="
                                        text-lg md:text-xl
                                        font-semibold
                                        mb-2
                                        text-purple-400
                                    "
                                >

                                    {cert.name}

                                </h3>

                                <p className="
                                    text-xs md:text-sm
                                    text-gray-400 mb-2
                                ">

                                    {cert.issuer}

                                </p>

                                <p className="
                                    text-xs md:text-sm
                                    text-gray-300
                                ">

                                    {cert.description}

                                </p>

                                <span
                                    className="
                                        inline-block mt-4
                                        text-sm
                                        text-purple-400
                                        opacity-0
                                        group-hover:opacity-100
                                        transition
                                    "
                                >

                                    → View Certificate

                                </span>

                            </div>

                        </motion.a>

                    ))}

                </div>

            </div>

        </section>

    );

};

export default Certificates;