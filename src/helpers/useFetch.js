import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { setUser } from '../stores/user/user';
import { fetchAuth } from './fetchAuth';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const useFetch = () => {
    const token = localStorage.getItem('token');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const { verify, message } = await fetchAuth();
                if (!verify && window.location.pathname !== "/login") {
                    navigate('/login');
                    toast.error(message)
                }
                else if (verify && window.location.pathname === "/login") {
                    navigate("/")
                } else {
                    const decodedToken = jwtDecode(token);
                    dispatch(setUser(decodedToken));
                }
            } catch (error) {
                console.error("Fetch error:", error);
            }

            setIsLoading(false);
        };

        fetchData();
    }, [dispatch, navigate, token]);

    return { user, isLoading };
};

export default useFetch;