import React from 'react'
import { Link, Outlet } from 'react-router-dom';
import useFetch from '../helpers/useFetch';

const MainLayout = () => {

    const { isLoading } = useFetch();

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>

                    <Link to="">Home</Link>
                    <Link to="/posts">Posts</Link>

                    <div>
                        <Outlet />
                    </div>
                </div>
            )}
        </div>
    )
}

export default MainLayout