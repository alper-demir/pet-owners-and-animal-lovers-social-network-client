import React, { createContext, useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Links from '../components/profile/Links'
import { useSelector } from 'react-redux'
import "../components/profile/css/profile.css"
import axios from 'axios'
import { MdCreateNewFolder, MdCreate } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import loading from "../asset/loading.gif"

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-hot-toast';

import CreatePost from '../components/profile/modals/CreatePost'
import CreatePetProfile from '../components/profile/modals/CreatePetProfile'
import CreateNotice from '../components/profile/modals/CreateNotice'
import Followers from '../components/profile/modals/Followers'
import Followings from '../components/profile/modals/Followings'

const ProfileContext = createContext();

const ProfileLayout = () => {
    const navigate = useNavigate();
    const { username } = useParams();
    const currentUser = useSelector(state => state.user.user.username);
    const { userId } = useSelector((state) => state.user.user);

    const [user, setUser] = useState({})
    const [posts, setPosts] = useState([])
    const [pets, setPets] = useState([])
    const [notices, setNotices] = useState([])
    const [followers, setFollowers] = useState([])
    const [followings, setFollowings] = useState([])
    const [ownProfile, setOwnProfile] = useState();
    const [requestStatus, setRequestStatus] = useState();
    const [isStatusLoading, setIsStatusLoading] = useState(true);
    const [isVisibilityLoading, setIsVisibilityLoading] = useState(true);
    const [profileVisibility, setProfileVisibility] = useState(true);
    const [status, setStatus] = useState({})
    const [profileId, setProfileId] = useState("");

    const token = localStorage.getItem("token");
    const URL = process.env.REACT_APP_BASE_URL;

    const getUserData = async () => {
        try {
            const userData = await axios.post(`${URL}/user-data/${username}`, {}, { headers: { Authorization: token } })
            if (userData) {
                setUser(userData.data.user)
                setFollowers(userData.data.user.followers)
                setFollowings(userData.data.user.followings)
                setProfileId(userData.data.user._id)
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

    const getNotices = async () => {
        try {
            const notice = await axios.post(`${URL}/notices/${username}`, {}, { headers: { Authorization: token } })
            if (notice) {
                setNotices(notice.data.notices)
                console.log(notice.data);
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
        getNotices();
        isUserInOwnProfile();
        checkRequestStatus();
        checkProfileVisibility();
    }, [username])

    const img = user.profileUrl

    const checkRequestStatus = async () => {
        setIsStatusLoading(true)
        try {
            const res = await axios.post(`${URL}/check-follow-request`, { senderId: userId, receiverUsername: username }, { headers: { Authorization: token } });
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
            const response = await axios.post(`${URL}/send-follow-request`, { senderId: userId, receiverId: user._id }, { headers: { Authorization: token } });
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

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
        setAboutValue(user.about)
        setGenderValue(user.gender)
        setPrivacyValue(user.privacy)
    }
    const handleClose = () => setOpen(false);

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };


    const handleProfilePictureUpdate = async () => {

        if (!selectedFile) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await axios.put(`${URL}/update-profile-image/${userId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: token
                }
            });
            if (response.data.status === "success") {
                toast.success(response.data.message)
                setSelectedFile(null);
                getUserData();
            }
            console.log(response.data);
        } catch (error) {
            console.error('Error updating profile picture:', error);
            alert('An error occurred while updating profile picture.');
        }
    };

    const [aboutValue, setAboutValue] = useState('');
    const [genderValue, setGenderValue] = useState('male');
    const [privacyValue, setPrivacyValue] = useState('private');

    const handleAboutChange = (e) => {
        setAboutValue(e.target.value);
    };

    const handleGenderChange = (e) => {
        setGenderValue(e.target.value);
    };

    const handlePrivacyChange = (e) => {
        setPrivacyValue(e.target.value);
    };

    const handleProfileUpdate = async () => {
        const updatedProfile = {
            about: aboutValue,
            gender: genderValue,
            privacy: privacyValue
        };

        try {
            const response = await axios.put(`${URL}/update-profile/${userId}`, updatedProfile, {
                headers: {
                    Authorization: token
                }
            });

            if (response.data.status === "success") {
                toast.success(response.data.message);
                getUserData();
            } else {
                toast.error("An error occurred while updating profile.");
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error("An error occurred while updating profile.");
        }
    };

    const [openCreatePostModal, setOpenCreatePostModal] = useState(false);
    const [openCreatePetProfileModal, setOpenCreatePetProfileModal] = useState(false);
    const [openCreateNoticeModal, setOpenCreateNoticeModal] = useState(false);
    const [openFollowingsModal, setOpenFollowingsModal] = useState(false);
    const [openFollowersModal, setOpenFollowersModal] = useState(false);

    return (
        <div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 max-xl:w-3/5 max-md:w-4/5 max-sm:w-[95%] max-sm:text-xs p-6 bg-white dark:bg-[#101010] dark:text-white rounded-md overflow-y-auto max-h-[85%]">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Edit Profile
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                        <div className='border-b-2 border-gray-200 dark:border-opacity-20'>
                            <div className='py-4'>
                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
                                <div className='flex gap-x-10 max-sm:gap-x-4 items-center max-sm:justify-between'>
                                    <div>
                                        <img src={`${URL}/public/images/${user.profileUrl}`} alt="profilePic" className='w-40 h-40 min-w-40 min-h-40 object-cover rounded-xl max-sm:w-28 max-sm:h-28 max-sm:min-w-28 max-sm:min-h-28' />
                                    </div>
                                    <div>
                                        <div>
                                            <input type="file" name="image" id="image" onChange={handleFileChange} accept="image/*" />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-end mt-2'>
                                    <button onClick={handleProfilePictureUpdate} type="submit" className="text-white bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800">Change Profile Picture</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="bg-white dark:bg-transparent my-3">
                                <label htmlFor="about" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">About</label>
                                <textarea id="about" rows="3" className="px-4 py-2 w-full text-sm text-gray-900 bg-white border border-gray-200 dark:border-opacity-20 rounded-lg dark:bg-transparent dark:text-white dark:placeholder-gray-400 outline-none resize-none" placeholder="About.." value={aboutValue} onChange={handleAboutChange} required />
                            </div>
                            <div className="bg-white dark:bg-transparent my-3">
                                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Gender</label>
                                <select id="gender" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#101010] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={genderValue} onChange={handleGenderChange}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div className="bg-white dark:bg-transparent my-3">
                                <label htmlFor="privacy" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" title='Change account visibility'>Privacy</label>
                                <select id="privacy" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#101010] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={privacyValue} onChange={handlePrivacyChange}>
                                    <option value="private">Private</option>
                                    <option value="public">Public</option>
                                </select>
                            </div>
                            <div className="flex justify-end bg-white dark:bg-transparent my-3">
                                <button onClick={handleProfileUpdate} type="submit" className="text-white bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:focus:ring-blue-800">Send</button>
                            </div>

                            <div className='flex gap-x-2 items-center'>
                                <div>
                                    <label htmlFor="volunteer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Volunteer Status</label>
                                </div>
                                <div>
                                    <input id="volunteer" type="checkbox" checked={user.isVolunteer} className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-500" />
                                </div>
                            </div>
                        </div>
                    </Typography>
                </Box>


            </Modal>

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

            <div className="flex justify-between my-2 max-sm:px-2 dark:text-white text-xs">
                <div className="flex gap-x-2 items-center">
                    <div className="hover:underline cursor-pointer">{posts.length} posts</div>
                    <div>-</div>
                    <div onClick={() => setOpenFollowersModal(true)} className="hover:underline cursor-pointer">{followers ? (<>{followers.length}</>) : (<>0</>)} followers</div>
                    <div>-</div>
                    <div onClick={() => setOpenFollowingsModal(true)} className="hover:underline cursor-pointer">{followings ? (<>{followings.length}</>) : (<>0</>)} followings</div>
                    <div>-</div>
                    <div className="hover:underline cursor-pointer">owns {pets.length} pet </div>
                </div>
            </div>

            {
                openFollowersModal &&
                <Followers openFollowersModal={openFollowersModal} setOpenFollowersModal={setOpenFollowersModal} profileId={profileId} />
            }
            {
                openFollowingsModal &&
                <Followings openFollowingsModal={openFollowingsModal} setOpenFollowingsModal={setOpenFollowingsModal} profileId={profileId} />
            }

            <div>
                {ownProfile &&
                    <div>
                        <div className='border text-center my-2 rounded-xl py-2 font-semibold cursor-pointer dark:text-white dark:border-[#777777]' onClick={handleOpen}>
                            <button>Edit Profile</button>
                        </div>
                        <div className='flex justify-around text-3xl max-sm:text-2xl items-center mt-5 text-gray-500 dark:text-white'>
                            <div className='cursor-pointer hover:scale-125 duration-200' onClick={() => setOpenCreatePostModal(true)}><IoIosCreate /></div>
                            <div className='cursor-pointer hover:scale-125 duration-200' onClick={() => setOpenCreatePetProfileModal(true)}><MdCreateNewFolder /></div>
                            <div className='cursor-pointer hover:scale-125 duration-200' onClick={() => setOpenCreateNoticeModal(true)}><MdCreate /></div>
                        </div>
                    </div>
                }

                {
                    openCreatePostModal &&
                    <CreatePost openCreatePostModal={openCreatePostModal} setOpenCreatePostModal={setOpenCreatePostModal} getPosts={getPosts} />
                }

                {
                    openCreatePetProfileModal &&
                    <CreatePetProfile openCreatePetProfileModal={openCreatePetProfileModal} setOpenCreatePetProfileModal={setOpenCreatePetProfileModal} getPetProfiles={getPetProfiles} />
                }

                {
                    openCreateNoticeModal &&
                    <CreateNotice openCreateNoticeModal={openCreateNoticeModal} setOpenCreateNoticeModal={setOpenCreateNoticeModal} getNotices={getNotices} />
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

                                <ProfileContext.Provider value={{ posts, pets, notices }}>
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

export { usePostsContext };

export default ProfileLayout;