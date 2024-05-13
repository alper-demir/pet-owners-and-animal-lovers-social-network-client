import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import loading from "../../asset/loading.gif"
import calculateTimeAgo from "../../helpers/calculateTimeAgo";
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MdDeleteForever, MdModeEditOutline, MdOutlinePets } from "react-icons/md";
import { FaRegComment } from "react-icons/fa";

const PostDetail = () => {

    const [post, setPost] = useState({});
    const [postComments, setPostComments] = useState([]);
    const [postLikes, setPostLikes] = useState([]);
    const { postId } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [isCommentLoading, setIsCommentLoading] = useState(false)
    const [showComment, setShowComment] = useState(false)
    const [comment, setComment] = useState("")
    const [currentUserLikedPost, setCurrentUserLikedPost] = useState(false);


    const URL = process.env.REACT_APP_BASE_URL;
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const ref = useRef();
    const { userId } = useSelector(state => state.user.user)
    const { username } = useSelector(state => state.user.user)

    const getPostData = async () => {
        try {
            const postData = await axios.post(`${URL}/post/${postId}`, {}, { headers: { Authorization: token } });
            if (postData) {
                setPost(postData.data);
                setPostComments(postData.data.comments);
                setPostLikes(postData.data.likes);
                console.log(postData.data);
                setIsLoading(false)
            }
        } catch (error) {
            console.log("Post detail page error: " + error);
            toast.error("No post record!")
            navigate("/")
        }
    }

    useEffect(() => {
        getPostData();
        checkPostLikedStatus();
    }, [])

    const showComments = () => {
        setShowComment(prev => !prev)
    }

    const likePost = async () => {
        const likePost = await axios.post(`${URL}/like-post`, { userId, postId }, { headers: { Authorization: token } });
        console.log(likePost.data);
        getPostData();
        checkPostLikedStatus();
    }

    const checkPostLikedStatus = async () => {
        try {
            const liked = await axios.post(`${URL}/check-post-like-status`, { userId, postId }, { headers: { Authorization: token } });
            liked && setCurrentUserLikedPost(liked.data.liked)
        } catch (error) {
            console.log(error);
        }
    }

    const shareComment = async () => {
        if (comment.length > 0) {
            setIsCommentLoading(true)

            try {
                const createComment = await axios.post(`${URL}/create-comment`, { userId, postId, content: comment }, { headers: { Authorization: token } });
                if (createComment) {
                    console.log(createComment.data);
                    getPostData();
                    setIsCommentLoading(false)
                    toast.success("New comment added to post.")
                    setComment("")
                    ref.current.value = ""
                }
            } catch (error) {

            }
        }
        else {
            toast.error("Input field can not be empty!");
        }

    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [openEditCommentModal, setOpenEditCommentModal] = useState(false);
    const handleOpenEditCommentModal = () => setOpenEditCommentModal(true);
    const handleCloseEditComment = () => setOpenEditCommentModal(false);

    const [openEditModal, setOpenEditModal] = useState(false);
    const handleOpenEditModal = () => {
        setOpenEditModal(true)
        setContent(post.content)
    }
    const handleCloseEditModal = () => setOpenEditModal(false);

    const [content, setContent] = useState();
    const handleContentChange = (event) => {
        setContent(event.target.value)
    };

    const handleEditPost = async () => {
        try {
            const editPost = await axios.put(`${URL}/update-post/${postId}`, { content }, { headers: { Authorization: token } });
            if (editPost.data.status) {
                handleCloseEditModal();
                getPostData();
                toast.success(editPost.data.message);
            } else {
                toast.error(editPost.data.message);
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const handleDeletePost = async () => {
        const deleteConfirm = window.confirm("Are you sure delete this post?");
        if (deleteConfirm) {
            try {
                const deletePost = await axios.delete(`${URL}/delete-post/${postId}`, { headers: { Authorization: token } });
                if (deletePost.data.status) {
                    handleCloseEditModal();
                    navigate(`/${username}`)
                    toast.success(deletePost.data.message);
                } else {
                    toast.error(deletePost.data.message);
                }
            } catch (error) {
                toast.error(error.message)
            }
        }
    }
    const [editCommentText, setEditCommentText] = useState("");
    const [editedCommentId, setEditedCommentId] = useState("");

    const editCommentModal = (id, content) => {
        setEditCommentText(content)
        setEditedCommentId(id);
        handleOpenEditCommentModal();
    }

    const handleEditComment = async () => {
        try {
            const editComment = await axios.post(`${URL}/edit-comment/${editedCommentId}`, { content: editCommentText }, { headers: { Authorization: token } });
            if (editComment.data.status === "success") {
                toast.success(editComment.data.message);
                getPostData();
                handleCloseEditComment();
            } else {
                toast.error(editComment.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    const deleteComment = async (id) => {
        const deleteConf = window.confirm("Are you sure to delete this comment?");
        if (deleteConf) {
            try {
                const deleteComment = await axios.post(`${URL}/delete-comment/${id}`, { postId }, { headers: { Authorization: token } });
                if (deleteComment.data.status === "success") {
                    toast.success(deleteComment.data.message);
                    getPostData();
                } else {
                    toast.error(deleteComment.data.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <>
            {
                isLoading ? (
                    <div className="flex justify-center items-center mt-20"> <img src={loading} alt="" className="w-16 h-16" /> </div>
                ) : (
                    <div className='w-full mx-auto mt-3 mb-20 border rounded-md dark:border-opacity-20 border-gray-200 text-[15px] max-sm:text-xs max-lg:text-sm'>

                        <div className='flex rounded-md flex-col'>

                            <div className='flex flex-col justify-center -mt-1 gap-y-1 dark:text-white p-3'>

                                <div className="flex justify-between items-center">

                                    <div className="flex gap-x-1 items-center">
                                        <div>
                                            <Link to={`/${post.userId.username}`}>
                                                <img src={`${URL}/public/images/${post.userId.profileUrl}`} alt="img" className='min-w-[36px] h-9 w-9 object-cover rounded-full' />
                                            </Link>
                                        </div>

                                        <div className='flex flex-col gap-x-1 font-semibold max-sm:flex-col'>
                                            <div className="hover:underline underline-offset-2 cursor-pointer">
                                                <Link to={`/${post.userId.username}`}>
                                                    {post.userId.firstName + " " + post.userId.lastName}
                                                </Link>
                                            </div>
                                            <div className="text-sm max-sm:text-xs">
                                                <Link to={`/${post.userId.username}`}>@{post.userId.username}</Link>
                                            </div>
                                        </div>

                                    </div>


                                    <div className='text-[#999999] dark:text-[#777777] cursor-pointer'>
                                        <div title={new Date(post.createdAt).toLocaleString()}>
                                            {
                                                calculateTimeAgo(post.createdAt)
                                            }
                                        </div>
                                    </div>

                                </div>

                                {post.content &&
                                    <div className="my-2">{post.content}</div>
                                }

                                <div className="mt-1">
                                    <img src={`${URL}/public/images/${post.image}`} className="rounded-md object-cover w-full" alt="img" />
                                </div>
                                {/* icons */}
                                <div className='flex gap-1 -ml-2'>
                                    <div onClick={likePost} className='hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E] p-2 rounded-full transition-colors duration-200 cursor-pointer'>
                                        <MdOutlinePets className={`text-2xl ${currentUserLikedPost ? "text-indigo-500" : ""}`} title='Like' />
                                    </div>
                                    <div className='hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E] p-2 rounded-full transition-colors duration-200 cursor-pointer text-2xl' onClick={() => ref.current.focus()}>
                                        <FaRegComment />
                                    </div>
                                </div>

                                <div className='flex gap-1 text-[#999999] dark:text-[#777777]'>
                                    <span onClick={showComments} className="hover:underline underline-offset-2 cursor-pointer">{post.comments.length} comments</span>
                                    <span>&nbsp;·&nbsp;</span>
                                    <span onClick={handleOpen} className="hover:underline underline-offset-2 cursor-pointer">{post.likes.length} likes</span>
                                    {
                                        userId === post.userId._id &&
                                        <>
                                            <span>&nbsp;·&nbsp;</span>
                                            <span onClick={handleOpenEditModal} className="hover:underline underline-offset-2 cursor-pointer">Edit</span>
                                        </>
                                    }
                                </div>

                            </div>

                            {/*Comments*/}
                            <div className="overflow-y-auto max-h-96">
                                {
                                    showComment &&
                                    postComments.map(comment => (
                                        <div className="border-t p-3 dark:text-white break-words dark:border-opacity-20 border-gray-200">
                                            <div className="flex justify-between items-center">

                                                <div className="flex gap-x-1 items-center">
                                                    <div>
                                                        <Link to={`/${comment.userId.username}`}>
                                                            <img src={`${URL}/public/images/${comment.userId.profileUrl}`} alt="img" className='min-w-[36px] h-9 w-9 object-cover rounded-full' />
                                                        </Link>
                                                    </div>

                                                    <div className='flex flex-col gap-x-1 font-semibold max-sm:flex-col'>
                                                        <div className="hover:underline underline-offset-2 cursor-pointer">
                                                            <Link to={`/${comment.userId.username}`}>
                                                                {comment.userId.firstName + " " + comment.userId.lastName}
                                                            </Link>
                                                        </div>
                                                        <div className="text-sm max-sm:text-xs">
                                                            <Link to={`/${comment.userId.username}`}>@{comment.userId.username}</Link>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className='text-[#999999] dark:text-[#777777] cursor-pointer text-sm max-sm:text-xs'>
                                                    <div title={new Date(comment.createdAt).toLocaleString()}>
                                                        {
                                                            calculateTimeAgo(comment.createdAt)
                                                        }
                                                    </div>

                                                </div>

                                            </div>

                                            <div className="my-2">
                                                {comment.content}
                                            </div>

                                            {
                                                userId === post.userId._id &&
                                                <>
                                                    <div className="flex gap-x-2 justify-end">
                                                        <div className="text-xl cursor-pointer" onClick={() => deleteComment(comment._id)}><MdDeleteForever /></div>
                                                        <div className="text-xl cursor-pointer" onClick={() => editCommentModal(comment._id, comment.content)}><MdModeEditOutline /></div>
                                                    </div>
                                                </>
                                            }

                                        </div>
                                    ))
                                }
                            </div>

                        </div>

                        <div className="flex justify-between dark:border-opacity-20 border-gray-200 border-t relative">
                            <input type="text" placeholder="add a comment.." className="w-full p-2 rounded-md pr-20 max-sm:pr-14 rounded-tl-none rounded-tr-none dark:bg-[#101010] dark:text-white" onChange={(e) => setComment(e.target.value)} ref={ref} />
                            <button className="p-2 absolute right-0 hover:underline underline-offset-2 cursor-pointer text-blue-500 hover:text-blue-700 font-semibold" onClick={shareComment}>
                                Share
                            </button>
                            {
                                isCommentLoading && <img src={loading} alt="" className="w-6 h-6 top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 absolute" />
                            }
                        </div>

                    </div >

                )
            }

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 max-xl:w-2/5 max-md:w-3/5 p-4 bg-white dark:bg-[#101010] dark:text-white max-h-80 overflow-y-auto rounded-md">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Likes
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                        {
                            postLikes && postLikes.map(postLike => (
                                <div className="flex gap-x-2 items-center my-1 text-[15px] max-sm:text-xs max-lg:text-sm">
                                    <div>
                                        <Link to={`/${postLike.username}`}>
                                            <img src={`${URL}/public/images/${postLike.profileUrl}`} alt="img" className='min-w-[36px] h-9 w-9 object-cover rounded-full' />
                                        </Link>
                                    </div>
                                    <div className="flex flex-col">
                                        <Link to={`/${postLike.username}`}>{postLike.firstName + " " + postLike.lastName}</Link>
                                        <Link to={`/${postLike.username}`}>@{postLike.username}</Link>
                                    </div>
                                </div>
                            ))
                        }
                    </Typography>
                </Box>
            </Modal>

            <Modal
                open={openEditModal}
                onClose={handleCloseEditModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 max-xl:w-3/5 max-md:w-4/5 p-4 bg-white dark:bg-[#101010] dark:text-white max-h-80 overflow-y-auto rounded-md">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Post
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} >

                        <div className="my-2">
                            <label htmlFor="content" className="block mb-2 text-sm font-medium">Content</label>
                            <textarea type="text" id="content" rows="3" value={content} onChange={handleContentChange} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent resize-none outline-none" />
                        </div>
                        <div className="flex justify-end bg-white dark:bg-transparent my-3">
                            <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-yellow-900" onClick={handleEditPost}>Edit Post</button>
                        </div>
                        <div className="flex justify-end bg-white dark:bg-transparent my-3">
                            <button type="button" class="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-red-900" onClick={handleDeletePost}>Delete Post</button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
            <Modal
                open={openEditCommentModal}
                onClose={handleCloseEditComment}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 max-xl:w-2/5 max-md:w-3/5 p-4 bg-white dark:bg-[#101010] dark:text-white max-h-80 overflow-y-auto rounded-md">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Comment
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} >

                        <div className="my-2">
                            <label htmlFor="comment" className="block mb-2 text-sm font-medium">Comment</label>
                            <textarea type="text" id="comment" rows="3" value={editCommentText} onChange={(e) => setEditCommentText(e.target.value)} className="bg-gray-50 border border-gray-300 dark:border-[#777777] dark:border-opacity-30 text-sm rounded-lg w-full p-2.5 max-sm:p-2 dark:bg-transparent resize-none outline-none" />
                        </div>
                        <div className="flex justify-end bg-white dark:bg-transparent my-3">
                            <button type="button" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-yellow-900" onClick={handleEditComment}>Edit Comment</button>
                        </div>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}

export default PostDetail;