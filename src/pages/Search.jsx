import axios from "axios";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import loadingGIF from "../asset/loading.gif"

const Search = () => {

    const URL = "http://localhost:3001";
    const [input, setInput] = useState("");
    const [results, setResults] = useState({});
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        const inputValue = e.target.value;
        setInput(inputValue);
        if (inputValue.length > 3) {
            setLoading(true);
            try {
                const res = await axios.get(`${URL}/search?q=${input}`);
                setResults(res.data);
            } catch (error) {
                console.error("Error fetching search results:", error);
                setResults({});
            } finally {
                setLoading(false);
            }
        } else {
            setResults({});
        }
    };


    return (
        <div className="dark:text-white w-full">
            <div className="mt-3 mb-5 text-center text-lg max-sm:text-base font-bold">
                <h3>Search</h3>
            </div>
            <div className="flex justify-center relative mx-auto w-1/2 max-sm:w-2/3">
                <input
                    onChange={handleSearch}
                    type="text"
                    className="w-full rounded-md p-2 pr-12 border border-gray-200 dark:border-opacity-20 dark:bg-transparent"
                    placeholder="Search user, post, notice or pet.."
                />
                <IoSearchOutline className="text-2xl absolute right-1 top-1/2 -translate-y-1/2" />
            </div>
            <div className="border-b mt-8 border-gray-200 dark:border-opacity-20"></div>

            {/* SEARCH RESULTS */}

            {
                loading ?
                    (
                        <div className="flex justify-center mt-10"><img src={loadingGIF} alt="" className="w-8 h-8" /></div>
                    ) :
                    (
                        <>
                            {/* USERS */}
                            <div>
                                {!loading && results.users && results.users.length === 0 && (
                                    <div className="border-b my-2 pb-2 border-gray-200 dark:border-opacity-20">No users found.</div>
                                )}
                                {!loading && results.users && results.users.length > 0 && (
                                    <div>
                                        <div className="mt-3 mb-5 text-lg max-sm:text-base font-bold">
                                            <h3>Users</h3>
                                        </div>
                                        <div className="border dark:border-opacity-20 rounded-md border-gray-200 break-words">
                                            {results.users.map((user) => (
                                                <Link
                                                    to={`/${user.username}`}
                                                    className="flex my-1 w-full items-center border-b dark:border-opacity-20 border-gray-200 last:border-0"
                                                    key={user._id}
                                                >
                                                    <div className="flex flex-col gap-y-1 w-1/6 p-2 items-center">
                                                        <div>
                                                            <img
                                                                src={`${URL}/public/images/${user.profileUrl}`}
                                                                alt=""
                                                                className="w-12 h-12 rounded-full object-cover"
                                                            />
                                                        </div>
                                                        <div>{user.firstName + " " + user.lastName}</div>
                                                    </div>
                                                    <div>@{user.username}</div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* POSTS */}
                            <div>
                                {!loading && results.posts && results.posts.length === 0 && (
                                    <div className="border-b my-2 pb-2 border-gray-200 dark:border-opacity-20">No posts found.</div>
                                )}
                                {!loading && results.posts && results.posts.length > 0 && (
                                    <div>
                                        <div className="mt-3 mb-5 text-lg max-sm:text-base font-bold">
                                            <h3>Posts</h3>
                                        </div>
                                        <div className="border dark:border-opacity-20 rounded-md border-gray-200 break-words">
                                            {results.posts.map((post) => (
                                                <Link
                                                    to={`/post/${post._id}`}
                                                    className="flex my-1 w-full items-center border-b dark:border-opacity-20 border-gray-200 last:border-0"
                                                    key={post._id}
                                                >
                                                    <div className="flex gap-x-1 w-1/6 p-2 items-center">
                                                        <div>
                                                            <img
                                                                src={`${URL}/public/images/${post.image}`}
                                                                alt=""
                                                                className="w-12 h-12 rounded-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>{post.content}</div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* PET PROFILE */}
                            <div>
                                {!loading && results.pets && results.pets.length === 0 && (
                                    <div className="border-b my-2 pb-2 border-gray-200 dark:border-opacity-20">No pets found.</div>
                                )}
                                {!loading && results.pets && results.pets.length > 0 && (
                                    <div>
                                        <div className="mt-3 mb-5 text-lg max-sm:text-base font-bold">
                                            <h3>Pet Profile</h3>
                                        </div>
                                        <div className="border dark:border-opacity-20 rounded-md border-gray-200 break-words">
                                            {results.pets.map((pet) => (
                                                <Link
                                                    to={`/pet/${pet._id}`}
                                                    className="flex my-1 w-full items-center border-b dark:border-opacity-20 border-gray-200 last:border-0"
                                                    key={pet._id}
                                                >
                                                    <div className="flex flex-col gap-y-1 w-1/6 p-2 items-center">
                                                        <div>
                                                            <img
                                                                src={`${URL}/public/images/${pet.profileUrl}`}
                                                                alt=""
                                                                className="w-12 h-12 rounded-full object-cover"
                                                            />
                                                        </div>
                                                        <div>{pet.name}</div>
                                                    </div>
                                                    <div className="flex gap-x-2">
                                                        <div>Species: {pet.species}</div>
                                                        <div>-</div>
                                                        <div>Breed: {pet.breed}</div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* NOTICES */}
                            <div>
                                {!loading && results.lostPets && results.lostPets.length === 0 && (
                                    <div className="border-b my-2 pb-2 border-gray-200 dark:border-opacity-20">No lost pet notices found.</div>
                                )}
                                {!loading && results.lostPets && results.lostPets.length > 0 && (
                                    <div>
                                        <div className="mt-3 mb-5 text-lg max-sm:text-base font-bold">
                                            <h3>Notices</h3>
                                        </div>
                                        <div className="border dark:border-opacity-20 rounded-md border-gray-200 break-words">
                                            {results.lostPets.map((notice) => (
                                                <Link
                                                    to={`/lost-pet-notice/${notice._id}`}
                                                    className="flex my-1 w-full items-center border-b dark:border-opacity-20 border-gray-200 last:border-0"
                                                    key={notice._id}
                                                >
                                                    <div className="flex flex-col gap-y-1 w-1/6 p-2 items-center">
                                                        <div>
                                                            <img
                                                                src={`${URL}/public/images/${notice.image}`}
                                                                alt=""
                                                                className="w-12 h-12 rounded-full object-cover"
                                                            />
                                                        </div>
                                                        <div>{notice.name}</div>
                                                    </div>
                                                    <div>{notice.description}</div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )
            }




        </div>
    )
}

export default Search