import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SettingsDropDown = () => {

    const [theme, setTheme] = useState("");
    const navigate = useNavigate();

    const dropDownSettings = () => {
        const settings = document.getElementById("settings");
        if (settings.classList.contains("hidden")) {
            settings.classList.remove("hidden")
        }
        else {
            settings.classList.add("hidden")
        }
    }

    const changeTheme = () => {
        const html = document.querySelector("html");
        if (theme === "light") {
            setTheme("dark");
            localStorage.setItem("theme", "dark");
            html.classList.add("dark");
            html.setAttribute("dark", "");
        }
        else {
            setTheme("light");
            localStorage.setItem("theme", "light");
            html.classList.remove("dark");
            html.removeAttribute("dark")
        }
    }
    const logout = () => {
        localStorage.removeItem("token")
        navigate("/login")
        toast.success("Logged out")
    }


    useEffect(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") {
            setTheme(theme);
            document.querySelector("html").classList.add("dark");
            document.querySelector("html").setAttribute("dark", "")
        }
        else {
            setTheme("light");
        }
    }, [])

    return (
        <div className="group cursor-pointer max-sm:absolute max-sm:top-[25px] max-sm:right-5 relative z-10 text-black">
            <svg onClick={dropDownSettings} aria-label="Daha Fazla" class="text-[#b8b8b8] dark:text-[#4d4d4d] group-hover:text-black dark:group-hover:text-white transition-colors duration-300" fill="rgb(184, 184, 184)" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Daha Fazla</title><rect fill="currentColor" height="2.5" rx="1.25" width="21" x="3" y="7"></rect><rect fill="currentColor" height="2.5" rx="1.25" width="14" x="10" y="15"></rect></svg>
            <div id='settings' className='absolute top-7 -left-[8.5rem] border-[1px] border-gray-100 rounded-xl w-[174px] font-semibold text-[15px] hidden bg-white dark:bg-[#181818] dark:text-white dark:border-[#777777] dark:border-opacity-20'>
                <ul className='flex flex-col'>
                    <li className='p-3 border-b-[1px] dark:border-[#777777] dark:border-opacity-40' onClick={changeTheme}>Görünümü değiştir</li>
                    <li className='p-3 border-b-[1px] dark:border-[#777777] dark:border-opacity-40'>Hakkında</li>
                    <li className='p-3 border-b-[1px] dark:border-[#777777] dark:border-opacity-40'>Sorun bildir</li>
                    <li className='p-3' onClick={logout} >Çıkış yap</li>
                </ul>
            </div>
        </div>
    )
}

export default SettingsDropDown