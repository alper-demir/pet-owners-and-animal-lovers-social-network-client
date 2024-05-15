import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import loadingGIF from "../asset/loading.gif"
import calculateTimeAgo from "../helpers/calculateTimeAgo";
import { Helmet } from "react-helmet";

const Home = () => {
    const URL = process.env.REACT_APP_BASE_URL;

    const navigate = useNavigate();

    const [viewType, setViewType] = useState('posts');
    const [timelineData, setTimelineData] = useState([]);
    const [loading, setLoading] = useState(false);

    const { userId } = useSelector(state => state.user.user);

    const handleViewTypeChange = (type) => {
        if (viewType !== type) {
            setViewType(type);
            setTimelineData([])
        }
    };

    const getTimelineData = async () => {
        setLoading(true);
        try {
            const timeline = await axios.get(`${URL}/timeline/${userId}/${viewType}`);
            if (timeline.data.status === "success") {
                setTimelineData(timeline.data.timeline);
                console.log(timeline.data)
            } else {
                toast.error("Timeline error! Try later.");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
        setLoading(false);
    }

    useEffect(() => {
        getTimelineData();
    }, [viewType])

    return (
        <div className="dark:text-white mt-4 max-sm:text-xs max-lg:text-base">
            <Helmet>
                <title>Home</title>
                <meta name="description" content="Welcome to Animal Lovers & Pet Owners, your go-to platform for all things related to pets and animals. Find valuable information on pet care, wildlife conservation, adoption, and more. Join our community of passionate animal lovers today!" />
            </Helmet>
            <div className="flex justify-center text-lg max-sm:text-sm max-lg:text-base text-center text-[#999999] font-semibold">
                <div onClick={() => handleViewTypeChange("posts")} className={`w-1/2 border-b-[1px] dark:border-[#777777] dark:border-opacity-30 pb-3 cursor-pointer ${viewType === "posts" ? "border-black dark:border-white dark:border-opacity-100 text-black dark:text-white" : ""}`}>Posts</div>
                <div onClick={() => handleViewTypeChange("notices")} className={`w-1/2 border-b-[1px] dark:border-[#777777] dark:border-opacity-30 pb-3 cursor-pointer ${viewType === "notices" ? "border-black dark:border-white dark:border-opacity-100 text-black dark:text-white" : ""}`}>Notices</div>
            </div>

            {
                loading ? (
                    <div className='flex justify-center mt-10'>
                        <img src={loadingGIF} alt="" className='w-10 h-10' />
                    </div>
                ) :
                    (
                        <div className="mt-2 mb-20">
                            {
                                timelineData &&
                                    viewType === "posts" ? (
                                    <div>
                                        {
                                            timelineData.map(timeline => (
                                                <div className='w-full mx-auto my-2 border rounded-md dark:border-opacity-20 border-gray-200 text-[15px] max-sm:text-xs max-lg:text-sm'>

                                                    <div className='flex rounded-md flex-col'>

                                                        <div className='flex flex-col justify-center -mt-1 gap-y-1 dark:text-white p-3'>

                                                            <div className="flex justify-between items-center">

                                                                {/* User Info */}
                                                                <div className="flex gap-x-1 items-center">
                                                                    <div>
                                                                        <Link to={`/${timeline.userId.username}`}>
                                                                            <img src={`${URL}/public/images/${timeline.userId.profileUrl}`} alt="img" className='min-w-[36px] h-9 w-9 object-cover rounded-full' />
                                                                        </Link>
                                                                    </div>

                                                                    <div className='flex flex-col gap-x-1 font-semibold max-sm:flex-col'>
                                                                        <div className="hover:underline underline-offset-2 cursor-pointer">
                                                                            <Link to={`/${timeline.userId.username}`}>
                                                                                {timeline.userId.firstName + " " + timeline.userId.lastName}
                                                                            </Link>
                                                                        </div>
                                                                        <div className="text-sm max-sm:text-xs">
                                                                            <Link to={`/${timeline.userId.username}`}>@{timeline.userId.username}</Link>
                                                                        </div>
                                                                    </div>

                                                                </div>


                                                                <div className='text-[#999999] dark:text-[#777777] cursor-pointer'>
                                                                    <div title={new Date(timeline.createdAt).toLocaleString()}>
                                                                        {
                                                                            calculateTimeAgo(timeline.createdAt)
                                                                        }
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            {timeline.content &&
                                                                <div className="my-2">{timeline.content}</div>
                                                            }

                                                            <Link to={`/post/${timeline._id}`} className="mt-1">
                                                                <img src={`${URL}/public/images/${timeline.image}`} className="rounded-md object-cover w-full" alt="img" />
                                                            </Link>

                                                            <div className='flex gap-1 text-[#999999] dark:text-[#777777] mt-1'>
                                                                <span className="hover:underline underline-offset-2 cursor-pointer">{timeline.comments.length} comments</span>
                                                                <span>&nbsp;·&nbsp;</span>
                                                                <span className="hover:underline underline-offset-2 cursor-pointer">{timeline.likes.length} likes</span>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div >
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <div>
                                        {
                                            timelineData.map(timeline => (
                                                <div className="flex flex-wrap my-2 dark:text-white">
                                                    <Link to={`/lost-pet-notice/${timeline._id}`} key={timeline._id} className="w-full border dark:border-[#777777] dark:border-opacity-30 rounded-md flex flex-col gap-y-2 relative p-4">
                                                        <div className="flex gap-x-1 items-center border-b pb-2 dark:border-[#777777] dark:border-opacity-30">
                                                            <div>
                                                                <Link to={`/${timeline.userId.username}`}>
                                                                    <img src={`${URL}/public/images/${timeline.userId.profileUrl}`} alt="img" className='min-w-[36px] h-9 w-9 object-cover rounded-full' />
                                                                </Link>
                                                            </div>

                                                            <div className='flex flex-col gap-x-1 font-semibold max-sm:flex-col'>
                                                                <div className="hover:underline underline-offset-2 cursor-pointer">
                                                                    <Link to={`/${timeline.userId.username}`}>
                                                                        {timeline.userId.firstName + " " + timeline.userId.lastName}
                                                                    </Link>
                                                                </div>
                                                                <div className="text-sm max-sm:text-xs">
                                                                    <Link to={`/${timeline.userId.username}`}>@{timeline.userId.username}</Link>
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="flex gap-x-3">
                                                            <div className='flex flex-col gap-y-1 items-center'>
                                                                <div>
                                                                    <img src={`${URL}/public/images/${timeline.image}`} alt={timeline.title} className="h-44 w-44 cursor-pointer group-hover:scale-95 duration-300 object-cover rounded-md max-sm:w-24 max-sm:h-24" />
                                                                </div>
                                                                <div className="mt-1">
                                                                    <span className="font-semibold">{timeline.name}</span> - <span>{timeline.species} - {timeline.color}</span>
                                                                </div>
                                                            </div>

                                                            <div className='w-3/5 max-sm:w-[45%] p-2'>
                                                                {timeline.description}
                                                            </div>
                                                        </div>

                                                        {timeline.lostStatus === "Lost" ?
                                                            (<div className='absolute right-2 top-2 bg-red-700 px-3 py-1 rounded-xl text-white'>{timeline.lostStatus}</div>) :
                                                            (<div className='absolute right-2 top-2 bg-green-700 px-3 py-1 rounded-xl text-white'>{timeline.lostStatus}</div>)
                                                        }

                                                        <div className='absolute bottom-3 right-3 text-sm max-sm:text-xs'>
                                                            {new Date(timeline.createdAt).toLocaleString()}
                                                        </div>

                                                    </Link>
                                                </div >
                                            ))
                                        }
                                    </div>
                                )


                            }
                        </div>
                    )
            }

        </div>
    );
};

export default Home;
