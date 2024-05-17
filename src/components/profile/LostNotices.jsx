import { Link } from 'react-router-dom';
import { usePostsContext } from '../../layouts/ProfileLayout';

const LostNotices = () => {

  const { notices } = usePostsContext();
  const URL = process.env.REACT_APP_BASE_URL;

  return (
    <div className="flex flex-wrap gap-2 dark:text-white">
      {notices && notices.map((notice, index) => (
        <Link to={`/lost-pet-notice/${notice._id}`} key={index} className="w-full border dark:border-[#777777] dark:border-opacity-30 rounded-md flex gap-x-3 relative hover:scale-95 duration-300 p-4">

          <div className='flex flex-col gap-y-1 items-center'>
            <div>
              <img src={`${URL}/public/images/${notice.image}`} alt={notice.title} className="h-44 w-44 cursor-pointer group-hover:scale-95 duration-300 object-cover rounded-md max-sm:w-24 max-sm:h-24" />
            </div>
            <div>
              <span className="font-semibold">{notice.name}</span> - <span>{notice.species} - {notice.color}</span>
            </div>
          </div>

          <div className='w-3/5 max-sm:w-[45%] p-2'>
            {notice.description}
          </div>

          {notice.lostStatus === "Lost" ?
            (<div className='absolute right-2 top-2 bg-red-700 px-3 py-1 rounded-xl text-white'>{notice.lostStatus}</div>) :
            (<div className='absolute right-2 top-2 bg-green-700 px-3 py-1 rounded-xl text-white'>{notice.lostStatus}</div>)
          }

          <div className='absolute bottom-3 right-3 text-sm max-sm:text-xs'>
            {new Date(notice.createdAt).toLocaleString()}
          </div>

        </Link>
      ))
      }
    </div >
  )
}

export default LostNotices