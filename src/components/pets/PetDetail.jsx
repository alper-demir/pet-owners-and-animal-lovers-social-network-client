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
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
                <img src={`${URL}/public/images/${pet.profileUrl}`} alt={pet.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                <h2 className="text-2xl font-semibold">{pet.name}</h2>
            </div>
            <div className="mb-4">
                <p><span className="font-semibold">Tür:</span> {pet.species}</p>
                <p><span className="font-semibold">Cins:</span> {pet.breed}</p>
                <p><span className="font-semibold">Doğum Tarihi:</span> {new Date(pet.birthDate).toLocaleDateString()}</p>
                <p><span className="font-semibold">Ağırlık:</span> {pet.weight} kg</p>
                <p><span className="font-semibold">Renk:</span> {pet.color}</p>
                <p><span className="font-semibold">Gender:</span> {pet.gender}</p>
                <p><span className="font-semibold">Owner:</span> <Link to={`/${petOwner.username}`}>@{petOwner.username}</Link> </p>
                {new Date().getFullYear() - new Date(pet.birthDate).getFullYear()} years old.
                <p>Registered at: {new Date(pet.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
}

export default PetDetail;
