import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import loadingGIF from "../../../asset/loading.gif"

const Followings = ({ openFollowingsModal, setOpenFollowingsModal, profileId }) => {

  const [followings, setFollowings] = useState([])
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setOpen(false)
    setOpenFollowingsModal(false)
  };

  useEffect(() => {
    setOpen(openFollowingsModal);
    getFollowingList();
  }, [])

  const token = localStorage.getItem("token");
  const URL = process.env.REACT_APP_BASE_URL;

  const getFollowingList = async () => {
    setLoading(true)
    try {
      const followings = await axios.post(`${URL}/followings/${profileId}`, {}, { headers: { Authorization: token } });
      if (followings) {
        setFollowings(followings.data.followings)
        console.log(followings.data);
        setLoading(false)
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false)
    }
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5 max-xl:w-3/5 max-md:w-4/5 max-sm:w-[95%] max-sm:text-xs p-6 bg-white dark:bg-[#101010] dark:text-white rounded-md overflow-y-auto max-h-[85%] outline-none">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Followings
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} >
            {
              loading ? (
                <div className='flex justify-center items-center'><img src={loadingGIF} alt="Loading.." className='w-10 h-10' /></div>
              ) :
                (
                  <div>
                    {
                      followings &&
                      followings.map((following, index) => (
                        <div className="flex gap-x-2 items-center my-1 text-[15px] max-sm:text-xs max-lg:text-sm border-b py-2 border-gray-200 dark:border-opacity-20" key={index}>
                          <div>
                            <Link to={`/${following.username}`} onClick={handleClose}>
                              <img src={`${URL}/public/images/${following.profileUrl}`} alt="img" className='min-w-[36px] h-9 w-9 object-cover rounded-full' />
                            </Link>
                          </div>
                          <div className="flex flex-col">
                            <Link to={`/${following.username}`} onClick={handleClose}>{following.firstName + " " + following.lastName}</Link>
                            <Link to={`/${following.username}`} onClick={handleClose}>@{following.username}</Link>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )
            }
          </Typography>
        </Box>


      </Modal>
    </div>
  )
}

export default Followings