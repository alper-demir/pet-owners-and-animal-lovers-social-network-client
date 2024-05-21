import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';

const CreateAdoptionNotice = ({ openCreateAdoptionNoticeModal, setOpenCreateAdoptionNoticeModal, getAdoptionNotices }) => {
    const { userId } = useSelector(state => state.user.user)

    const fileInputRef = useRef(null);

    const [name, setName] = useState("");
    const [species, setSpecies] = useState("");
    const [age, setAge] = useState("");
    const [breed, setBreed] = useState();
    const [color, setColor] = useState();
    const [description, setDescription] = useState();
    const [city, setCity] = useState();
    const [dateOfBirth, setDateOfBirth] = useState();
    const [adoptionStatus, setAdoptionStatus] = useState("Adopting");
    const [gender, setGender] = useState("male");
    const [contactPhoneNumber, setContactPhoneNumber] = useState();
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
        setOpenCreateAdoptionNoticeModal(false)
    };

    const token = localStorage.getItem("token");
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        setOpen(openCreateAdoptionNoticeModal);
        getCities();
    }, [])

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

    const handleCreateAdoptionNotice = async (e) => {
        e.preventDefault();

        if (name && species && breed && city && description && color && gender && selectedImage && contactPhoneNumber && age && dateOfBirth) {

            if (!selectedImage) {
                toast.error('Please select a file.');
                return;
            }

            const formData = new FormData();
            formData.append('image', selectedImage);
            formData.append('userId', userId);
            formData.append('name', name);
            formData.append('species', species);
            formData.append('age', age);
            formData.append('breed', breed);
            formData.append('color', color);
            formData.append('city', city);
            formData.append('gender', gender);
            formData.append('dateOfBirth', dateOfBirth);
            formData.append('description', description);
            formData.append('adoptionStatus', adoptionStatus);
            formData.append('contactPhoneNumber', contactPhoneNumber);

            try {
                const response = await axios.post(`${BASE_URL}/create-adoption-notice`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: token
                    }
                })
                if (response.data.status === "success") {
                    toast.success(response.data.message);
                    setOpen(false);
                    setOpenCreateAdoptionNoticeModal(false);
                    getAdoptionNotices();
                } else {
                    toast.error(response.data.message);
                }
                console.log(response.data);
            } catch (error) {
                toast.error("An error occured!");
            }
        }

        else {
            toast.error("Please try later.")
        }

    }

    const [cities, setCities] = useState([]);
    const getCities = async () => {
        const cities = await axios.get(`${BASE_URL}/cities`);
        if (cities) {
            setCities(cities.data);
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 max-xl:w-3/5 max-md:w-4/5 max-sm:w-[95%] max-sm:text-xs p-6 outline-indigo-400 bg-white dark:bg-[#101010] dark:text-white rounded-md overflow-y-auto max-h-[85%] outline-none">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create Adoption Notice
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                        <form onSubmit={handleCreateAdoptionNotice}>
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
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input type="text" id="name" onChange={(e) => setName(e.target.value)} className="text-sm rounded-lg block w-full p-2.5 max-sm:p-2 dark:bg-transparent border dark:border-[#777777] dark:border-opacity-30" required />
                            </div>
                            <div className="my-2">
                                <label htmlFor="species" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Species</label>
                                <input type="text" id="species" onChange={(e) => setSpecies(e.target.value)} className="text-sm rounded-lg block w-full p-2.5 max-sm:p-2 dark:bg-transparent border dark:border-[#777777] dark:border-opacity-30" required />
                            </div>
                            <div className="my-2">
                                <label htmlFor="breed" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Breed</label>
                                <input type="text" id="breed" onChange={(e) => setBreed(e.target.value)} className="text-sm rounded-lg block w-full p-2.5 max-sm:p-2 dark:bg-transparent border dark:border-[#777777] dark:border-opacity-30" required />
                            </div>
                            <div className="my-2">
                                <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Age</label>
                                <input type="number" id="age" onChange={(e) => setAge(e.target.value)} className="text-sm rounded-lg block w-full p-2.5 max-sm:p-2 dark:bg-transparent border dark:border-[#777777] dark:border-opacity-30" required />
                            </div>
                            <div className="my-2">
                                <label htmlFor="color" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                                <input type="text" id="color" onChange={(e) => setColor(e.target.value)} className="text-sm rounded-lg block w-full p-2.5 max-sm:p-2 dark:bg-transparent border dark:border-[#777777] dark:border-opacity-30" required />
                            </div>
                            <div className="my-2">
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                <select name="gender" id="" onChange={(e) => setGender(e.target.value)} value={gender} className='text-sm rounded-lg block w-full p-2.5 max-sm:p-2 dark:bg-[#101010] border dark:border-[#777777] dark:border-opacity-30' required>
                                    <option value="male" className='bg-transparent' selected >Male</option>
                                    <option value="female" className='bg-transparent'>Female</option>
                                </select>
                            </div>
                            <div className="my-2">
                                <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date of Birth</label>
                                <input type="date" id="dateOfBirth" onChange={(e) => setDateOfBirth(e.target.value)} className="text-sm rounded-lg block w-full p-2.5 max-sm:p-2 dark:bg-transparent border dark:border-[#777777] dark:border-opacity-30" required />
                            </div>
                            <div className="my-2">
                                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">City</label>
                                <select
                                    id="city"
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-[#141414]"
                                >
                                    <option value="" disabled>Select City</option>
                                    {cities && cities.map(city => (
                                        <option value={city}>{city}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="my-2">
                                <label htmlFor="contactPhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact Phone Number</label>
                                <input type="tel" id="contactPhoneNumber" onChange={(e) => setContactPhoneNumber(e.target.value)} className="text-sm rounded-lg block w-full p-2.5 max-sm:p-2 dark:bg-transparent border dark:border-[#777777] dark:border-opacity-30" required />
                            </div>
                            <div className="my-2">
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Adoption Status</label>
                                <select name="gender" id="" onChange={(e) => setAdoptionStatus(e.target.value)} value={gender} className='text-sm rounded-lg block w-full p-2.5 max-sm:p-2 dark:bg-[#101010] border dark:border-[#777777] dark:border-opacity-30' required>
                                    <option value="Adopting" className='bg-transparent' selected >Adopting</option>
                                    <option value="Adopted" className='bg-transparent'>Adopted</option>
                                </select>
                            </div>
                            <div className="my-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea name="description" id="description" rows="5" placeholder='Description..' className='resize-none w-full p-2 border dark:border-[#777777] dark:border-opacity-30 rounded-md outline-none dark:bg-transparent' onChange={(e) => setDescription(e.target.value)} required></textarea>
                            </div>
                            <div className="flex justify-end bg-white dark:bg-transparent my-3">
                                <button type="submit" className="text-white bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800">Create</button>
                            </div>
                        </form>
                    </Typography>
                </Box>


            </Modal>
        </div>
    )
}

export default CreateAdoptionNotice