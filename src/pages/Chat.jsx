import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import loadingGIF from "../asset/loading.gif"
import { FaListUl } from "react-icons/fa6";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [socket, setSocket] = useState(null);
    const [userId, setUserId] = useState("");
    const [receiverId, setReceiverId] = useState("");
    const [room, setRoom] = useState("");
    const { roomId } = useParams();
    const [receiverData, setReceiverData] = useState({});
    const currentUserId = useSelector(state => state.user.user.userId);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [chats, setChats] = useState([]);
    const [loadingChat, setLoadingChat] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const URL = process.env.REACT_APP_BASE_URL
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAccess = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/verify-chat-access/${roomId}/${currentUserId}`);
                if (response.data.success) {
                    setIsAuthorized(true);
                } else {
                    toast.error("Your access denied!", { duration: 4000 })
                    navigate('/');
                }
            } catch (error) {
                console.error('Error verifying access:', error);
                navigate('/');
            }
        };

        verifyAccess();
    }, [roomId, currentUserId, navigate]);

    const fetchChatHistory = async () => {

        const roomIdParts = roomId.split("-");
        const firstPart = roomIdParts[0];
        const secondPart = roomIdParts[1];
        if (firstPart === currentUserId) {
            setUserId(firstPart);
            setReceiverId(secondPart);
            fetchReceiverData(secondPart)
        } else {
            setUserId(secondPart);
            setReceiverId(firstPart);
            fetchReceiverData(firstPart)
        }

        const room = firstPart < secondPart ? `${firstPart}-${secondPart}` : `${secondPart}-${firstPart}`;
        setRoom(room);

        try {
            const response = await axios.get(`${URL}/chat-history/${room}`);
            if (response.data.success) {
                setMessages(response.data.chatHistory);
            } else {
                console.error('Failed to fetch chat history');
            }
        } catch (error) {
            console.error('Error fetching chat history:', error);
        }
    };

    const fetchChats = async () => {
        try {
            setLoadingChat(true)
            const chatsData = await axios.get(`${URL}/user-chats/${userId}`);
            setChats(chatsData.data);
            console.log(chatsData.data);
        } catch (error) {
            // toast.error(error.message);
        }
        setLoadingChat(false)
    }

    const fetchReceiverData = async (id) => {
        try {
            const receiverData = await axios.get(`${URL}/userbyid/${id}`);
            setReceiverData(receiverData.data);
            console.log(receiverData.data);
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(() => {

        const newSocket = io(process.env.REACT_APP_BASE_URL);
        setSocket(newSocket);

        return () => newSocket.close();
    }, [roomId, currentUserId]);

    useEffect(() => {
        if (!socket) return;

        socket.on("message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
            fetchChats();
            console.log(message);
        });

        return () => {
            socket.off("message");
        };
    }, [socket]);

    useEffect(() => {
        fetchChats();
        handleClose();
        fetchChatHistory();
        if (socket) {
            socket.emit("joinRoom", { roomId: room });
        }
    }, [socket, room]);

    const handleMessageSend = () => {
        fetchChats();
        if (!messageInput.trim()) return;
        socket.emit("message", { roomId: room, senderId: userId, receiverId, content: messageInput });
        setMessageInput('');
    };

    if (!isAuthorized) {
        return null;
    }

    return (
        <div className="flex h-[85vh] max-sm:h-[80vh] border rounded-md dark:border-opacity-20 border-gray-200">
            <div className="border-r dark:border-opacity-20 border-gray-200 overflow-y-auto dark:text-[#f1f1f1] max-sm:hidden">
                <h2 className="text-xl text-center font-semibold border-b dark:border-opacity-20 border-gray-200 py-3">Chats</h2>
                {chats ? (
                    loadingChat ? (<div className='flex justify-center'><img src={loadingGIF} alt="loading" className='w-10 h-10' /></div>) :
                        (chats.map((chat, index) => (

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

                        )
                        ))
                ) : (
                    <p>No chats available</p>
                )}
            </div>
            <div className="flex-grow">
                <div className="flex flex-col h-full">
                    <div className="dark:text-[#f1f1f1] flex border-b dark:border-opacity-20 border-gray-200 items-center justify-between pr-5">
                        <div className='flex gap-x-2 items-center p-4'>
                            <img src={`${URL}/public/images/${receiverData.profileUrl}`} alt="img" className='w-20 h-20 rounded-full object-cover max-sm:h-14 max-sm:w-14' />
                            <h3 className="text-xl font-semibold max-sm:text-base pr-2">Chatting with {receiverData.firstName} <Link to={`/${receiverData.username}`}>(@{receiverData.username})</Link></h3>
                        </div>
                        <div className='hidden max-sm:block'>
                            {/* open chat modal */}
                            <FaListUl className='text-2xl cursor-pointer' onClick={() => setOpen(true)} />
                        </div>
                    </div>
                    <div className="flex-grow overflow-y-auto p-4 mt-2 dark:text-[#dbd5d5]">
                        <div className="space-y-2">
                            {messages.map((message, index) => (
                                <div key={index}>
                                    {message.senderId === currentUserId ? (
                                        <div className="flex justify-end">
                                            <div className="flex flex-col">
                                                <div className="bg-blue-200 p-2 rounded-lg max-w-xs dark:bg-indigo-700">
                                                    <p>{message.content}</p>
                                                </div>
                                                <div className="text-end text-xs">
                                                    <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex">
                                            <div className="flex flex-col">
                                                <div className="bg-gray-300 p-2 rounded-lg max-w-xs dark:bg-sky-700">
                                                    <p>{message.content}</p>
                                                </div>
                                                <div className="text-xs">
                                                    <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-gray-50 rounded-md p-4 flex items-center dark:bg-[#161616] dark:text-[#f1f1f1]">
                        <input
                            type="text"
                            placeholder="Type your message..."
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 dark:bg-[#272727]"
                        />
                        <button class="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none" onClick={handleMessageSend}>
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        </button>
                    </div>
                </div>
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
        </div>
    );
};

export default Chat;
