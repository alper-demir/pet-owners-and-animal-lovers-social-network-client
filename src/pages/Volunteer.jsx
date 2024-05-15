import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const cities = [
    "Adana", "Adıyaman", "Afyon", "Ağrı", "Aksaray", "Amasya", "Ankara", "Antalya", "Ardahan", "Artvin",
    "Aydın", "Balıkesir", "Bartın", "Batman", "Bayburt", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur",
    "Bursa", "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Düzce", "Edirne", "Elazığ",
    "Erzincan", "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Iğdır",
    "Isparta", "İstanbul", "İzmir", "Kahramanmaraş", "Karabük", "Karaman", "Kars", "Kastamonu", "Kayseri",
    "Kırıkkale", "Kırklareli", "Kırşehir", "Kilis", "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa",
    "Mardin", "Mersin", "Muğla", "Muş", "Nevşehir", "Niğde", "Ordu", "Osmaniye", "Rize", "Sakarya",
    "Samsun", "Siirt", "Sinop", "Sivas", "Şanlıurfa", "Şırnak", "Tekirdağ", "Tokat", "Trabzon", "Tunceli",
    "Uşak", "Van", "Yalova", "Yozgat", "Zonguldak"
];

const Volunteer = () => {
    const [selectedCity, setSelectedCity] = useState("");
    const [volunteer, setVolunteer] = useState(false);
    const [volunteerUser, setVolunteerUser] = useState({});
    const { userId } = useSelector(state => state.user.user);
    const token = localStorage.getItem("token");
    const URL = process.env.REACT_APP_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedCity) {
            try {
                const response = await axios.post(`${URL}/volunteer`, { userId, city: selectedCity }, { headers: { Authorization: token } });
                if (response.data.status === "success") {
                    toast.success(response.data.message);
                    isVolunteer();
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            }
        }
    }

    const isVolunteer = async () => {
        try {
            const volunteer = await axios.get(`${URL}/volunteer/${userId}`);
            if (volunteer.data.status === "success") {
                console.log(volunteer.data);
                setVolunteerUser(volunteer.data.volunteer);
                setVolunteer(volunteer.data.volunteer.userId.isVolunteer);
            } else {
                toast.error(volunteer.data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleVolunteerCityChange = async (e) => {
        e.preventDefault();
        if (selectedCity && selectedCity !== volunteerUser.city) {
            try {
                const response = await axios.put(`${URL}/volunteer`, { userId, city: selectedCity }, { headers: { Authorization: token } });
                if (response.data.status === "success") {
                    toast.success(response.data.message);
                    isVolunteer();
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            }
        }
        else {
            toast.error("You should select different city.")
        }
    }

    const handleVolunteerCancel = async () => {
        const confirmDelete = window.confirm("Are you sure to cancel your volunteer");
        if (confirmDelete) {
            try {
                const response = await axios.post(`${URL}/volunteer/leave`, { userId }, { headers: { Authorization: token } });
                if (response.data.status === "success") {
                    toast.success(response.data.message);
                    setVolunteer(false)
                    setVolunteerUser({})
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            }
        }
    }

    useEffect(() => {
        isVolunteer();
    }, [])

    return (
        <div className="mt-10 dark:text-white">
            {
                volunteer ? (
                    <>
                        <h3 className="text-lg text-center my-2 font-semibold">Volunteering</h3>
                        <div className="bg-gray-200 p-3 rounded-md text-center dark:bg-opacity-10">
                            Thank you for being a member of POALSNet Volunteer for city {volunteerUser.city}
                        </div>
                        <div className="mt-2">
                            <form onSubmit={handleVolunteerCityChange}>
                                <select
                                    id="city"
                                    value={volunteerUser.city}
                                    onChange={(e) => setSelectedCity(e.target.value)}
                                    required
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300 dark:bg-transparent"
                                >
                                    <option value="" disabled>Select City</option>
                                    {cities.map(city => (
                                        <option key={city} value={city} className="dark:bg-[#141414]">{city}</option>
                                    ))}
                                </select>
                                <button
                                    type="submit"
                                    className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                                >
                                    Change volunteer city
                                </button>
                            </form>
                            <button
                                onClick={handleVolunteerCancel}
                                className="mt-4 w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition duration-300"
                            >
                                Cancel Volunteer
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="volunteer-form max-w-xl mx-auto mb-20 p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-xl font-bold text-center mb-4">Become POALSNet Volunteer</h2 >
                        <p className="mb-4 text-gray-700">
                            POALSNet is an animal rights community dedicated to improving the lives of animals and promoting animal welfare. By becoming a volunteer, you will help us make a difference in the lives of countless animals. Here's what you'll be doing as a volunteer:
                        </p>
                        <ul className="list-disc list-inside mb-4 text-gray-700">
                            <li>Helping street animals with food and water, and facilitating their medical care.</li>
                            <li>Organizing and participating in awareness campaigns for animal rights.</li>
                            <li>Visiting shelters to assist with animal care and support adoption processes.</li>
                            <li>Educating the public about animal rights through seminars and educational programs.</li>
                        </ul>
                        <p className="mb-4 text-gray-700">
                            Why should you volunteer?
                        </p>
                        <ul className="list-disc list-inside mb-6 text-gray-700">
                            <li>Make a real difference in the lives of animals.</li>
                            <li>Contribute to your community by raising awareness about animal rights.</li>
                            <li>Develop new skills and meet like-minded individuals.</li>
                            <li>Experience the joy and fulfillment of helping others.</li>
                        </ul>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="city" className="block text-lg font-medium text-gray-700 mb-2">Select city:</label>
                            <select
                                id="city"
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            >
                                <option value="" disabled>Select City</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Be volunteer
                            </button>
                        </form>
                    </div >
                )
            }
        </div>
    );
}

export default Volunteer;
