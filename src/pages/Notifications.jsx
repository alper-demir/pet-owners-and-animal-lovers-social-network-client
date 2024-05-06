import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import calculateTimeAgo from './../helpers/calculateTimeAgo';
import { Link } from 'react-router-dom';
import loadingGIF from "../asset/loading.gif"

const Notifications = () => {

  const URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem("token");
  const receiverId = useSelector(state => state.user.user.userId);

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getRequests();
  }, [])


  const getRequests = async () => {
    setLoading(true)
    try {
      const requests = await axios.get(`${URL}/follow-requests/${receiverId}`);
      if (requests) {
        setRequests(requests.data);
        console.log(requests);
        setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAccept = async (requestId) => {
    try {
      await axios.put(`${URL}/accept-follow-request/${requestId}`, {}, { headers: { Authorization: token } });
      // Update notifications after accepting the request
      getRequests();
    } catch (error) {
      console.log(error);
    }
  }

  const handleReject = async (requestId) => {
    try {
      await axios.put(`${URL}/reject-follow-request/${requestId}`, {}, { headers: { Authorization: token } });
      // Update notifications after rejecting request
      getRequests();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {
        loading ? (
          <div className='flex justify-center mt-10'>
            <img src={loadingGIF} alt="" className='w-20 h-20' />
          </div>
        ) :
          (
            <div>
              <div className='mt-3 mb-5 text-center text-lg max-sm:text-base font-bold dark:text-white'>
                <h3>Notifications {requests.length > 0 && <>({requests.length})</>}</h3>
              </div>
              {
                requests.length > 0 ? (
                  requests.map(request => (
                    <div key={request._id} className='flex justify-between mt-2 dark:text-white'>
                      <Link to={`/${request.senderId.username}`} className='flex gap-x-1 items-center'>
                        <div>
                          <img src={`${URL}/public/images/${request.senderId.profileUrl}`} alt="img" className='w-9 h-9 rounded-full object-cover min-w-9 min-h-9' />
                        </div>
                        <div className='flex flex-col'>
                          <span>@{request.senderId.username} wants to follow you</span> <span className='text-[#A7A7A7] dark:text-[#777777] text-xs'>{calculateTimeAgo(request.createdAt)}</span>
                        </div>
                      </Link>
                      <div className='flex gap-x-2 max-sm:gap-x-1 text-sm max-sm:text-xs text-white'>
                        <button onClick={() => handleAccept(request._id)} className='rounded-lg px-4 bg-blue-500 max-sm:px-2 hover:bg-blue-600'>Accept</button>
                        <button onClick={() => handleReject(request._id)} className='rounded-lg px-4 bg-red-500 max-sm:px-2 hover:bg-red-600'>Reject</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className='text-center mt-10 bg-gray-100 rounded-md p-3 text-black dark:text-white dark:bg-[#161616] font-bold'>
                    <span>No notifications</span>
                  </div>
                )

              }

            </div>
          )
      }
    </>
  )
}

export default Notifications
