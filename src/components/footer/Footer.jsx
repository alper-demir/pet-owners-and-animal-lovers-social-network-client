import { MdOutlinePets } from "react-icons/md"
import { Link } from "react-router-dom"

const Footer = () => {
    return (
        <footer class="bg-white dark:bg-[#141414] mt-14">
            <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div class="md:flex md:justify-between">
                    <div class="mb-6 md:mb-0 dark:text-white">
                        <Link to="" class="flex items-center">
                            <MdOutlinePets className='text-3xl me-3' title='POALSNet' />
                            <span class="self-center text-2xl font-semibold whitespace-nowrap">POALSNet</span>
                        </Link>
                    </div>
                    <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Community</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li class="mb-4">
                                    <Link to="/discussion-forum" class="hover:underline">Discussion Forum</Link>
                                </li>
                                <li class="mb-4">
                                    <Link to="/volunteer" class="hover:underline">Volunteer</Link>
                                </li>
                                <li class="mb-4">
                                    <Link to="/volunteers" class="hover:underline">Volunteer List</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Social</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li class="mb-4">
                                    <Link to="/animal-protection-day-count-down" class="hover:underline">Animal Protection Day</Link>
                                </li>
                                <li>
                                    <Link to="/animal-charities" class="hover:underline">Animal Charities</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                            <ul class="text-gray-500 dark:text-gray-400 font-medium">
                                <li>
                                    <Link to="/terms" target="_blank" class="hover:underline">Terms &amp; Policies</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-400 lg:my-8" />
                <div class="sm:flex sm:items-center sm:justify-between">
                    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <span class="hover:underline">POALSNet™</span>. All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}

export default Footer