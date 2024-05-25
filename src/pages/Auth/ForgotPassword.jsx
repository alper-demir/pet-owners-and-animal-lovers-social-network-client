import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast';
import "./auth.css"
import { MdOutlinePets } from 'react-icons/md';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const URL = process.env.REACT_APP_BASE_URL;

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    useEffect(() => {
        handleButton();
    }, [email]);

    const handleButton = () => {
        setButtonEnabled(email.length > 0);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URL}/reset-password`, { email });
            if (response.data.status === "success") {
                toast.success(response.data.message, { duration: 5000 });
            } else {
                toast.error(response.data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    };


    return (
        <div className='h-screen bg-img-auth'>
            <div className="flex justify-center flex-col items-center pt-4 font-bold text-white">
                <MdOutlinePets className='text-5xl' title='POALSNet' />
                <span className="text-xl">POALSNet</span>
            </div>
            <div className="fixed top-1/4 w-full max-sm:p-4">
                <form className="max-w-md mx-auto border p-8 text-sm rounded-lg shadow-md bg-white bg-opacity-10 backdrop-blur-lg" onSubmit={handleResetPassword}>
                    <div className="relative z-0 w-full mb-5 group">
                        <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-gray-900 bg-transparent border-0 border-b-2 appearance-none border-white focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleEmail} />
                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm font-semibold duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>
                    <div className="flex justify-end my-2">
                        <button disabled={!buttonEnabled} type="submit" class="text-white bg-blue-700 enabled:hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 enabled:dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset Password</button>
                    </div>
                    <div className="mt-4 flex justify-between max-sm:flex-col max-sm:gap-y-2">
                        <div>
                            <Link to="/login" className="text-blue-700 hover:underline dark:text-blue-500 underline-offset-2">Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPassword