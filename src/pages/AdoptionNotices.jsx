import { Link } from 'react-router-dom';
import { usePostsContext } from '../layouts/ProfileLayout';

const AdoptionNotices = () => {

    const { adoptionNotices } = usePostsContext();
    const URL = process.env.REACT_APP_BASE_URL;

    return (
        <div className="flex flex-wrap gap-2 dark:text-white">
            {adoptionNotices && adoptionNotices.map((adoptionNotice, index) => (
                <Link to={`/adoption-notice/${adoptionNotice._id}`} key={index} className="w-full border dark:border-[#777777] dark:border-opacity-30 rounded-md flex gap-x-3 relative hover:scale-95 duration-300 p-4">

                    <div className='flex flex-col gap-y-1 items-center'>
                        <div>
                            <img src={`${URL}/public/images/${adoptionNotice.image}`} alt={adoptionNotice.title} className="h-44 w-44 cursor-pointer group-hover:scale-95 duration-300 object-cover rounded-md max-sm:w-24 max-sm:h-24" />
                        </div>
                        <div>
                            <span className="font-semibold">{adoptionNotice.name}</span> - <span>{adoptionNotice.species} - {adoptionNotice.color}</span>
                        </div>
                    </div>

                    <div className='w-3/5 max-sm:w-[45%] p-2'>
                        {adoptionNotice.description}
                    </div>

                    {
                        adoptionNotice.adoptionStatus === "Adopting" ?
                            (<div className='absolute right-2 top-2 bg-red-700 px-3 py-1 rounded-xl text-white'>{adoptionNotice.adoptionStatus}</div>) :
                            (<div className='absolute right-2 top-2 bg-green-700 px-3 py-1 rounded-xl text-white'>{adoptionNotice.adoptionStatus}</div>)
                    }

                    <div className='absolute bottom-3 right-3 text-sm max-sm:text-xs'>
                        {new Date(adoptionNotice.createdAt).toLocaleString()}
                    </div>

                </Link>
            ))
            }
        </div >
    )
}

export default AdoptionNotices