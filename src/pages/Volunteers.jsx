import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const Volunteers = () => {
    const [selectedCity, setSelectedCity] = useState("");
    const [totalVolunteers, setTotalVolunteers] = useState(0);
    const [volunteersByCity, setVolunteersByCity] = useState([]);
    const [volunteers, setVolunteers] = useState([]);

    const URL = process.env.REACT_APP_BASE_URL;

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${URL}/volunteers/stats`);
            console.log(response.data);
            if (response.data.status === "success") {
                setTotalVolunteers(response.data.totalVolunteers);
                setVolunteersByCity(response.data.volunteersByCity);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };

    const fetchVolunteersByCity = async (city) => {
        try {
            const response = await axios.get(`${URL}/volunteers/${city}`);
            console.log(response.data);
            if (response.data.status === "success") {
                setVolunteers(response.data.volunteers);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        }
    };
    
    const [cities, setCities] = useState([]);
    const getCities = async () => {
        const cities = await axios.get(`${URL}/cities`);
        if (cities) {
            setCities(cities.data);
        }
    }


    useEffect(() => {
        fetchStats();
        getCities();
    }, []);

   
    useEffect(() => {
        if (selectedCity) {
            fetchVolunteersByCity(selectedCity);
        }
    }, [selectedCity]);

    return (
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md dark:text-white dark:bg-[#161616]">
            <Helmet>
                <title>POALSNet Volunteers</title>
                <meta name="description" content="Volunteer List" />
            </Helmet>
            <h2 className="text-xl font-bold text-center mb-4">POALSNet Volunteers</h2>
            <p className="text-lg mb-4 text-center">Total Volunteers: {totalVolunteers}</p>
            <div className="mb-4">
                <label htmlFor="city" className="block text-lg font-medium mb-2">Select City:</label>
                <select
                    id="city"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-[#141414]"
                >
                    <option value="" disabled>Select City</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Volunteers by City</h3>
                <ul className="list-disc list-inside">
                    {volunteersByCity.map((cityStat, index) => (
                        <span key={cityStat._id}>
                            <li>{cityStat._id}: {cityStat.count} volunteers</li>
                            {(index + 1) % 5 === 0 && <br />}
                        </span>
                    ))}
                </ul>
            </div>
            {selectedCity && (
                <div>
                    {
                        volunteers.length > 0 &&
                        <>
                            <h3 className="text-xl font-semibold mb-2">Volunteers in {selectedCity}</h3>
                            <ul className="grid grid-cols-2 gap-4">
                                {

                                    volunteers.map(volunteer => (
                                        <li key={volunteer._id} className="flex items-center space-x-4 p-2 border border-gray-300 rounded-lg">
                                            <img src={`${URL}/public/images/${volunteer.userId.profileUrl}`} alt={volunteer.userId.firstName} className="w-12 h-12 rounded-full object-cover" />
                                            <span>{volunteer.userId.firstName}</span>
                                        </li>
                                    ))}
                            </ul>
                        </>
                    }
                </div>
            )}
        </div>
    );
};

export default Volunteers;
