import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const URL = "http://localhost:3001";
  const userid = useSelector(state => state.user.user.userId);
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div>
      <>
        username: {user.username}
        name: {user.firstName}
        id: {userid}
        <img src={`${URL}/public/images/${user.profileUrl}`} alt="" className="h-72 w-72 object-cover" />asdasd
        <button onClick={logout}>logout</button>
      </>
    </div>
  );
};

export default App;
