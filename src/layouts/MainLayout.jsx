import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import useFetch from '../helpers/useFetch';
import Navbar from '../components/navbar/Navbar';
import loading from "../asset/loading.gif"
const MainLayout = () => {

    const { isLoading } = useFetch();

    return (
        <div className='dark:bg-[#101010] transition-colors duration-200 min-h-screen'>
            {isLoading ? (
                <div className="flex justify-center items-center mt-20"> <img src={loading} alt="" className="w-16 h-16" /> </div>
            ) : (

                <div>

                    <Navbar />

                    <div className='max-w-3xl mx-auto flex justify-center mt-2 relative text-sm flex-col max-sm:m-2 max-sm:text-xs'>
                        <Outlet />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MainLayout