import axios from "axios";
import { useState } from "react"
import { toast } from 'react-hot-toast';
import { MdOutlinePets, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css"

const Register = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to control password visibility
    const [passwordError, setPasswordError] = useState(""); // State to manage password error message
    const [acceptTermsError, setAcceptTermsError] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false); // Kullanıcı sözleşmesini kabul etme durumu

    const URL = process.env.REACT_APP_BASE_URL;
    const navigate = useNavigate();

    // Function to check password constraints
    const isPasswordValid = (password) => {
        return password.length >= 12 && /[A-Z]/.test(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!isPasswordValid(password)) {
            setPasswordError("Password must be at least 12 characters long and contain at least 1 uppercase letter");
        } else {
            setPasswordError("");
        }
        if (!acceptTerms) {
            setAcceptTermsError("Please accept the terms and conditions.");
            return;
        }
        else {
            setAcceptTermsError("");
        }
        if (email && password && firstName && lastName && username && acceptTerms && isPasswordValid(password)) {
            const register = await axios.post(`${URL}/register`, { email, password, firstName, lastName, username });
            if (register.data.status === "error") {
                toast.error(register.data.message)
            } else {
                toast.success(register.data.message, { duration: 5000 })
                navigate("/login")
            }
        }
    }

    return (
        <div className="h-screen bg-img-auth">
            <div className="flex justify-center flex-col items-center pt-4 font-bold text-white">
                <MdOutlinePets className='text-5xl' title='POALSNet' />
                <span className="text-xl">POALSNet</span>
            </div>
            <div className="fixed top-1/4 w-full max-sm:p-4">
                <form class="max-w-md mx-auto border p-8 rounded-lg shadow-md text-sm bg-white bg-opacity-10 backdrop-blur-2xl text-gray-900 max-sm:text-white" onSubmit={handleRegister}>
                    <div className="text-center mb-4">
                        <span className="font-semibold text-lg">Register</span>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="email" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setEmail(e.target.value)} />
                        <label for="floating_email" class="peer-focus:font-medium absolute text-sm font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type={showPassword ? "text" : "password"} name="floating_password" id="floating_password" class="block py-2.5 px-0 pr-10 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setPassword(e.target.value)} />
                        <label for="floating_password" class="peer-focus:font-medium absolute text-sm font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-lg" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                        </div>
                    </div>
                    {passwordError && <div className="text-red-500 text-xs italic font-semibold mb-6"><p>{passwordError}</p></div>}
                    <div class="grid md:grid-cols-2 md:gap-6">
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setFirstName(e.target.value)} />
                            <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                        </div>
                        <div class="relative z-0 w-full mb-5 group">
                            <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setLastName(e.target.value)} />
                            <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                        </div>
                    </div>
                    <div class="relative z-0 w-full mb-5 group">
                        <input type="username" name="floating_username" id="floating_username" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={(e) => setUsername(e.target.value)} />
                        <label for="floating_username" class="peer-focus:font-medium absolute text-sm font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <label htmlFor="acceptTerms" className="flex items-center">
                            <input type="checkbox" id="acceptTerms" name="acceptTerms" className="mr-2" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
                            <span className="text-sm">I have read and agree to the <Link to="/terms" target="_blank" className="text-blue-700 hover:underline dark:text-blue-500 underline-offset-2">terms and policies.</Link></span>
                        </label>
                    </div>
                    {acceptTermsError && <div className="text-red-500 text-xs italic font-semibold mb-6"><p>{acceptTermsError}</p></div>}
                    <div className="flex justify-end my-2">
                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </div>
                    <div className="mt-4 text-center text-base max-sm:text-sm">
                        <span>You have an account? <Link to="/login" className="text-blue-700 font-semibold hover:underline underline-offset-2">Login</Link> </span>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register