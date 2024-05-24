import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import { toast } from 'react-hot-toast';

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
        });

        return () => {
            socket.off("message");
        };
    }, [socket]);

    useEffect(() => {
        fetchChatHistory();
        if (socket) {
            socket.emit("joinRoom", { roomId: room });
        }
    }, [socket, room]);

    const handleMessageSend = () => {
        if (!messageInput.trim()) return;
        socket.emit("message", { roomId: room, senderId: userId, receiverId, content: messageInput });
        setMessageInput('');
    };

    if (!isAuthorized) {
        return null;
    }

    return (
        <div className="flex flex-col h-[80vh] mt-10">
            <div className='border-b pb-3 flex gap-x-2 items-center'>
                <img src={`${URL}/public/images/${receiverData.profileUrl}`} alt="img" className='w-20 h-20 rounded-full object-cover' />
                <h3 className="text-xl font-semibold mb-4">Chatting with {receiverData.firstName} <Link to={`/${receiverData.username}`}>(@{receiverData.username})</Link></h3>

            </div>
            <div className="flex-grow overflow-y-auto p-4 mt-2">
                <div className="space-y-2">
                    {messages.map((message, index) => (
                        <>
                            {
                                message.senderId === currentUserId ? (
                                    <div class="flex justify-end" key={index}>
                                        <div class="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
                                            <p>{message.content}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div class="flex" key={index}>
                                        <div class="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
                                            <p>{message.content}</p>
                                        </div>
                                    </div>
                                )
                            }

                        </>
                    ))}
                </div>
            </div>
            <div class="bg-gray-50 rounded-md p-4 flex items-center">
                <input type="text" placeholder="Type your message..." class="flex-1 border rounded-full px-4 py-2 focus:outline-none" value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)} />
                <button class="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none" onClick={handleMessageSend}>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459C5.42338 11.9738 5.42321 12.1032 5.40651 12.231C5.38768 12.375 5.34057 12.5157 5.24634 12.7972Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                </button>
            </div>
        </div>
    );
};

export default Chat;
