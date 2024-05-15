import React from "react";
import { Helmet } from "react-helmet";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const About = () => {
    return (
        <div className="max-w-3xl p-5 dark:text-white border rounded-md mt-10 mb-20 shadow-lg">
            <Helmet>
                <title>About</title>
                <meta name="description" content="Learn about the Pet Owners and Animal Lovers Social Network project developed by Alper Demir, a computer engineering student. Find out about the technologies used and the developer's message." />
            </Helmet>
            <div className="flex justify-between items-center gap-x-3 border-b border-gray-200 dark:border-opacity-20 pb-3">
                <h1 className="text-2xl font-bold max-sm:text-xl">
                    About the Project
                </h1>
                <div className="flex gap-x-2">
                    <a href="https://github.com/alper-demir/" target="blank"><FaGithub className="text-3xl hover:text-indigo-600" /></a>
                    <a href="https://www.linkedin.com/in/alper-demir23/" target="blank"><FaLinkedin className="text-3xl hover:text-indigo-600" /></a>
                </div>
            </div>

            <div className="my-3 border-b border-gray-200 dark:border-opacity-20">
                <h2 className="text-xl font-semibold mb-2 max-sm:text-lg">Developer's Message</h2>
                <p className="mb-3">
                    Hello! I am Alper Demir, 4th year computer engineering student. My capstone project focuses on implementing a social network platform called Pet Owners and Animal Lovers Social Network. This platform aims to provide a space where pet owners and animal lovers can share information about their pets, receive tips on pet care and health, and post lost and found pet notices. I aim to implement this project as a MERN stack application.
                </p>
            </div>
            <div className="my-3 border-b border-gray-200 dark:border-opacity-20 pb-3">
                <h2 className="text-xl font-semibold mb-2 max-sm:text-lg">Technologies Used</h2>
                <ul className="list-disc list-inside">
                    <li>MongoDB - For database management</li>
                    <li>Express.js - As the back-end framework</li>
                    <li>React.js - For building the front-end user interface</li>
                    <li>Node.js - For server-side scripting</li>
                    <li>Tailwind CSS - For styling</li>
                    <li>JWT - For user authentication</li>
                </ul>
            </div>
            <div className="my-3">
                <h2 className="text-xl font-semibold mb-2 max-sm:text-lg">Overview</h2>
                <p className="mb-3">
                    Regular updates and code changes are pushed to the project repository on GitHub, allowing for version control and seamless integration of new features.
                    You can see the progress on <a href='https://github.com/alper-demir/pet-owners-and-animal-lovers-social-network-client' target='blank' className='font-bold underline underline-offset-2'>Github</a>.
                </p>
                <p className="mb-3">
                    As the project progresses, I am excited to witness its evolution and eventual launch as a fully-fledged social network for pet owners and animal enthusiasts. Through perseverance, innovation, and collaboration, I am confident in the project's potential to make a meaningful impact in the lives of its users and their beloved pets.
                </p>
                <p className="mb-3">
                    This project has provided me with the opportunity to bring together many technologies I have learned so far and develop real-world applications.
                    The project has been developed responsively, suitable for viewing on small screen resolutions, tablets and mobile devices. Additionally, the experiences and designs I have gained while working on the project will serve as valuable references for future projects and contribute to my growth as a developer.
                </p>
            </div>
        </div>
    );
}

export default About;