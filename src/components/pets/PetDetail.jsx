import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const PetDetail = () => {

    const [petOwner, setPetOwner] = useState("")
    const [pet, setPet] = useState({});
    const { petId } = useParams();

    const BASE_URL = process.env.REACT_APP_BASE_URL;
    const fileInputRef = useRef(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const getPetData = async () => {
        try {
            const petData = await axios.post(`${BASE_URL}/pet/${petId}`, {}, { headers: { Authorization: token } });
            if (petData) {
                setPet(petData.data);
                setPetOwner(petData.data.userId)
                console.log(petData.data);
            }
        } catch (error) {
            console.log("Pet detail page error: " + error);
            toast.error("No pet record!")
            navigate("/")
        }
    }
    const { userId } = useSelector(state => state.user.user)
    const { username } = useSelector(state => state.user.user)

    useEffect(() => {
        getPetData();
    }, [])

    const [name, setName] = useState();
    const [species, setSpecies] = useState();
    const [weight, setWeight] = useState();
    const [gender, setGender] = useState();
    const [color, setColor] = useState();
    const [breed, setBreed] = useState();
    const [birthDate, setBirthDate] = useState();
    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleSpeciesChange = (event) => {
        setSpecies(event.target.value)
    };

    const handleWeightChange = (event) => {
        setWeight(event.target.value)
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value)
    };

    const handleBreedChange = (event) => {
        setBreed(event.target.value)
    };

    const handleBirthDateChange = (event) => {
        setBirthDate(event.target.value)
    };

    const handleColorChange = (event) => {
        setColor(event.target.value)
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

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
        setName(pet.name)
        setSpecies(pet.species)
        setGender(pet.gender)
        setBreed(pet.breed)
        setWeight(pet.weight)
        setColor(pet.color)
        setBirthDate(pet.birthDate)
    }
    const handleClose = () => setOpen(false);

    const handlepetProfileUpdate = async () => {
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('userId', userId);
        formData.append('name', name);
        formData.append('species', species);
        formData.append('gender', gender);
        formData.append('color', color);
        formData.append('breed', breed);
        formData.append('weight', weight);
        formData.append('birthDate', birthDate);

        try {
            const updateNotice = await axios.put(`${BASE_URL}/pet-profile/${petId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: token
                }
            })
            if (updateNotice) {
                console.log(updateNotice);
                setOpen(false);
                getPetData();
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
    }

    const handleDeletePetProfile = async () => {
        const deleteConfirm = window.confirm("Are you sure delete this pet profile?");
        if (deleteConfirm) {
            try {
                const deletePost = await axios.delete(`${BASE_URL}/delete-pet-profile/${petId}`, { headers: { Authorization: token } });
                if (deletePost.data.status) {
                    handleClose();
                    navigate(`/${username}/pets`)
                    toast.success(deletePost.data.message);
                } else {
                    toast.error(deletePost.data.message);
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    }

    return (
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mb-20 dark:text-white">
            <table class="w-full text-sm text-left rtl:text-right">
                <tbody>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Picture:
                        </th>
                        <td class="px-6 py-4">
                            <img src={`${BASE_URL}/public/images/${pet.profileUrl}`} alt={pet.name} className='w-60 h-60 object-cover max-sm:w-40 max-sm:h-40 rounded-md max-sm:min-w-40 max-sm:min-h-40' />
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Name:
                        </th>
                        <td class="px-6 py-4">
                            {pet.name}
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Birth Date:
                        </th>
                        <td class="px-6 py-4">
                            {new Date(pet.birthDate).toLocaleDateString()}
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Gender:
                        </th>
                        <td class="px-6 py-4">
                            {pet.gender}
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Breed:
                        </th>
                        <td class="px-6 py-4">
                            {pet.breed}
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Color:
                        </th>
                        <td class="px-6 py-4">
                            {pet.color}
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Age:
                        </th>
                        <td class="px-6 py-4">
                            {new Date().getFullYear() - new Date(pet.birthDate).getFullYear()} years old
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Weight:
                        </th>
                        <td class="px-6 py-4">
                            {pet.weight} kg
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Owner:
                        </th>
                        <td class="px-6 py-4">
                            <Link to={`/${petOwner.username}`}>@{petOwner.username}</Link>
                        </td>
                    </tr>

                </tbody>
            </table>
            <div>
                {
                    petOwner._id === userId &&
                    <div className="px-6 py-4">
                        <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-yellow-900" onClick={handleOpen} >Edit Pet Profile</button>
                    </div>
                }
            </div>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 max-xl:w-3/5 max-md:w-4/5 max-sm:w-full max-sm:text-xs p-6 outline-indigo-400 bg-white dark:bg-[#101010] dark:text-white rounded-md overflow-y-auto max-h-[85%]">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Update Pet Profile
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
                            <label htmlFor="weight" className="block mb-2 text-sm font-medium">Weight</label>
                            <input type="number" id="weight" value={weight} onChange={handleWeightChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent" />
                        </div>
                        <div className="my-2">
                            <label htmlFor="gender" className="block mb-2 text-sm font-medium">Gender</label>
                            <select id="gender" name="gender" className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-[#101010]" value={gender} onChange={handleGenderChange}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="my-2">
                            <label htmlFor="breed" className="block mb-2 text-sm font-medium">Breed</label>
                            <input type="text" id="breed" value={breed} onChange={handleBreedChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent" />
                        </div>
                        <div className="my-2">
                            <label htmlFor="color" className="block mb-2 text-sm font-medium">Color</label>
                            <input type="text" id="color" value={color} onChange={handleColorChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent" />
                        </div>
                        <div className="my-2">
                            <label htmlFor="birthDate" className="block mb-2 text-sm font-medium">Birth Date</label>
                            <input type="date" id="birthDate" value={new Date(birthDate).toLocaleDateString('en-CA')} onChange={handleBirthDateChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent" />
                        </div>
                        <div className="flex justify-end bg-white dark:bg-transparent my-3">
                            <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-yellow-900" onClick={handlepetProfileUpdate}>Edit Notice</button>
                        </div>
                        <div className="flex justify-end bg-white dark:bg-transparent my-3">
                            <button type="button" class="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-red-900" onClick={handleDeletePetProfile}>Delete Pet Profile</button>
                        </div>
                    </Typography>
                </Box>


            </Modal>
        </div>

    );
};
export default PetDetail;
