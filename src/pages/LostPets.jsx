import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LostPets = () => {
    const [lostPets, setLostPets] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const URL = "http://localhost:3001"
    const navigate = useNavigate();

    useEffect(() => {
        // Kayıp hayvan ilanlarını API'den al
        const fetchLostPets = async () => {
            try {
                const response = await axios.get(`${URL}/lost-pets?page=${currentPage}`);
                setLostPets(response.data.lostPets);
                setTotalPages(response.data.totalPages);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching lost pets:', error);
            }
        };

        fetchLostPets();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleRowClick = (link) => {
        navigate(`/lost-pet-notice/${link}`);
    }

    return (
        <div className="my-8 mb-20">
            <h1 className="text-3xl max-sm:text-xl font-bold mb-4">Lost Pet Notices</h1>

            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-xs rtl:text-right text-gray-500 dark:text-gray-400 text-center">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="p-4">
                                Profile
                            </th>
                            <th scope="col" class="p-4">
                                Description
                            </th>
                            <th scope="col" class="p-4">
                                Notice Status
                            </th>
                            <th scope="col" class="p-4">
                                Location
                            </th>
                            <th scope="col" class="p-4">
                                Notice Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            lostPets.map(pet => (
                                <tr onClick={() => handleRowClick(pet._id)} key={pet._id} class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 cursor-pointer">
                                    <th scope="row" class="p-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <div className='flex flex-col gap-y-1 items-center'>
                                            <div>
                                                <img src={`${URL}/public/images/${pet.image}`} alt={pet.title} className="h-24 w-24 cursor-pointer group-hover:scale-95 duration-300 object-cover rounded-md max-sm:w-[4.5rem] max-sm:h-[4.5rem]" />
                                            </div>
                                            <div>
                                                <Link to={`/lost-pets/${pet._id}`} className="text-blue-600 hover:underline">{pet.name}</Link> - <span className="text-gray-600">{pet.species}, {pet.color}</span>
                                            </div>
                                            <div>
                                                by <Link to={`/${pet.createdBy.username}`}>@{pet.createdBy.username}</Link>
                                            </div>
                                        </div>
                                    </th>
                                    <td class="p-4">
                                        {pet.description}
                                    </td>
                                    <td class="p-4">
                                        {pet.lostStatus}
                                    </td>
                                    <td class="p-4">
                                        {pet.city}
                                    </td>
                                    <td class="p-4">
                                        <span>{new Date(pet.createdAt).toLocaleString()}</span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


            <div className="flex justify-between mt-4">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50">Previous</button>
                <span className="text-lg text-gray-600">{currentPage} / {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50">Next</button>
            </div>
        </div>
    );
};

export default LostPets;
