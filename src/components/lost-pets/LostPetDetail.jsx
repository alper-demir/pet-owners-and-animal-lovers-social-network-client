import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import loadingGIF from "../../asset/loading.gif"
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const LostPetDetail = () => {
    const { id } = useParams();
    const [lostPet, setLostPet] = useState();
    const [loading, setLoading] = useState(false)

    const URL = "http://localhost:3001"

    const fetchLostPet = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${URL}/lost-pet-notice/${id}`);
            setLostPet(response.data);

            console.log(response.data);
        } catch (error) {
            console.error('Error fetching lost pet details:', error);
        }
        setLoading(false)
    };
    useEffect(() => {
        fetchLostPet();
    }, [id]);

    const user = useSelector(state => state.user.user.userId)

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setName(lostPet.name)
        setSpecies(lostPet.species)
        setAge(lostPet.age)
        setGender(lostPet.gender)
        setBreed(lostPet.breed)
        setCity(lostPet.city)
        setImage(lostPet.image)
        setColor(lostPet.color)
        setLastSeenLocation(lostPet.lastSeenLocation)
        setLastSeenDate(lostPet.lastSeenDate)
        setLostStatus(lostPet.lostStatus)
        setContactPhoneNumber(lostPet.contactPhoneNumber)
        setContactEmail(lostPet.contactEmail)
        setDescription(lostPet.description)
    }
    const handleClose = () => setOpen(false);

    const [name, setName] = useState();
    const [species, setSpecies] = useState();
    const [age, setAge] = useState();
    const [gender, setGender] = useState();
    const [image, setImage] = useState();
    const [color, setColor] = useState();
    const [breed, setBreed] = useState();
    const [city, setCity] = useState();
    const [lastSeenLocation, setLastSeenLocation] = useState();
    const [lastSeenDate, setLastSeenDate] = useState();
    const [lostStatus, setLostStatus] = useState();
    const [contactPhoneNumber, setContactPhoneNumber] = useState();
    const [contactEmail, setContactEmail] = useState();
    const [description, setDescription] = useState();

    const token = localStorage.getItem("token");

    const handleNoticeUpdate = async () => {
        console.log(name, species, age, gender, image, color, breed, city, lastSeenDate, lastSeenLocation, lostStatus, contactEmail, contactPhoneNumber, description);
        const updatedOBJ = {
            name, species, age, gender, image, color, breed, city, lastSeenDate, lastSeenLocation, lostStatus, contactEmail, contactPhoneNumber, description, userId: user
        }
        try {
            const updateNotice = await axios.put(`${URL}/lost-pet-notice/${id}`, updatedOBJ, { headers: { Authorization: token } })
            if (updateNotice) {
                console.log(updateNotice);
                setOpen(false);
                fetchLostPet();
            }
        } catch (error) {

        }
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSpeciesChange = (event) => {
        setSpecies(event.target.value)
    };

    const handleAgeChange = (event) => {
        setAge(event.target.value)
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value)
    };

    const handleImageChange = (event) => {
        setImage(event.target.value)
    };

    const handleBreedChange = (event) => {
        setBreed(event.target.value)
    };

    const handleCityChange = (event) => {
        setCity(event.target.value)
    };

    const handleLastSeenLocation = (event) => {
        setLastSeenLocation(event.target.value)
    };

    const handleColorChange = (event) => {
        setColor(event.target.value)
    };

    const handleLastSeenDateChange = (event) => {
        setLastSeenDate(event.target.value)
    };

    const handleLostStatusChange = (event) => {
        setLostStatus(event.target.value)
    };

    const handleContactPhoneChange = (event) => {
        setContactPhoneNumber(event.target.value)
    };

    const handleContactEmailChange = (event) => {
        setContactEmail(event.target.value)
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    };




    return (
        <div className="container mx-auto">
            {
                loading ? (
                    <><img src={loadingGIF} alt="loading" className='w-10 h-10' /></>
                ) :
                    (lostPet && <>
                        <div className="mt-8 shadow-md p-4 rounded-lg flex flex-col gap-y-1 relative">
                            {
                                lostPet.userId._id === user &&
                                <div className='absolute top-2 right-2'>
                                    <button className='p-2 bg-yellow-300 rounded-lg hover:bg-yellow-200' onClick={handleOpen}>Güncelle</button>
                                </div>
                            }
                            <h1 className="text-3xl font-semibold mb-4">{lostPet.name}</h1>
                            <img src={`${URL}/public/images/${lostPet.image}`} alt="img" className='w-60 h-60 object-cover' />
                            <p>Species: {lostPet.species}</p>
                            <p>Gender: {lostPet.gender}</p>
                            <p>Breed: {lostPet.breed}</p>
                            <p>Color: {lostPet.color}</p>
                            <p>Age: {lostPet.age}</p>
                            <p>Last seen date: {new Date(lostPet.lastSeenDate).toLocaleString()}</p>
                            <p>Last seen location: {lostPet.lastSeenLocation}</p>
                            <p>City: {lostPet.city}</p>
                            <p>Contact mail: {lostPet.contactEmail}</p>
                            <p>Contact phone: {lostPet.contactPhoneNumber}</p>
                            <p>Description: {lostPet.description}</p>
                            <p>Status: {lostPet.lostStatus}</p>
                            <p>Notice Date: {new Date(lostPet.createdAt).toLocaleString()}</p>

                        </div>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 max-xl:w-3/5 max-md:w-4/5 max-sm:w-[95%] max-sm:text-xs p-6 outline-indigo-400 bg-white dark:bg-[#101010] dark:text-white rounded-md overflow-y-auto max-h-[85%]">
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Update Notice
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                                    <div className="my-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={handleNameChange}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-sm:p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="species" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Species</label>
                                        <input type="text" id="species" value={species} onChange={handleSpeciesChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-sm:p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                        <input type="number" id="age" value={age} onChange={handleAgeChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-sm:p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                        <input type="text" id="gender" value={gender} onChange={handleGenderChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-sm:p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="breed" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Breed</label>
                                        <input type="text" id="breed" value={breed} onChange={handleBreedChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-sm:p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                        <input type="text" id="city" value={city} onChange={handleCityChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-sm:p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="lastSeenDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Seen Date</label>
                                        <input type="date" id="lastSeenDate" value={new Date(lastSeenDate).toLocaleDateString('en-CA')} onChange={handleLastSeenDateChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-sm:p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                                        <input type="text" id="color" value={color} onChange={handleColorChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-sm:p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image URL</label>
                                        <input type="text" id="image" value={image} onChange={handleImageChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-sm:p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>

                                    <div className="my-2">
                                        <label htmlFor="lastSeenLocation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Seen Location</label>
                                        <input type="text" id="lastSeenLocation" value={lastSeenLocation} onChange={handleLastSeenLocation} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-sm:p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="lostStatus" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Lost Status</label>

                                        <select id="lostStatus" name="lostStatus" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-sm:p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={lostStatus} onChange={handleLostStatusChange}>
                                            <option value="Lost">Lost</option>
                                            <option value="Found">Found</option>
                                        </select>
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="contactPhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Phone Number</label>
                                        <input type="tel" id="contactPhoneNumber" value={contactPhoneNumber} onChange={handleContactPhoneChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-sm:p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="contactEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Email</label>
                                        <input type="email" id="contactEmail" value={contactEmail} onChange={handleContactEmailChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-sm:p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                        <textarea type="text" id="description" value={description} onChange={handleDescriptionChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 max-sm:p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>

                                    <div className='mt-4 text-end'>
                                        <button className='p-2 bg-blue-400 hover:bg-blue-500 rounded-lg text-white' onClick={handleNoticeUpdate}>Update</button>
                                    </div>
                                </Typography>
                            </Box>


                        </Modal>

                    </>

                    )
            }

        </div>
    );
};

export default LostPetDetail;
