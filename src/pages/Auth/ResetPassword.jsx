import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import loadingGIF from "../../asset/loading.gif";

const ResetPassword = () => {

    const { token, id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const URL = process.env.REACT_APP_BASE_URL
    const checkTokenValid = async () => {
        try {
            setLoading(true);
            const verify = await axios.post(`${URL}/verify-token`, {}, { headers: { Authorization: token } });
            console.log(verify.data);
            if (!verify.data.verify) {
                // token is expired
                toast.error("This link has been expired")
                navigate("/login");
            }
            setLoading(false)
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        checkTokenValid();
    }, [])

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [buttonEnabled, setButtonEnabled] = useState(false);

    useEffect(() => {
        handleButton();
    }, [confirmPassword, password]);

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleButton = () => {
        setButtonEnabled(confirmPassword.length > 0 && password.length > 0);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            try {
                const changePassword = await axios.post(`${URL}/change-password`, { password, id });
                if (changePassword.data.status === "success") {
                    toast.success(changePassword.data.message);
                    navigate("/login");
                } else {
                    toast.error(changePassword.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        } else {
            toast.error("Passwords are not matching!");
        }
    }

    return (
        <div>
            {
                loading ? (
                    <div className='flex justify-center items-center mt-20'><img src={loadingGIF} alt="Loading.." className='w-10 h-10' /></div>
                ) :
                    (
                        <div className="fixed top-1/4 w-full max-sm:p-4">
                            <form className="max-w-md mx-auto border p-8 text-sm rounded-lg shadow-md" onSubmit={handleLogin}>
                                <div className='mb-6 text-center text-lg max-sm:text-base font-bold'>
                                    <h3>Reset Password</h3>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer" placeholder=" " required onChange={handlePassword} />
                                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                </div>

                                <div className="relative z-0 w-full mb-5 group">
                                    <input type="password" name="floating_confirm_password" id="floating_confirm_password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer" placeholder=" " required onChange={handleConfirmPassword} />
                                    <label htmlFor="floating_confirm_password" className="peer-focus:font-medium absolute dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-sky-600 peer-focus:dark:text-sky-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                                </div>

                                <div className="flex justify-end my-2">
                                    <button disabled={!buttonEnabled} type="submit" class="text-white bg-sky-700 enabled:hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 enabled:dark:hover:bg-sky-700 dark:focus:ring-sky-800">Confirm Change</button>
                                </div>
                            </form>
                        </div>
                    )
            }
        </div>
    )
}

export default ResetPassword