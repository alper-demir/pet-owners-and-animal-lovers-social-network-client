import { Link } from 'react-router-dom';
import { usePostsContext } from '../layouts/ProfileLayout';

const Pets = () => {

  const { pets } = usePostsContext();
  const URL = "http://localhost:3001"

  return (
    <div className="flex flex-wrap gap-1">
      {pets && pets.map((pet, index) => (
        <div key={index} className="w-full">
          <Link to={`/pet/${pet._id}`} className='relative group'>
            <img src={`${URL}/public/images/${pet.profileUrl}`} alt={pet.title} className="cursor-pointer group-hover:scale-95 duration-300 object-cover max-lg:min-h-[180.48px] group-hover:opacity-90" />
            <span className='opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold text-2xl max-xl:text-xl max-md:text-lg'>{pet.name}</span>
          </Link>
        </div>
      ))
      }
    </div >
  )
}

export default Pets