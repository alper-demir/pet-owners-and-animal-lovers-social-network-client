import { Link, useOutlet } from "react-router-dom";
import loadingGIF from "../asset/loading.gif";
import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { FaListUl } from "react-icons/fa6";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "../pages/chat.css"

const ChatContext = createContext();

const ChatLayout = () => {
    const [chats, setChats] = useState([]);
    const [loadingChat, setLoadingChat] = useState(false);
    const { userId } = useSelector(state => state.user.user);
    const URL = process.env.REACT_APP_BASE_URL;
    const outlet = useOutlet();
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);
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

    useEffect(() => {
        handleClose();
    }, [window.location.pathname]);


    return (
        <div>
            <div className="flex h-[85vh] max-sm:h-[80vh] border rounded-md dark:border-opacity-20 border-gray-200">
                <div className="border-r dark:border-opacity-20 border-gray-200 overflow-y-auto dark:text-[#f1f1f1] max-sm:hidden min-w-[186px] overflow-x-hidden">
                    <Link to="/chat" className="text-xl flex justify-center items-center font-semibold border-b dark:border-opacity-20 border-gray-200 h-[113px]">Chats</Link>
                    {chats.length > 0 ?
                        (
                            loadingChat ?
                                (
                                    <div className='flex justify-center'><img src={loadingGIF} alt="loading" className='w-10 h-10' /></div>
                                ) :
                                (
                                    chats.map((chat, index) => (
                                        chat.receiverId._id === userId ?
                                            (
                                                chat.read === false ? (
                                                    <>
                                                        <Link to={`/chat/${chat.roomId}`} key={index} className="block p-4 hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] border-b dark:border-opacity-20 border-gray-200 bg-red-300" >
                                                            <div className="flex items-center space-x-2 max-sm:flex-col max-sm:text-center max-sm:space-x-0">
                                                                <img src={`${URL}/public/images/${chat.senderId.profileUrl}`} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                                                                <div>
                                                                    <p className="font-medium">{chat.senderId.firstName} {chat.senderId.lastName}</p>
                                                                    <p className="text-xs max-w-24 overflow-hidden text-ellipsis" title={chat.content}>{chat.content}</p>
                                                                </div>
                                                            </div>
                                                            <span className='text-xs'>{new Date(chat.timestamp).toLocaleTimeString()}</span>
                                                        </Link>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Link to={`/chat/${chat.roomId}`} key={index} className="block p-4 hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] border-b dark:border-opacity-20 border-gray-200" >
                                                            <div className="flex items-center space-x-2 max-sm:flex-col max-sm:text-center max-sm:space-x-0">
                                                                <img src={`${URL}/public/images/${chat.senderId.profileUrl}`} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                                                                <div>
                                                                    <p className="font-medium">{chat.senderId.firstName} {chat.senderId.lastName}</p>
                                                                    <p className="text-xs max-w-24 overflow-hidden text-ellipsis" title={chat.content}>{chat.content}</p>
                                                                </div>
                                                            </div>
                                                            <span className='text-xs'>{new Date(chat.timestamp).toLocaleTimeString()}</span>
                                                        </Link>
                                                    </>
                                                )
                                            ) : (
                                                <Link to={`/chat/${chat.roomId}`} key={index} className="block p-4 hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] border-b dark:border-opacity-20 border-gray-200">
                                                    <div className="flex items-center space-x-2 max-sm:flex-col max-sm:text-center max-sm:space-x-0">
                                                        <img src={`${URL}/public/images/${chat.receiverId.profileUrl}`} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                                                        <div>
                                                            <p className="font-medium">{chat.receiverId.firstName} {chat.receiverId.lastName}</p>
                                                            <p className="text-xs max-w-24 overflow-hidden text-ellipsis" title={chat.content}>{chat.content}</p>
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
                        <div className="bg-img w-full dark:text-[#f1f1f1]">
                            <div className='hidden max-sm:block overflow-hidden break-all'>
                                {chats ? (
                                    loadingChat ? (<div className='flex justify-center'><img src={loadingGIF} alt="loading" className='w-10 h-10' /></div>) :
                                        (chats.map((chat, index) => (

                                            chat.receiverId._id === userId ? (
                                                <Link to={`/chat/${chat.roomId}`} key={index} className="block p-3 hover:bg-[#F7F7F7] dark:hover:bg-[#161616] border-b border-gray-200 dark:border-opacity-20">
                                                    <div className="flex items-center space-x-2">
                                                        <img src={`${URL}/public/images/${chat.senderId.profileUrl}`} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                                                        <div>
                                                            <p className="font-medium">{chat.senderId.firstName} {chat.senderId.lastName}</p>
                                                            <p className="text-xs">{chat.content}</p>
                                                        </div>
                                                    </div>
                                                    <span className='text-xs'>{new Date(chat.timestamp).toLocaleTimeString()}</span>
                                                </Link>
                                            ) : (
                                                <Link to={`/chat/${chat.roomId}`} key={index} className="block p-3 hover:bg-[#F7F7F7] dark:hover:bg-[#161616] border-b border-gray-200 dark:border-opacity-20">
                                                    <div className="flex items-center space-x-2">
                                                        <img src={`${URL}/public/images/${chat.receiverId.profileUrl}`} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                                                        <div>
                                                            <p className="font-medium">{chat.receiverId.firstName} {chat.receiverId.lastName}</p>
                                                            <p className="text-xs">{chat.content}</p>
                                                        </div>
                                                    </div>
                                                    <span className='text-xs'>{new Date(chat.timestamp).toLocaleTimeString()}</span>
                                                </Link>
                                            )

                                        )
                                        ))
                                ) : (
                                    <p>No chats available</p>
                                )}
                            </div>
                        </div>
                    )}
                </ChatContext.Provider>
            </div>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 max-xl:w-3/5 max-md:w-4/5 max-sm:w-[90%] max-sm:text-xs p-6 bg-white dark:bg-[#101010] dark:text-white rounded-md overflow-y-auto max-h-[85%] outline-none">
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Chats
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} >
                        {chats ? (
                            loadingChat ? (<div className='flex justify-center'><img src={loadingGIF} alt="loading" className='w-10 h-10' /></div>) :
                                (chats.map((chat, index) => (

                                    chat.receiverId._id === userId ? (
                                        <Link to={`/chat/${chat.roomId}`} key={index} className="block p-3 hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] border-b">
                                            <div className="flex items-center space-x-2">
                                                <img src={`${URL}/public/images/${chat.senderId.profileUrl}`} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                                                <div>
                                                    <p className="font-medium">{chat.senderId.firstName} {chat.senderId.lastName}</p>
                                                    <p className="text-xs">{chat.content}</p>
                                                </div>
                                            </div>
                                            <span className='text-xs'>{new Date(chat.timestamp).toLocaleTimeString()}</span>
                                        </Link>
                                    ) : (
                                        <Link to={`/chat/${chat.roomId}`} key={index} className="block p-3 hover:bg-[#F5F5F5] dark:hover:bg-[#1C1C1C] border-b">
                                            <div className="flex items-center space-x-2">
                                                <img src={`${URL}/public/images/${chat.receiverId.profileUrl}`} alt="profile" className="w-10 h-10 rounded-full object-cover" />
                                                <div>
                                                    <p className="font-medium">{chat.receiverId.firstName} {chat.receiverId.lastName}</p>
                                                    <p className="text-xs">{chat.content}</p>
                                                </div>
                                            </div>
                                            <span className='text-xs'>{new Date(chat.timestamp).toLocaleTimeString()}</span>
                                        </Link>
                                    )

                                )
                                ))
                        ) : (
                            <p>No chats available</p>
                        )}
                    </Typography>
                </Box>


            </Modal>

        </div >
    );
};

const useChatContext = () => useContext(ChatContext);

export { useChatContext };
export default ChatLayout;