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


    const URL = "http://localhost:3001"
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const ref = useRef();
    const userId = useSelector(state => state.user.user.userId)

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

                                <div className="my-2">{post.content}</div>

                                <div>
                                    <img src={`${URL}/public/images/${post.image}`} className="rounded-md object-cover" alt="img" />
                                </div>
                                {/* icons */}
                                <div className='flex gap-1 -ml-2'>
                                    <div onClick={likePost} className='hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E] p-2 rounded-full transition-colors duration-200 cursor-pointer'>
                                        <svg aria-label="Beğen" class="x1lliihq x1n2onr6 dark:text-white" color="rgb(0, 0, 0)" fill={currentUserLikedPost ? "red" : "transparent"} height="19" role="img" viewBox="0 0 24 22" width="20"><title>Like</title><path d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z" stroke="currentColor" stroke-width="2"></path></svg>
                                    </div>
                                    <div className='hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E] p-2 rounded-full transition-colors duration-200 cursor-pointer' onClick={() => ref.current.focus()}>
                                        <svg aria-label="Yorum Yap" class="x1lliihq x1n2onr6 dark:text-white" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Comment</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                                    </div>
                                </div>

                                <div className='flex gap-1 text-[#999999] dark:text-[#777777]'>
                                    <span onClick={showComments} className="hover:underline underline-offset-2 cursor-pointer">{post.comments.length} comments</span>
                                    <span>&nbsp;·&nbsp;</span>
                                    <span onClick={handleOpen} className="hover:underline underline-offset-2 cursor-pointer">{post.likes.length} likes</span>
                                </div>

                            </div>
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
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/5 max-xl:w-2/5 max-md:w-3/5 p-4 outline-indigo-400 bg-white dark:bg-[#101010] dark:text-white max-h-80 overflow-y-auto rounded-md">
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
        </>
    );
}

export default PostDetail;