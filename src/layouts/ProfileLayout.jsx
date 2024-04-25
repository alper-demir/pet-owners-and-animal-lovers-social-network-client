import React, { createContext, useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Links from '../components/profile/Links'
import { useSelector } from 'react-redux'
import "../components/profile/css/profile.css"
import axios from 'axios'
import { MdCreateNewFolder } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import loading from "../asset/loading.gif"

const ProfileContext = createContext();

const ProfileLayout = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const currentUser = useSelector(state => state.user.user.username);
    const { userId } = useSelector((state) => state.user.user);

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [pets, setPets] = useState([])
    const [ownProfile, setOwnProfile] = useState();
    const [requestStatus, setRequestStatus] = useState();
    const [isStatusLoading, setIsStatusLoading] = useState(true);
    const [isVisibilityLoading, setIsVisibilityLoading] = useState(true);
    const [profileVisibility, setProfileVisibility] = useState(true);
    const [status, setStatus] = useState({})

    const token = localStorage.getItem("token");
    const URL = "http://localhost:3001"

    const getUserData = async () => {
        try {
            const userData = await axios.post(`${URL}/user-data/${username}`, {}, { headers: { Authorization: token } })
            if (userData) {
                setUser(userData.data.user)
                console.log(userData.data.user);

            }
        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }

    const getPosts = async () => {
        try {
            const posts = await axios.post(`${URL}/posts/${username}`, {}, { headers: { Authorization: token } })
            if (posts) {
                setPosts(posts.data.posts)
                console.log(posts.data.posts);
            }
        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }

    const getPetProfiles = async () => {
        try {
            const pets = await axios.post(`${URL}/pets/${username}`, {}, { headers: { Authorization: token } })
            if (pets) {
                setPets(pets.data.pets)
                console.log(pets.data.pets);
            }
        } catch (error) {
            console.log(error);
            navigate("/")
        }
    }

    const isUserInOwnProfile = () => {
        username === currentUser ? setOwnProfile(true) : setOwnProfile(false)
    }

    useEffect(() => {
        getUserData();
        getPosts();
        getPetProfiles();
        isUserInOwnProfile();
        checkRequestStatus();
        checkProfileVisibility();
    }, [username])

    const img = user.profileUrl

    const checkRequestStatus = async () => {
        setIsStatusLoading(true)
        try {
            const res = await axios.post(`${URL}/check-friend-request`, { senderId: userId, receiverUsername: username }, { headers: { Authorization: token } });
            if (res) {
                console.log(res.data);
                setRequestStatus(res.data.status)
                setIsStatusLoading(false)
                checkProfileVisibility();
            }
        } catch (error) {

        }
    }

    const sendRequest = async () => {
        console.log(user._id);
        setIsStatusLoading(true)
        try {
            const response = await axios.post(`${URL}/send-friend-request`, { senderId: userId, receiverId: user._id }, { headers: { Authorization: token } });
            console.log(response);
            checkRequestStatus();
            setIsStatusLoading(false)
        } catch (error) {

        }
    }

    const checkProfileVisibility = async () => {
        setIsVisibilityLoading(true)
        if (username !== currentUser) {
            try {
                const response = await axios.post(`${URL}/check-profile-visibility`, { currentUserId: userId, username }, { headers: { Authorization: token } });
                if (response) {
                    console.log(response.data);
                    setProfileVisibility(response.data.visibility);
                    setStatus(response.data)
                    setIsVisibilityLoading(false)
                }
            } catch (error) {
                console.error("Error checking profile visibility:", error);
            }
        } else {
            // Kullanıcı kendi profilinde, herhangi bir kontrol yapma
            setProfileVisibility(true)
            setIsVisibilityLoading(false)
        }
    };



    return (
        <div>

            <div className="flex flex-col w-full">
                <div className='flex justify-between items-center w-full mt-2 max-sm:px-2'>
                    <div className="flex flex-col dark:text-white w-4/5">
                        <div className="text-2xl font-bold max-sm:text-lg">{user.firstName + " " + user.lastName}</div>
                        <div className="flex gap-x-1 items-center my-1">
                            <div>@{user.username}</div>
                            <div><button className="bg-[#F5F5F5] text-[#999999] text-xs text-[11px] py-1 px-2 rounded-2xl dark:bg-[#1E1E1E] dark:text-[#777777]">beykoz.net</button></div>
                        </div>
                        {user.about && <div className='my-1'>
                            {user.about}
                        </div>}
                    </div>
                    <div className='w-1/5 flex justify-end'><img src={`${URL}/public/images/${img}`} alt="" className="w-[84px] h-[84px] rounded-full object-cover max-sm:w-16 max-sm:h-16 active:scale-90 transition-transform duration-200 cursor-pointer" /></div>
                </div>
            </div>

            <div className="flex justify-between my-2 max-sm:px-2">
                <div className="flex gap-x-2 items-center text-[#A7A7A7] dark:text-[#777777]">
                    <div className="hover:underline cursor-pointer">{posts.length} posts</div>
                    <div>-</div>
                    <div className="hover:underline cursor-pointer">152 takipçi</div>
                    <div>-</div>
                    <div className="hover:underline cursor-pointer">owns {pets.length} pet </div>
                </div>
            </div>

            <div>
                {ownProfile &&
                    <div>
                        <div className='border text-center my-2 rounded-xl py-2 font-semibold cursor-pointer dark:text-white dark:border-[#777777]' onClick={() => console.log("profil düzenleye basıldı")}>
                            <button>Profili Düzenle</button>
                        </div>
                        <div className='flex justify-evenly text-3xl max-sm:text-2xl items-center mt-5 text-gray-500 dark:text-white'>
                            <div className='cursor-pointer hover:scale-125 duration-200'><IoIosCreate /></div>
                            <div className='cursor-pointer hover:scale-125 duration-200'><MdCreateNewFolder /></div>
                        </div>
                    </div>
                }

                {
                    !ownProfile &&
                    <div className='border text-center my-2 rounded-xl py-2 font-semibold cursor-pointer dark:text-white dark:border-[#777777] relative min-h-9'
                        onClick={sendRequest}>
                        {
                            isStatusLoading ? (
                                <img src={loading} alt="" className="w-6 h-6 top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 absolute" />
                            ) : (
                                <button>
                                    {requestStatus === "pending" ? "Pending" : (requestStatus === "accepted" ? "Unfollow" : (!status.isPrivate ? "Follow" : "Send follow request"))}
                                </button>
                            )
                        }
                    </div>
                }

            </div>

            {
                !isVisibilityLoading ? (
                    profileVisibility ?
                        (
                            <>
                                <Links username={username} />

                                <ProfileContext.Provider value={{ posts, pets }}>
                                    <div className='mb-20 max-sm:mb-28'>
                                        <Outlet />
                                    </div>
                                </ProfileContext.Provider>
                            </>
                        ) :
                        (
                            <p className='dark:text-white mt-2'>You must follow this user to access the profile!</p>
                        )
                ) :
                    (
                        <div className='flex justify-center items-center mt-20'>
                            <img src={loading} alt="" className="w-6 h-6" />
                        </div>
                    )
            }

        </div>
    )
}

const usePostsContext = () => useContext(ProfileContext);

export { usePostsContext }; // Diğer bileşenlerde context'i kullanabilmek için dışa aktarın

export default ProfileLayout;