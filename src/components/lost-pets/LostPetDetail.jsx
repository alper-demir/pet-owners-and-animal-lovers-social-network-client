import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import loadingGIF from "../../asset/loading.gif"
import { useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import toast from 'react-hot-toast';

const LostPetDetail = () => {
    const { id } = useParams();
    const [lostPet, setLostPet] = useState();
    const [loading, setLoading] = useState(false)

    const BASE_URL = "http://localhost:3001"
    const fileInputRef = useRef(null);

    const fetchLostPet = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/lost-pet-notice/${id}`);
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


    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setName(lostPet.name)
        setSpecies(lostPet.species)
        setAge(lostPet.age)
        setGender(lostPet.gender)
        setBreed(lostPet.breed)
        setCity(lostPet.city)
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
    const { userId } = useSelector(state => state.user.user)

    const handleNoticeUpdate = async () => {

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('userId', userId);
        formData.append('name', name);
        formData.append('species', species);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('color', color);
        formData.append('breed', breed);
        formData.append('city', city);
        formData.append('lastSeenDate', lastSeenDate);
        formData.append('lastSeenLocation', lastSeenLocation);
        formData.append('lostStatus', lostStatus);
        formData.append('contactPhoneNumber', contactPhoneNumber);
        formData.append('contactEmail', contactEmail);
        formData.append('description', description);

        try {
            const updateNotice = await axios.put(`${BASE_URL}/lost-pet-notice/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: token
                }
            })
            if (updateNotice) {
                console.log(updateNotice);
                setOpen(false);
                fetchLostPet();
                if (updateNotice.data.status === "success") {
                    toast.success(updateNotice.data.message);
                }
                else {
                    toast.error(updateNotice.data.message);
                }
            }
        } catch (error) {
            toast.error("An error occured while updating notice!");
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

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleRemoveImage = () => {
        setPreviewImage(null); // Cleaer preview
        setSelectedImage(null);
        fileInputRef.current.value = null; // Clear input content
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        file ? setPreviewImage(URL.createObjectURL(file)) : setPreviewImage(null);
    };


    return (
        <div className="container mx-auto dark:text-white">
            {
                loading ? (
                    <><img src={loadingGIF} alt="loading" className='w-10 h-10' /></>
                ) :
                    (lostPet && <>

                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mb-20">
                            <table class="w-full text-sm text-left rtl:text-right">
                                <tbody>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            Picture:
                                        </th>
                                        <td class="px-6 py-4">
                                            <img src={`${BASE_URL}/public/images/${lostPet.image}`} alt="img" className='w-60 h-60 object-cover max-sm:w-40 max-sm:h-40 rounded-md max-sm:min-w-40 max-sm:min-h-40' />
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            Name:
                                        </th>
                                        <td class="px-6 py-4">
                                            {lostPet.name}
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            Species:
                                        </th>
                                        <td class="px-6 py-4">
                                            {lostPet.species}
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            Gender:
                                        </th>
                                        <td class="px-6 py-4">
                                            {lostPet.gender}
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            Breed:
                                        </th>
                                        <td class="px-6 py-4">
                                            {lostPet.breed}
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            Color:
                                        </th>
                                        <td class="px-6 py-4">
                                            {lostPet.color}
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            Age:
                                        </th>
                                        <td class="px-6 py-4">
                                            {lostPet.age}
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            Last Seen Date:
                                        </th>
                                        <td class="px-6 py-4">
                                            {new Date(lostPet.lastSeenDate).toLocaleString()}
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            Last Seen Location:
                                        </th>
                                        <td class="px-6 py-4">
                                            {lostPet.lastSeenLocation}
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            City:
                                        </th>
                                        <td class="px-6 py-4">
                                            {lostPet.city}
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            Contact Email:
                                        </th>
                                        <td class="px-6 py-4">
                                            {lostPet.contactEmail}
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            Contact Phone Number:
                                        </th>
                                        <td class="px-6 py-4">
                                            {lostPet.contactPhoneNumber}
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            Status:
                                        </th>
                                        <td class="px-6 py-4">
                                            {lostPet.lostStatus}
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            Notice Date:
                                        </th>
                                        <td class="px-6 py-4">
                                            {new Date(lostPet.createdAt).toLocaleString()}
                                        </td>
                                    </tr>
                                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap dark:text-white">
                                            Description:
                                        </th>
                                        <td class="px-6 py-4">
                                            {lostPet.description}
                                        </td>
                                    </tr>


                                </tbody>
                            </table>
                            <div>
                                {
                                    lostPet.userId._id === userId &&
                                    <div className="px-6 py-4">
                                        <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-yellow-900" onClick={handleOpen}>Edit Notice</button>
                                    </div>
                                }
                            </div>
                        </div>

                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 max-xl:w-3/5 max-md:w-4/5 max-sm:w-full max-sm:text-xs p-6 outline-indigo-400 bg-white dark:bg-[#101010] dark:text-white rounded-md overflow-y-auto max-h-[85%]">
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    Update Notice
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                                    <div className="my-2">
                                        <label htmlFor="image" className="block mb-2 text-sm font-medium">Image</label>
                                        <input
                                            type="file"
                                            id="image"
                                            ref={fileInputRef}
                                            onChange={handleImageChange}
                                            className="border dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg block w-full p-2.5 max-sm:p-2 dark:bg-transparent"
                                            required
                                        />
                                    </div>
                                    <div>
                                        {previewImage !== null &&
                                            <div>
                                                <span>Preview</span>
                                                <img src={previewImage} alt='previewImage' className='w-full object-cover max-h-96 mb-2' />
                                                <button onClick={handleRemoveImage} className='bg-red-600 px-3 rounded-lg text-white py-1'>Remove</button>
                                            </div>
                                        }
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={handleNameChange}
                                            className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent"
                                        />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="species" className="block mb-2 text-sm font-medium">Species</label>
                                        <input type="text" id="species" value={species} onChange={handleSpeciesChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="age" className="block mb-2 text-sm font-medium">Age</label>
                                        <input type="number" id="age" value={age} onChange={handleAgeChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="gender" className="block mb-2 text-sm font-medium">Gender</label>
                                        <input type="text" id="gender" value={gender} onChange={handleGenderChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="breed" className="block mb-2 text-sm font-medium">Breed</label>
                                        <input type="text" id="breed" value={breed} onChange={handleBreedChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="city" className="block mb-2 text-sm font-medium">City</label>
                                        <input type="text" id="city" value={city} onChange={handleCityChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="lastSeenDate" className="block mb-2 text-sm font-medium">Last Seen Date</label>
                                        <input type="date" id="lastSeenDate" value={new Date(lastSeenDate).toLocaleDateString('en-CA')} onChange={handleLastSeenDateChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="color" className="block mb-2 text-sm font-medium">Color</label>
                                        <input type="text" id="color" value={color} onChange={handleColorChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent" />
                                    </div>

                                    <div className="my-2">
                                        <label htmlFor="lastSeenLocation" className="block mb-2 text-sm font-medium">Last Seen Location</label>
                                        <input type="text" id="lastSeenLocation" value={lastSeenLocation} onChange={handleLastSeenLocation} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="lostStatus" className="block mb-2 text-sm font-medium">Lost Status</label>

                                        <select id="lostStatus" name="lostStatus" className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-[#101010]" value={lostStatus} onChange={handleLostStatusChange}>
                                            <option value="Lost">Lost</option>
                                            <option value="Found">Found</option>
                                        </select>
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="contactPhoneNumber" className="block mb-2 text-sm font-medium">Contact Phone Number</label>
                                        <input type="tel" id="contactPhoneNumber" value={contactPhoneNumber} onChange={handleContactPhoneChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="contactEmail" className="block mb-2 text-sm font-medium">Contact Email</label>
                                        <input type="email" id="contactEmail" value={contactEmail} onChange={handleContactEmailChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent" />
                                    </div>
                                    <div className="my-2">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium">Description</label>
                                        <textarea type="text" id="description" rows="4" value={description} onChange={handleDescriptionChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent resize-none" />
                                    </div>
                                    <div className="flex justify-end bg-white dark:bg-transparent my-3">
                                        <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-yellow-900" onClick={handleNoticeUpdate}>Edit Notice</button>
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
