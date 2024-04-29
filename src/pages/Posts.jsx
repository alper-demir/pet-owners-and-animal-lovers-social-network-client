import { Link } from "react-router-dom";
import { usePostsContext } from '../layouts/ProfileLayout';
import { FaRegComment } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";

const Posts = () => {

  const { posts } = usePostsContext();
  const URL = "http://localhost:3001"

  return (
    <div className="flex flex-wrap gap-1">
      {posts && posts.map((post, index) => (
        <div key={index} className="w-[32.9%] max-md:w-full">
          <Link to={`/post/${post._id}`} className="relative group">
            <img src={`${URL}/public/images/${post.image}`} alt={post.title} className="cursor-pointer group-hover:scale-95 duration-300 object-cover rounded-md group-hover:shadow-md group-hover:shadow-indigo-200 dark:group-hover:shadow-[#777777] group-hover:opacity-90 h-52 w-full max-md:h-full" />
            <div className="opacity-0 group-hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white font-semibold">
              <div className="flex justify-center items-center flex-col gap-x-2 text-lg">
                <div className="flex justify-center items-center gap-x-2">
                  <div>{post.likes.length}</div>
                  <div><BiSolidLike /></div>
                </div>
                <div className="flex justify-center items-center gap-x-2">
                  <div>{post.comments.length}</div>
                  <div><FaRegComment /></div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))
      }
    </div >
  );

}

export default Posts;