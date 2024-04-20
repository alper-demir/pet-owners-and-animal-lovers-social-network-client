import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import loading from "../../asset/loading.gif"
import calculateTimeAgo from "../../helpers/calculateTimeAgo";
const PostDetail = () => {

    const [post, setPost] = useState({});
    const { postId } = useParams();
    const [isLoading, setIsLoading] = useState(true)
    const [showComment, setShowComment] = useState(false)
    const URL = "http://localhost:3001"
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const getPostData = async () => {
        try {
            const postData = await axios.post(`${URL}/post/${postId}`, {}, { headers: { Authorization: token } });
            if (postData) {
                setPost(postData.data);
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
    }, [])

    const showComments = () => {
        setShowComment(prev => !prev)
    }

    return (
        <>
            {
                isLoading ? (
                    <div className="flex justify-center items-center mt-20"> <img src={loading} alt="" className="w-16 h-16" /> </div>
                ) : (
                    <div className='w-full mx-auto mt-3 border rounded-md dark:border-opacity-20 border-gray-200 text-[15px] max-sm:text-xs max-lg:text-sm'>

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
                                    <div className='hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E] p-2 rounded-full transition-colors duration-200 cursor-pointer'>
                                        <svg aria-label="Beğen" class="x1lliihq x1n2onr6 dark:text-white" color="rgb(0, 0, 0)" fill="transparent" height="19" role="img" viewBox="0 0 24 22" width="20"><title>Beğen</title><path d="M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z" stroke="currentColor" stroke-width="2"></path></svg>
                                    </div>
                                    <div className='hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E] p-2 rounded-full transition-colors duration-200 cursor-pointer'>
                                        <svg aria-label="Yorum Yap" class="x1lliihq x1n2onr6 dark:text-white" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Yorum Yap</title><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path></svg>
                                    </div>
                                    <div className='hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E] p-2 rounded-full transition-colors duration-200 cursor-pointer'>
                                        <svg aria-label="Yeniden paylaş" class="x1lliihq x1n2onr6 dark:text-white dark:fill-white" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Yeniden paylaş</title><path d="M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z"></path></svg>
                                    </div>
                                    <div className='hover:bg-[#F5F5F5] dark:hover:bg-[#1E1E1E] p-2 rounded-full transition-colors duration-200 cursor-pointer'>
                                        <svg aria-label="Paylaş" class="x1lliihq x1n2onr6 dark:text-white" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="20" role="img" viewBox="0 0 24 24" width="20"><title>Paylaş</title><line fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2" x1="22" x2="9.218" y1="3" y2="10.083"></line><polygon fill="none" points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></polygon></svg>
                                    </div>
                                </div>

                                <div className='flex gap-1 text-[#999999] dark:text-[#777777]'>
                                    <span onClick={showComments} className="hover:underline underline-offset-2 cursor-pointer">{post.comments.length} comments</span>
                                    <span>&nbsp;·&nbsp;</span>
                                    <span className="hover:underline underline-offset-2 cursor-pointer">{post.likes.length} likes</span>
                                </div>



                            </div>
                            {
                                showComment &&
                                post.comments.map(comment => (
                                    <div className="border-t p-3">
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


                                            <div className='text-[#999999] dark:text-[#777777] cursor-pointer'>
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



                        {/* date */}

                    </div>
                )
            }

        </>
    );
}

export default PostDetail;
