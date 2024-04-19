import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import useFetch from '../helpers/useFetch';
import Navbar from '../components/navbar/Navbar';

const MainLayout = () => {

    const { isLoading } = useFetch();

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (

                <div>

                    <Navbar />

                    <div className='max-w-2xl mx-auto flex justify-center mt-2 relative text-sm flex-col max-sm:m-2 max-sm:text-xs'>
                        <Outlet/>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MainLayout