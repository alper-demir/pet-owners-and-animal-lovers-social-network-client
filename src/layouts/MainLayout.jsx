import React from 'react'
import { Outlet } from 'react-router-dom';
import useFetch from '../helpers/useFetch';
import Navbar from '../components/navbar/Navbar';
import loading from "../asset/loading.gif"
import Footer from '../components/footer/Footer';
import { Helmet } from 'react-helmet';
const MainLayout = () => {

    const { isLoading } = useFetch();

    return (
        <div className='dark:bg-[#101010] transition-colors duration-200 min-h-screen'>
            <Helmet>
                <title>POALSNet</title>
                <meta name="description" content="POALSNet" />
            </Helmet>
            {isLoading ? (
                <div className="flex justify-center items-center mt-20"> <img src={loading} alt="" className="w-16 h-16" /> </div>
            ) : (

                <div className='flex flex-col min-h-screen'>

                    <div className='flex-1'>
                        <Navbar />

                        <div className='max-w-3xl mx-auto flex justify-center mt-2 relative text-sm flex-col max-sm:m-2 max-sm:text-xs'>
                            <Outlet />
                        </div>
                    </div>

                    <Footer />

                </div>
            )}
        </div>
    )
}

export default MainLayout