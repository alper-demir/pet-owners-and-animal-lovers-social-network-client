import { Link } from "react-router-dom";
import { usePostsContext } from '../layouts/ProfileLayout';

const Posts = () => {

  const { posts } = usePostsContext();
  const URL = "http://localhost:3001"

  return (
    <div className="flex flex-wrap gap-[1px]">
      {posts && posts.map((post, index) => (
        <div key={index} className="w-[33.2%] max-sm:w-full">
          <Link to={`/post/${post._id}`}>
            <img src={`${URL}/public/images/${post.image}`} alt={post.title} className="cursor-pointer hover:scale-95 duration-300 object-cover" />
          </Link>
        </div>
      ))
      }
    </div >
  );

}

export default Posts;