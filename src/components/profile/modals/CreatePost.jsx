import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import toast from 'react-hot-toast';


const CreatePost = ({ openCreatePostModal, setOpenCreatePostModal, getPosts }) => {
    const { userId } = useSelector(state => state.user.user)

    const fileInputRef = useRef(null);

    const [content, setContent] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
        setOpenCreatePostModal(false)
    };

    const token = localStorage.getItem("token");
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        setOpen(openCreatePostModal);
    }, [])

    const handleCreatePost = async () => {

        if (!selectedImage) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('userId', userId);
        formData.append('content', content);

        try {
            const response = await axios.post(`${BASE_URL}/create-post`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: token
                }
            });
            if (response.data.status === "success") {
                toast.success(response.data.message);
                setOpen(false);
                setOpenCreatePostModal(false);
                getPosts();
            } else {
                toast.error(response.data.message);
            }
            console.log(response.data);
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('An error occurred while creating post.');
        }
    };

    const handleRemoveImage = () => {
        setPreviewImage(null); // Cleaer preview
        setSelectedImage(null)
        fileInputRef.current.value = null; // Clear input content
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        setSelectedImage(file);
        file ? setPreviewImage(URL.createObjectURL(file)) : setPreviewImage(null)
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 max-xl:w-3/5 max-md:w-4/5 max-sm:w-[95%] max-sm:text-xs p-6 outline-indigo-400 bg-white dark:bg-[#101010] dark:text-white rounded-md overflow-y-auto max-h-[85%]">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create New Post
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
                        <div className="my-4">
                            <label htmlFor="content" className="block mb-2 text-sm font-medium">Content</label>
                            <textarea name="content" id="content" rows="5" placeholder='Content..' className='resize-none w-full p-2 border dark:border-[#777777] dark:border-opacity-30 rounded-md outline-none dark:bg-transparent ' onChange={(e) => setContent(e.target.value)}></textarea>
                        </div>


                        <div className="flex justify-end bg-white dark:bg-transparent my-3">
                            <button onClick={handleCreatePost} type="submit" className="text-white bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800">Create</button>
                        </div>
                    </Typography>
                </Box>


            </Modal>
        </div>
    )
}

export default CreatePost