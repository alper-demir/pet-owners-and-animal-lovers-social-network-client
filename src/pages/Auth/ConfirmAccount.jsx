import axios from 'axios';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom'
import loadingGIF from "../../asset/loading.gif";

const ConfirmAccount = () => {
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
            } else {
                const verifyEmail = await axios.post(`${URL}/verify-email/${id}`, {}, { headers: { Authorization: token } });
                if (verifyEmail.data.status === "success") {
                    toast.success(verifyEmail.data.message, { duration: 4000 });
                    navigate("/login");
                }
                else if (verifyEmail.data.status === "warning") {
                    toast.error(verifyEmail.data.message, { duration: 4000 });
                }
                else {
                    toast.error(verifyEmail.data.error, { duration: 4000 });
                }
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

    return (
        <div>
            {
                loading ? (
                    <div className='flex justify-center items-center mt-20'><img src={loadingGIF} alt="Loading.." className='w-10 h-10' /></div>
                ) :
                    (
                        <div className="fixed top-1/4 w-full max-sm:p-4">
                            ACOUNT CONFIRM PAGE
                        </div>
                    )
            }
        </div>
    )
}

export default ConfirmAccount