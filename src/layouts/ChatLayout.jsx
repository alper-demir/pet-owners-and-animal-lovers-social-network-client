import { Link, useOutlet } from "react-router-dom";
import loadingGIF from "../asset/loading.gif";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import placeholderImage from "../asset/placeholder.jpg"; // Yerine kendi placeholder resminizi koyun

const ChatContext = createContext();

const ChatLayout = () => {
    const [chats, setChats] = useState([]);
    const [loadingChat, setLoadingChat] = useState(false);
    const { userId } = useSelector(state => state.user.user);
    const URL = process.env.REACT_APP_BASE_URL;
    const outlet = useOutlet();

    const fetchChats = async () => {
        try {
            setLoadingChat(true);
            const chatsData = await axios.get(`${URL}/user-chats/${userId}`);
            setChats(chatsData.data);
            console.log(chatsData.data);
        } catch (error) {
            // toast.error(error.message);
        }
        setLoadingChat(false);
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div>
            <div className="flex h-[85vh] max-sm:h-[80vh] border rounded-md dark:border-opacity-20 border-gray-200">
                <div className="border-r dark:border-opacity-20 border-gray-200 overflow-y-auto dark:text-[#f1f1f1] max-sm:hidden w-[186px] overflow-x-hidden">
                    <Link to="/chat" className="text-xl flex justify-center items-center font-semibold border-b dark:border-opacity-20 border-gray-200 h-[113px]">Chats</Link>
                    {chats.length > 0 ?
                        (
                            loadingChat ?
                                (
                                    <div className='flex justify-center'><img src={loadingGIF} alt="loading" className='w-10 h-10' /></div>
                                ) :
                                (
                                    chats.map((chat, index) => (
                                        chat.receiverId._id === userId ? (
                                            <Link to={`/chat/${chat.roomId}`} key={index} className="block p-4 hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] border-b dark:border-opacity-20 border-gray-200">
                                                <div className="flex items-center space-x-2 max-sm:flex-col max-sm:text-center max-sm:space-x-0">
                                                    <img src={`${URL}/public/images/${chat.senderId.profileUrl}`} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                                                    <div>
                                                        <p className="font-medium">{chat.senderId.firstName} {chat.senderId.lastName}</p>
                                                        <p className="text-xs">{chat.content}</p>
                                                    </div>
                                                </div>
                                                <span className='text-xs'>{new Date(chat.timestamp).toLocaleTimeString()}</span>
                                            </Link>
                                        ) : (
                                            <Link to={`/chat/${chat.roomId}`} key={index} className="block p-4 hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] border-b dark:border-opacity-20 border-gray-200">
                                                <div className="flex items-center space-x-2 max-sm:flex-col max-sm:text-center max-sm:space-x-0">
                                                    <img src={`${URL}/public/images/${chat.receiverId.profileUrl}`} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                                                    <div>
                                                        <p className="font-medium">{chat.receiverId.firstName} {chat.receiverId.lastName}</p>
                                                        <p className="text-xs">{chat.content}</p>
                                                    </div>
                                                </div>
                                                <span className='text-xs'>{new Date(chat.timestamp).toLocaleTimeString()}</span>
                                            </Link>
                                        )
                                    ))
                                )
                        ) :
                        (
                            <p className="p-4">No chat record.</p>
                        )}
                </div>

                <ChatContext.Provider value={{ chats, setChats }}>
                    {outlet || (
                        <div className="flex-grow flex items-center justify-center">
                            <img src={placeholderImage} alt="Placeholder" className="w-full max-h-full p-3" />
                        </div>
                    )}
                </ChatContext.Provider>
            </div>
        </div>
    );
};

const useChatContext = () => useContext(ChatContext);

export { useChatContext };
export default ChatLayout;