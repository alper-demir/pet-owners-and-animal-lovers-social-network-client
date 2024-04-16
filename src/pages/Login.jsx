import { useEffect, useRef, useState } from "react"
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import useFetch from "../helpers/useFetch";

const Login = () => {

    const navigate = useNavigate();
    const ref = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonEnabled, setButtonEnabled] = useState(false);
    
    const URL = "http://localhost:3001";
    const { isLoading } = useFetch();

    useEffect(() => {
        handleButton();
    }, [email, password]);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleButton = () => {
        setButtonEnabled(email.length > 0 && password.length > 0);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URL}/login`, { email, password });
            const { token } = response.data;
            localStorage.setItem("token", token);
            toast.success("Başarıyla giriş yaptınız!", { duration: 3000 });

            navigate("/");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Eğer oturum geçersizse veya süresi dolmuşsa login sayfasına yönlendir
                navigate("/login");
            } else {
                console.error("Error:", error.message);
            }
        }
    };

    return (
        <div>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    <div className="fixed top-1/4 w-full">
                        <form className="max-w-md mx-auto border p-8 text-sm text-gray-500" onSubmit={handleLogin}>
                            <div className="flex gap-x-2 text-black">
                                <Link to="/">Home</Link>
                                <Link to="/posts">Posts</Link>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleEmail} />
                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handlePassword} />
                                <label htmlFor="floating_password" className="peer-focus:font-medium absolute dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                            </div>

                            <div className="flex justify-end my-2">
                                <button disabled={!buttonEnabled} type="submit" ref={ref} className="px-2 py-1 bg-gray-400 text-white rounded-md text-base enabled:hover:bg-gray-500 transition-colors duration-300">Enter</button>
                            </div>
                            <div className="mt-2">
                                <span className="flex justify-end hover:underline cursor-pointer underline-offset-2">Reset password</span>
                            </div>
                            {
                                email + " " + password
                            }
                        </form>
                    </div>
                </>
            )}
        </div>
    )
}

export default Login
