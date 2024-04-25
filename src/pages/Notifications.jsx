import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import calculateTimeAgo from './../helpers/calculateTimeAgo';

const Notifications = () => {

  const URL = "http://localhost:3001"
  const token = localStorage.getItem("token");
  const receiverId = useSelector(state => state.user.user.userId);

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    getRequests();
  }, [])


  const getRequests = async () => {
    try {
      const requests = await axios.get(`${URL}/follow-requests/${receiverId}`);
      if (requests) {
        setRequests(requests.data);
        console.log(requests);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAccept = async (requestId) => {
    try {
      await axios.put(`${URL}/accept-follow-request/${requestId}`, {}, { headers: { Authorization: token } });
      // İsteği kabul ettikten sonra bildirimleri güncelle
      getRequests();
    } catch (error) {
      console.log(error);
    }
  }

  const handleReject = async (requestId) => {
    try {
      await axios.put(`${URL}/reject-follow-request/${requestId}`, {}, { headers: { Authorization: token } });
      // İsteği reddettikten sonra bildirimleri güncelle
      getRequests();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {
        requests.length > 0 ? (
          requests.map(request => (
            <div key={request._id} className='flex justify-between mt-2 dark:text-white'>
              <div className='flex gap-x-1 items-center'>
                <div>
                  <img src={`${URL}/public/images/${request.senderId.profileUrl}`} alt="img" className='w-9 h-9 rounded-full object-cover min-w-9 min-h-9' />
                </div>
                <div className='flex flex-col'>
                  <span>@{request.senderId.username} wants to follow you</span> <span className='text-[#A7A7A7] dark:text-[#777777] text-xs'>{calculateTimeAgo(request.createdAt)}</span>
                </div>
              </div>
              <div className='flex gap-x-2 max-sm:gap-x-1 text-sm max-sm:text-xs text-white'>
                <button onClick={() => handleAccept(request._id)} className='rounded-lg px-4 bg-blue-400 max-sm:px-2 hover:bg-blue-600'>Accept</button>
                <button onClick={() => handleReject(request._id)} className='rounded-lg px-4 bg-gray-400 max-sm:px-2 hover:bg-gray-600'>Reject</button>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center mt-10 bg-blue-300 rounded-md p-3 text-white'>No notifications</div>
        )

      }

    </div>
  )
}

export default Notifications
