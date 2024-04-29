import React from 'react'
import { NavLink } from 'react-router-dom'

const Links = ({ username }) => {
    return (
        <div className="flex items-center text-center h-12 text-[#999999] font-semibold w-full">
            <NavLink end to={`/${username}`} className="w-1/3 border-b-[1px] dark:border-[#777777] dark:border-opacity-30 pb-3">Posts</NavLink>
            <NavLink end to={`/${username}/pets`} className="w-1/3 border-b-[1px] dark:border-[#777777] dark:border-opacity-30 pb-3">Pets</NavLink>
            <NavLink to={`/${username}/notices`} className="w-1/3 border-b-[1px] pb-3 dark:border-[#777777] dark:border-opacity-30 max-[405px]:mb-[22px]">Notices</NavLink>
        </div>
    )
}

export default Links