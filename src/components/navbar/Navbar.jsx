import axios from 'axios';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdNotificationsActive, MdOutlinePostAdd, MdOutlinePets } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import SettingsDropDown from './SettingsDropDown';

const Navbar = () => {
    const { username } = useSelector(state => state.user.user)

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
                <div className='max-w-[32px] min-w-[32px] cursor-pointer dark:text-white'>
                    <Link to="/">
                        <MdOutlinePets className='text-3xl' title='POALSNet' />
                    </Link>
                </div>
                <nav className='max-sm:hidden'>
                    <ul className='flex'>
                        <NavLink to="/" className='hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] py-[20px] px-[32px] rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer active:scale-90'>
                            <FaHome className='text-3xl' title='Home' />
                        </NavLink>
                        <NavLink to="/search" className='hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] py-[20px] px-[32px] rounded-md my-[4px] mx-[2px] transition-all duration-500 cursor-pointer active:scale-90 flex gap-x-1 items-center'>
                            <IoSearchOutline className="text-3xl" />
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
                <SettingsDropDown />

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