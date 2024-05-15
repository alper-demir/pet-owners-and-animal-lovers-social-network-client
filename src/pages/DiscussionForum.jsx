import { FaRegComment, FaRegPlusSquare } from "react-icons/fa";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const DiscussionForum = () => {

    const [discussions, setDiscussions] = useState([]);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { userId } = useSelector(state => state.user.user);

    const token = localStorage.getItem("token");
    const URL = process.env.REACT_APP_BASE_URL;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleCreateDiscussion = async (e) => {
        e.preventDefault();
        try {
            const newDiscussion = await axios.post(`${URL}/create-discussion`, { title: title.trim(), content: content.trim(), author: userId }, { headers: { Authorization: token } });
            if (newDiscussion.data.status === "success") {
                toast.success(newDiscussion.data.message);
                getDiscussionList();
                handleClose();
            } else {
                toast.error(newDiscussion.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const getDiscussionList = async () => {
        try {
            const response = await axios.get(`${URL}/community-discussions`);
            if (response.data.status === "success") {
                console.log(response.data);
                setDiscussions(response.data.discussions);
            }
        } catch (error) {
            console.error('Error fetching discussions:', error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getDiscussionList();
    }, []);

    return (
        <>
            <Helmet>
                <title>Discussion Forum</title>
            </Helmet>
            <div className='mt-3 mb-5 text-center text-lg max-sm:text-base font-bold dark:text-white'>
                <h3>Discussion Forum</h3>
                <meta name="description" content="Join the Discussion Forum for animal lovers and advocates. Share pet care tips, wildlife conservation efforts, and advocacy campaigns. Connect with like-minded individuals and contribute to building a compassionate community dedicated to protecting animals." />
            </div>
            <section>
                <div className="flex justify-end mb-4 dark:text-white">
                    <FaRegPlusSquare className="text-3xl hover:scale-95 cursor-pointer duration-300 transition-transform" onClick={handleOpen} />
                </div>
            </section>
            <ul>
                {
                    discussions &&
                    discussions.map(discussion => (
                        <li key={discussion._id} className='border-b py-1 flex justify-between dark:text-white'>
                            <div className="pr-8">
                                <Link to={`/discussion/${discussion._id}`}>{discussion.title}</Link>
                            </div>
                            <div className="flex gap-x-5 items-center">
                                <div className="flex gap-x-1 items-center">
                                    <div>
                                        <span>{discussion.tips.length}</span>
                                    </div>
                                    <div>
                                        <FaRegComment />
                                    </div>
                                </div>
                                <div>
                                    {new Date(discussion.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </li>
                    ))}
            </ul>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-content"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 max-xl:w-2/5 max-md:w-[95%] p-4 bg-white dark:bg-[#101010] dark:text-white rounded-md outline-none">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Create New Discussion
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                        <form onSubmit={handleCreateDiscussion}>
                            <div className="my-2">
                                <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                <input type="text" id="title" onChange={(e) => setTitle(e.target.value)} className="text-sm rounded-lg block w-full p-2.5 max-sm:p-2 dark:bg-transparent border dark:border-[#777777] dark:border-opacity-30" required />
                            </div>
                            <div className="my-2">
                                <label htmlFor="content" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                                <textarea name="content" id="content" rows="5" placeholder='Content..' className='resize-none w-full p-2 border dark:border-[#777777] dark:border-opacity-30 rounded-md outline-none dark:bg-transparent' onChange={(e) => setContent(e.target.value)} required></textarea>
                            </div>
                            <div className="flex justify-end bg-white dark:bg-transparent my-3">
                                <button type="submit" className="text-white bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800">Create</button>
                            </div>
                        </form>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
};

export default DiscussionForum;
