import { useSelector } from "react-redux";

const Posts = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <>
        Posts {JSON.stringify(user.userId)}
      </>
    </div>
  )
}

export default Posts;
