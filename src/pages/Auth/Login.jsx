import { useEffect, useState } from "react"
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import useFetch from "../../helpers/useFetch";
import loading from "../../asset/loading.gif"
import { MdOutlinePets, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import "./auth.css"

const Login = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const URL = process.env.REACT_APP_BASE_URL;
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
            if (response.data.login) {
                const { token } = response.data;
                localStorage.setItem("token", token);
                toast.success(response.data.message);
                navigate("/");
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div className="h-screen bg-img">
            {isLoading ? (
                <div className="flex justify-center items-center mt-20"> <img src={loading} alt="" className="w-16 h-16" /> </div>
            ) : (
                <div>
                    <div className="flex justify-center flex-col items-center pt-4 font-bold text-white">
                        <MdOutlinePets className='text-5xl' title='POALSNet' />
                        <span className="text-xl">POALSNet</span>
                    </div>
                    <div className="fixed top-1/4 w-full max-sm:p-4">
                        <form className="max-w-md mx-auto border p-8 text-sm rounded-lg shadow-md bg-white bg-opacity-10 backdrop-blur-2xl text-gray-900 max-sm:text-white" onSubmit={handleLogin}>
                            <div className="text-center mb-4">
                                <span className="font-semibold text-lg">Login</span>
                            </div>
                            <div className="relative z-0 w-full mb-5 group">
                                <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-white focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleEmail} />
                                <label htmlFor="floating_email" className="peer-focus:font-medium absolute font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <input type={showPassword ? "text" : "password"} name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-white focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handlePassword} />
                                <label htmlFor="floating_password" className="peer-focus:font-medium absolute font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-lg" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                                </div>
                            </div>

                            <div className="flex justify-end my-2">
                                <button disabled={!buttonEnabled} type="submit" class="text-white bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 enabled:dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                            </div>
                            <div className="mt-4 flex justify-between max-sm:flex-col max-sm:gap-y-2">
                                <div>
                                    <span>Not registered? <Link to="/register" className="text-blue-700 hover:underline dark:text-blue-500 underline-offset-2">Create account</Link></span>
                                </div>
                                <div>
                                    <Link to="/reset-password" className="hover:underline cursor-pointer underline-offset-2 text-blue-700">I forgot my password</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Login