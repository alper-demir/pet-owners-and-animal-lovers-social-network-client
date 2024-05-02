import axios from 'axios';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdNotificationsActive, MdOutlinePostAdd } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";


const Navbar = () => {

    const [theme, setTheme] = useState("");

    const { username } = useSelector(state => state.user.user)

    const dropDownSettings = () => {
        const settings = document.getElementById("settings");
        if (settings.classList.contains("hidden")) {
            settings.classList.remove("hidden")
        }
        else {
            settings.classList.add("hidden")
        }
    }

    const changeTheme = () => {
        const html = document.querySelector("html");
        if (theme === "light") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
            html.classList.add("dark");
            html.setAttribute("dark", "");
        }
        else {
            setTheme("light");
            localStorage.setItem("theme", "light");
            html.classList.remove("dark");
            html.removeAttribute("dark")
        }
    }

    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            setTheme(theme);
            document.querySelector("html").classList.add("dark");
            document.querySelector("html").setAttribute("dark", "")
        }
        else {
            setTheme("light");
        }
    }, [])

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token")
        navigate("/login")
        toast.success("Logged out")
    }

    const URL = "http://localhost:3001"
    const receiverId = useSelector(state => state.user.user.userId);

    const [numberOfRequest, setNumberOfRequest] = useState([]);

    useEffect(() => {
        getRequests();
    }, [window.location.pathname])


    const getRequests = async () => {
        try {
            const requests = await axios.get(`${URL}/follow-requests/${receiverId}`);
            if (requests) {
                setNumberOfRequest(requests.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='h-[74px] w-[81%] mx-auto max-[1247px]:w-full text-[#BBBBBB] dark:text-[#777777]'>
            <header className='flex justify-around items-center h-full max-[1247px]:justify-between max-[1247px]:mx-5 max-sm:justify-center'>
                <div className='max-w-[32px] min-w-[32px] cursor-pointer'>
                    <Link to="/">
                        <svg aria-label="Threads" className='hover:scale-105 duration-200 dark:fill-white' fill="rgb(0, 0, 0)" height="100%" role="img" viewBox="0 0 192 192" width="100%" xmlns="http://www.w3.org/2000/svg"><path class="x19hqcy" d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"></path></svg>
                    </Link>
                </div>
                <nav className='max-sm:hidden'>
                    <ul className='flex'>
                        <NavLink to="/" className='hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] py-[20px] px-[32px] rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer active:scale-90'>
                            <FaHome className='text-3xl' title='Home' />
                        </NavLink>
                        <NavLink to="/search" className='hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] py-[20px] px-[32px] rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer active:scale-90'>
                            <IoSearchOutline className='text-3xl' title='Search' />
                        </NavLink>
                        <NavLink to="/lost-pets" className='hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] py-[20px] px-[32px] rounded-md my-[4px] mx-[2px] cursor-pointer active:scale-90'>
                            <MdOutlinePostAdd className='text-3xl' title='Notices' />
                        </NavLink>
                        <NavLink to="/notifications" className='hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] py-[20px] px-[32px] rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer active:scale-90 relative'>
                            <MdNotificationsActive className='text-3xl' title='Notifications' />
                            {
                                numberOfRequest.length > 0 &&
                                <div className='absolute right-5 top-4 bg-red-500 rounded-full px-2 py-[2.75px] text-black dark:text-white text-xs'>
                                    {numberOfRequest.length}
                                </div>
                            }
                        </NavLink>
                        <NavLink to={`/${username}`} className='hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] py-[20px] px-[32px] rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer active:scale-90'>
                            <CgProfile className='text-3xl' title='Profile' />
                        </NavLink>

                    </ul>
                </nav>

                {/* settings-dropdown */}
                <div className="group cursor-pointer max-sm:absolute max-sm:top-[25px] max-sm:right-5 relative z-10 text-black">
                    <svg onClick={dropDownSettings} aria-label="Daha Fazla" class="text-[#b8b8b8] dark:text-[#4d4d4d] group-hover:text-black dark:group-hover:text-white transition-colors duration-300" fill="rgb(184, 184, 184)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Daha Fazla</title><rect fill="currentColor" height="2.5" rx="1.25" width="21" x="3" y="7"></rect><rect fill="currentColor" height="2.5" rx="1.25" width="14" x="10" y="15"></rect></svg>
                    <div id='settings' className='absolute top-7 -left-[8.5rem] border-[1px] border-gray-100 rounded-xl w-[174px] font-semibold text-[15px] hidden bg-white dark:bg-[#181818] dark:text-white dark:border-[#777777] dark:border-opacity-20'>
                        <ul className='flex flex-col'>
                            <li className='p-3 border-b-[1px] dark:border-[#777777] dark:border-opacity-40' onClick={changeTheme}>Görünümü değiştir</li>
                            <li className='p-3 border-b-[1px] dark:border-[#777777] dark:border-opacity-40'>Hakkında</li>
                            <li className='p-3 border-b-[1px] dark:border-[#777777] dark:border-opacity-40'>Sorun bildir</li>
                            <li className='p-3' onClick={logout} >Çıkış yap</li>
                        </ul>
                    </div>
                </div>

                {/* bottonav */}
                <nav className='hidden max-sm:block fixed bottom-0 left-0 w-full bg-white dark:bg-[#101010] z-10 opacity-95'>
                    <ul className='flex justify-around'>
                        <NavLink to="/" className='hover:bg-[#F5F5F5] py-5 px-8 rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer max-sm:px-6 active:scale-95 dark:hover:bg-[#1C1C1C]'>
                            <FaHome className='text-3xl' title='Home' />
                        </NavLink>
                        <NavLink to="/search" className='hover:bg-[#F5F5F5] py-5 px-8 rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer max-sm:px-6 active:scale-95 dark:hover:bg-[#1C1C1C]'>
                            <IoSearchOutline className='text-3xl' title='Search' />
                        </NavLink>
                        <NavLink to="/lost-pets" className='hover:bg-[#F5F5F5] py-5 px-8 rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer max-sm:px-6 active:scale-95 dark:hover:bg-[#1C1C1C]'>
                            <MdOutlinePostAdd className='text-3xl' title='Notices' />
                        </NavLink>
                        <NavLink to="/notifications" className='hover:bg-[#F5F5F5] py-5 px-8 rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer max-sm:px-6 active:scale-95 dark:hover:bg-[#1C1C1C] relative'>
                            <MdNotificationsActive className='text-3xl' title='Notifications' />
                            {
                                numberOfRequest.length > 0 &&
                                <div className='absolute right-3 top-4 bg-red-500 rounded-full px-2 py-[2.75px] dark:text-white text-xs'>
                                    {numberOfRequest.length}
                                </div>
                            }
                        </NavLink>
                        <NavLink to={`/${username}`} className='hover:bg-[#F5F5F5] py-5 px-8 rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer max-sm:px-6 active:scale-95 dark:hover:bg-[#1C1C1C]'>
                            <CgProfile className='text-3xl' title='Profile' />
                        </NavLink>

                    </ul>
                </nav>

            </header>

        </div>
    )
}

export default Navbar