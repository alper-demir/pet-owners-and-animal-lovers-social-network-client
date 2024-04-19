import React, { createContext, useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import Links from '../components/profile/Links'
import { useSelector } from 'react-redux'
import "../components/profile/css/profile.css"
import axios from 'axios'
import toast from 'react-hot-toast'

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
    const [petCount, setPetCount] = useState(0);
    const [postCount, setPostCount] = useState(0);

    const token = localStorage.getItem("token");
    const URL = "http://localhost:3001"

    const getUserData = async () => {
        try {
            const userData = await axios.post(`${URL}/user-data/${username}`, {}, { headers: { Authorization: token } })
            if (userData) {
                setUser(userData.data.user)
                setPetCount(userData.data.user.pets.length)
                setPostCount(userData.data.user.posts.length)
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
    }, [username])

    const img = useSelector((state) => state.user.user.profileUrl);

    return (
        <div>
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
                        <div className='border text-center my-2 rounded-xl py-2 font-semibold cursor-pointer' onClick={() => console.log("profil düzenleye basıldı")}>
                            <button>Profili Düzenle</button>
                        </div>
                    }
                </div>

                <Links username={username} />

                <ProfileContext.Provider value={{ posts, pets }}>
                    <div className='mb-20 max-sm:mb-28'>
                        <Outlet />
                    </div>
                </ProfileContext.Provider>

            </div>


        </div>
    )
}

const usePostsContext = () => useContext(ProfileContext);

export { usePostsContext }; // Diğer bileşenlerde context'i kullanabilmek için dışa aktarın

export default ProfileLayout;