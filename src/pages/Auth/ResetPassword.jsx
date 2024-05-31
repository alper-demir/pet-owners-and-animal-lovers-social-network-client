import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import loadingGIF from "../../asset/loading.gif";
import { MdOutlinePets, MdVisibility, MdVisibilityOff } from "react-icons/md"; // İkonları import edin
import "./auth.css"

const ResetPassword = () => {
    const { token, id } = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const URL = process.env.REACT_APP_BASE_URL;

    const checkTokenValid = async () => {
        try {
            setLoading(true);
            const verify = await axios.post(`${URL}/verify-token`, {}, { headers: { Authorization: token } });
            console.log(verify.data);
            if (!verify.data.verify) {
                // token is expired
                toast.error("This link has been expired");
                navigate("/login");
            }
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        checkTokenValid();
    }, []);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const validatePassword = (password) => {
        if (password.length < 12) {
            return "Password must be at least 12 characters long";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        return "";
    };

    useEffect(() => {
        const passwordError = validatePassword(password);
        setPasswordError(passwordError);
        const confirmPasswordError = password !== confirmPassword ? "Passwords do not match" : "";
        setConfirmPasswordError(confirmPasswordError);
        setButtonEnabled(!passwordError && !confirmPasswordError && password && confirmPassword);
    }, [password, confirmPassword]);

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!passwordError && !confirmPasswordError) {
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
            toast.error("Please fix the errors before submitting");
        }
    };

    return (
        <div className="h-screen bg-img-auth">
            <div className="flex justify-center flex-col items-center pt-4 font-bold text-white">
                <MdOutlinePets className='text-5xl' title='POALSNet' />
                <span className="text-xl">POALSNet</span>
            </div>
            {
                loading ? (
                    <div className='flex justify-center items-center mt-20'><img src={loadingGIF} alt="Loading.." className='w-10 h-10' /></div>
                ) :
                    (
                        <div className="fixed top-1/4 w-full max-sm:p-4">
                            <form className="max-w-md mx-auto border p-8 text-sm rounded-lg shadow-md bg-white bg-opacity-10 backdrop-blur-2xl" onSubmit={handleLogin}>
                                <div className='mb-6 text-center text-lg max-sm:text-base font-bold'>
                                    <h3>Reset Password</h3>
                                </div>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input type={passwordVisible ? "text" : "password"} name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer" placeholder=" " required onChange={handlePassword} />
                                    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                        <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none">
                                            {passwordVisible ? <MdVisibility className="text-xl" /> : <MdVisibilityOff className="text-xl" />}
                                        </button>
                                    </div>
                                </div>
                                {passwordError && <p className="text-teal-400 text-sm my-2">{passwordError}</p>}

                                <div className="relative z-0 w-full mb-5 group">
                                    <input type={confirmPasswordVisible ? "text" : "password"} name="floating_confirm_password" id="floating_confirm_password" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-sky-600 peer" placeholder=" " required onChange={handleConfirmPassword} />
                                    <label htmlFor="floating_confirm_password" className="peer-focus:font-medium absolute text-sm font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                        <button type="button" onClick={toggleConfirmPasswordVisibility} className="focus:outline-none">
                                            {confirmPasswordVisible ? <MdVisibility className="text-xl" /> : <MdVisibilityOff className="text-xl" />}
                                        </button>
                                    </div>
                                </div>
                                {confirmPasswordError && <p className="text-teal-400 text-sm my-2">{confirmPasswordError}</p>}

                                <div className="flex justify-end my-2">
                                    <button disabled={!buttonEnabled} type="submit" className="text-white bg-sky-700 enabled:hover:bg-sky-800 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 enabled:dark:hover:bg-sky-700 dark:focus:ring-sky-800">Confirm Change</button>
                                </div>
                            </form>
                        </div>
                    )
            }
        </div>
    )
}

export default ResetPassword;