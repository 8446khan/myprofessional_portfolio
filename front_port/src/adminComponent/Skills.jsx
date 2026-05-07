import React, { useState, useEffect } from "react";
import axios from "axios";

const Skills = () => {
    const [skillView, setSkillView] = useState([])
    const [skilladd, setSkilladd] = useState({
        skill: ""
    })

    const changeHandler = (e) => {
        setSkilladd({ ...skilladd, [e.target.name]: e.target.value })


    }

    const submitHandler = async (e) => {
        e.preventDefault()

        try {

            const response = await axios.post("https://myprofessional-portfolio-1.onrender.com/skill_add", skilladd)

            console.log(response.data)
            alert("saved successfully")

            setSkilladd({
                skill: ""
            })

        } catch (error) {
            alert(error)

        }


    }

    useEffect(() => {
        const fetchdata = async () => {
            try {

                const res = await axios.get("https://myprofessional-portfolio-1.onrender.com/viewskills")
                console.log(res.data)
                setSkillView(res.data)
            } catch (error) {
                console.log(error)

            }

        }
        fetchdata()
    }, [])

    const deleteHandler = async (id) => {

        try {
            await axios.delete(`https://myprofessional-portfolio-1.onrender.com/skill_delete${id}`)
            setSkillView(skillView.filter((skill) => skill.id !== id))
            alert("deleted sucessfully")


        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <div className="bg-gray-900 p-6 rounded-lg">
                <form onSubmit={submitHandler} >
                    <h2 className="text-xl mb-4">Add Skill</h2>

                    <input onChange={changeHandler} value={skilladd.skill} required name="skill" className="block capitalize w-full p-2 mb-2 bg-gray-800" placeholder="Skill Name" />


                    <button className="bg-purple-600 px-4 py-2 mt-2">
                        Add Skill
                    </button>
                </form>
            </div>

            <div className=" my-5">
                <div>
                    <h2 className="text-2xl capitalize mb-4">uploaded Skill</h2>

                </div>

                <div className=" flex flex-col   border-t py-2 border-white ">
                    {skillView.map((skill, index) => (


                        <div
                            key={index}
                            className="
                        backdrop-blur-xl 
                        bg-white/10 m-2
                        border border-white/20 
                        flex flex-row justify-between
                        
                        rounded-2xl 

                        p-4 sm:p-5 md:p-3 md:px-5  

                        
                        text-sm sm:text-base md:text-lg

                        shadow-xl 

                        hover:bg-white/20
                        hover:border-purple-500/50
                        "
                        >

                            {skill.skill}

                            <div className="">
                                <button onClick={() => deleteHandler(skill.id)} className="  bg-green-400 text-white capitalize text-sm border-none rounded-sm p-2 hover:bg-orange-600  ">remove</button>

                            </div>

                        </div>



                    ))}
                </div>
            </div>

        </>
    );
};

export default Skills;