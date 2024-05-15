import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import loading from "../../asset/loading.gif";
import calculateTimeAgo from './../../helpers/calculateTimeAgo';
import { useSelector } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md';
import { MdModeEditOutline } from 'react-icons/md';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Helmet } from "react-helmet";

const DiscussionDetail = () => {
    const { id } = useParams();
    const URL = process.env.REACT_APP_BASE_URL;
    const [discussion, setDiscussion] = useState({});
    const [content, setContent] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [author, setAuthor] = useState({});
    const [tips, setTips] = useState([]);

    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const { userId } = useSelector(state => state.user.user);

    const getDiscussionData = async () => {
        try {
            setIsLoading(true);
            const discussion = await axios.get(`${URL}/discussion/${id}`);
            if (discussion.data.status === "success") {
                setDiscussion(discussion.data.discussion);
                setAuthor(discussion.data.discussion.author);
                setTips(discussion.data.discussion.tips)
                console.log(discussion.data);
            } else {
                toast.error(discussion.data.message);
                navigate("/");
            }
            setIsLoading(false);
        } catch (error) {
            toast.error(error.message);
            navigate("/");
        }
    };

    const createTip = async (e) => {
        e.preventDefault();
        if (content.length > 0) {
            try {
                const response = await axios.post(`${URL}/create-tip`, { discussionId: id, userId, content: content.trim() }, { headers: { Authorization: token } });
                if (response.data.status === "success") {
                    getDiscussionData();
                    setContent("");
                    toast.success(response.data.message);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        } else {
            toast.error("Input field can not be empty!");
        }
    };

    useEffect(() => {
        getDiscussionData();
    }, []);

    const [editTipText, setEditTipText] = useState("");
    const [editedTipId, setEditedTipId] = useState("");

    const [openEditTipModal, setOpenEditTipModal] = useState(false);
    const handleOpenEditTipModal = () => setOpenEditTipModal(true);
    const handleCloseEditComment = () => setOpenEditTipModal(false);

    const editTipModal = (id, content) => {
        setEditTipText(content)
        setEditedTipId(id);
        handleOpenEditTipModal();
    }

    const handleEditTip = async () => {
        try {
            const editTip = await axios.post(`${URL}/edit-tip/${editedTipId}`, { content: editTipText }, { headers: { Authorization: token } });
            if (editTip.data.status === "success") {
                toast.success(editTip.data.message);
                getDiscussionData();
                handleCloseEditComment();
            } else {
                toast.error(editTip.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const deleteTip = async (tipId) => {
        const deleteConf = window.confirm("Are you sure to delete this tip?");
        if (deleteConf) {
            try {
                const deleteTip = await axios.post(`${URL}/delete-tip/${tipId}`, {}, { headers: { Authorization: token } });
                if (deleteTip.data.status === "success") {
                    toast.success(deleteTip.data.message);
                    getDiscussionData();
                } else {
                    toast.error(deleteTip.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className="mt-8 mb-40 dark:text-[#fffff9]">
            <Helmet>
                <title>{discussion.title}</title>
            </Helmet>
            {isLoading ? (
                <div className="flex justify-center items-center mt-20">
                    <img src={loading} alt="" className="w-8 h-8" />
                </div>
            ) : (
                <>
                    <div className="py-2">
                        <h2 className="text-lg font-semibold">{discussion.title}</h2>
                    </div>
                    {/* content */}
                    <div className="border-y py-3 dark:text-white break-words dark:border-opacity-20 border-gray-200">
                        <div className="flex justify-between items-center">

                            <div className="flex gap-x-1 items-center">
                                <div>
                                    <Link to={`/${author.username}`}>
                                        <img src={`${URL}/public/images/${author.profileUrl}`} alt="img" className='min-w-[36px] h-9 w-9 object-cover rounded-full' />
                                    </Link>
                                </div>

                                <div className='flex flex-col gap-x-1 font-semibold max-sm:flex-col'>
                                    <div className="hover:underline underline-offset-2 cursor-pointer">
                                        <Link to={`/${author.username}`}>
                                            {author.firstName + " " + author.lastName}
                                        </Link>
                                    </div>
                                    <div className="text-sm max-sm:text-xs">
                                        <Link to={`/${author.username}`}>@{author.username}</Link>
                                    </div>
                                </div>

                            </div>

                            <div className='text-[#999999] dark:text-[#777777] cursor-pointer text-sm max-sm:text-xs'>
                                <div title={new Date(discussion.createdAt).toLocaleString()}>
                                    {
                                        calculateTimeAgo(discussion.createdAt)
                                    }
                                </div>

                            </div>

                        </div>

                        <div className="my-2">
                            {discussion.content}
                        </div>
                    </div>

                    <h1 className="text-xl font-bold my-2">Tips</h1>
                    {/*tips*/}
                    <div>
                        {
                            tips.map(tip => (
                                <div className="border-t py-3 dark:text-white break-words dark:border-opacity-20 border-gray-200">
                                    <div className="flex justify-between items-center">

                                        <div className="flex gap-x-1 items-center">
                                            <div>
                                                <Link to={`/${tip.userId.username}`}>
                                                    <img src={`${URL}/public/images/${tip.userId.profileUrl}`} alt="img" className='min-w-[36px] h-9 w-9 object-cover rounded-full' />
                                                </Link>
                                            </div>

                                            <div className='flex flex-col gap-x-1 font-semibold max-sm:flex-col'>
                                                <div className="hover:underline underline-offset-2 cursor-pointer">
                                                    <Link to={`/${tip.userId.username}`}>
                                                        {tip.userId.firstName + " " + tip.userId.lastName}
                                                    </Link>
                                                </div>
                                                <div className="text-sm max-sm:text-xs">
                                                    <Link to={`/${tip.userId.username}`}>@{tip.userId.username}</Link>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='text-[#999999] dark:text-[#777777] cursor-pointer text-sm max-sm:text-xs'>
                                            <div title={new Date(tip.createdAt).toLocaleString()}>
                                                {calculateTimeAgo(tip.createdAt)}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="my-2">
                                        {tip.content}
                                    </div>

                                    {
                                        userId === tip.userId._id &&
                                        <>
                                            <div className="flex gap-x-2 justify-end">
                                                <div className="text-xl cursor-pointer" onClick={() => deleteTip(tip._id)}><MdDeleteForever /></div>
                                                <div className="text-xl cursor-pointer" onClick={() => editTipModal(tip._id, tip.content)}><MdModeEditOutline /></div>
                                            </div>
                                        </>
                                    }
                                </div>
                            ))
                        }
                    </div>

                    <form onSubmit={createTip} className="mt-10 border-t pt-4 dark:border-opacity-20 border-gray-200">
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full border border-gray-100 dark:border-[#777777] rounded-md p-2 resize-none dark:bg-[#141414] outline-none"
                            rows={4}
                            placeholder="Add your tip..."
                        ></textarea>
                        <div className="flex justify-end bg-white dark:bg-transparent mt-1">
                            <button type="submit" className="text-white bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800">Add Tip</button>
                        </div>
                    </form>
                </>
            )}

            <Modal
                open={openEditTipModal}
                onClose={handleCloseEditComment}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 max-md:w-[95%] p-4 bg-white dark:bg-[#101010] dark:text-white max-h-80 overflow-y-auto rounded-md outline-none">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Tip
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} >

                        <div className="my-2">
                            <label htmlFor="tip" className="block mb-2 text-sm font-medium">Tip</label>
                            <textarea type="text" id="tip" rows="3" value={editTipText} onChange={(e) => setEditTipText(e.target.value)} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent resize-none outline-none" />
                        </div>
                        <div className="flex justify-end bg-white dark:bg-transparent my-3">
                            <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-yellow-900" onClick={handleEditTip}>Edit Tip</button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
};

export default DiscussionDetail;