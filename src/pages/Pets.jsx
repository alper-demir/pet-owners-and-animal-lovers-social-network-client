import { Link } from 'react-router-dom';
import { usePostsContext } from '../layouts/ProfileLayout';

const Pets = () => {

  const { pets } = usePostsContext();
  const URL = process.env.REACT_APP_BASE_URL;

  return (
    <div className="flex flex-wrap gap-1">
      {pets && pets.map((pet, index) => (
        <div key={index} className="w-[49.74%] max-sm:w-full max-lg:w-[49.65%]">
          <Link to={`/pet/${pet._id}`} className='relative group'>
            <img src={`${URL}/public/images/${pet.profileUrl}`} alt={pet.title} className="cursor-pointer group-hover:scale-95 duration-300 object-cover max-lg:min-h-[180.48px] group-hover:opacity-90 rounded-md h-72 w-full max-sm:h-full group-hover:shadow-md group-hover:shadow-indigo-200 dark:group-hover:shadow-[#777777]" />
            <span className='opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-2xl max-xl:text-xl max-md:text-lg'>{pet.name}</span>
          </Link>
        </div>
      ))
      }
    </div >
  )
}

export default Pets