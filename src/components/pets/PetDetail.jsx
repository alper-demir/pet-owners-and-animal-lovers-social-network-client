import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";

const PetDetail = () => {

    const [petOwner, setPetOwner] = useState("")
    const [pet, setPet] = useState({});
    const { petId } = useParams();

    const URL = "http://localhost:3001"
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const getPetData = async () => {
        try {
            const petData = await axios.post(`${URL}/pet/${petId}`, {}, { headers: { Authorization: token } });
            if (petData) {
                setPet(petData.data);
                setPetOwner(petData.data.userId)
                console.log(petData.data);
            }
        } catch (error) {
            console.log("Pet detail page error: " + error);
            toast.error("No pet record!")
            navigate("/")
        }
    }

    useEffect(() => {
        getPetData();
    }, [])

    return (




        <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 mb-20 dark:text-white">
            <table class="w-full text-sm text-left rtl:text-right">
                <tbody>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Picture:
                        </th>
                        <td class="px-6 py-4">
                            <img src={`${URL}/public/images/${pet.profileUrl}`} alt={pet.name} className='w-60 h-60 object-cover max-sm:w-40 max-sm:h-40 rounded-md max-sm:min-w-40 max-sm:min-h-40' />
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Name:
                        </th>
                        <td class="px-6 py-4">
                            {pet.name}
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Birth Date:
                        </th>
                        <td class="px-6 py-4">
                            {new Date(pet.birthDate).toLocaleDateString()}
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Gender:
                        </th>
                        <td class="px-6 py-4">
                            {pet.gender}
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Breed:
                        </th>
                        <td class="px-6 py-4">
                            {pet.breed}
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Color:
                        </th>
                        <td class="px-6 py-4">
                            {pet.color}
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Age:
                        </th>
                        <td class="px-6 py-4">
                            {new Date().getFullYear() - new Date(pet.birthDate).getFullYear()} years old
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Weight:
                        </th>
                        <td class="px-6 py-4">
                            {pet.weight} kg
                        </td>
                    </tr>
                    <tr class="odd:bg-white odd:dark:bg-[#121212] even:bg-gray-50 even:dark:bg-[#141414] border-b dark:border-[#777777]">
                        <th scope="row" class="px-6 py-4 font-medium dark:border-[#777777] dark:border-opacity-30 whitespace-nowrap">
                            Owner:
                        </th>
                        <td class="px-6 py-4">
                            <Link to={`/${petOwner.username}`}>@{petOwner.username}</Link>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

    );
};
export default PetDetail;
