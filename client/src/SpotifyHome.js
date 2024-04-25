import React from 'react'
import Search from './Search'
import {useState ,useEffect} from 'react';
import Post from './Blog-components/components/Post';
import FeedContainer from './Blog-components/components/FeedContainer'
import Header from './Blog-components/components/Header';
import axios from "axios";
import {motion} from 'framer-motion'

function SpotifyHome({user, Comments, setComments}) {

  const [spotifyToken, setSpotifyToken] = useState(null);
  const clientId = process.env.REACT_APP_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_CLIENT_SECRET;

useEffect(()=> {
  //API SPOTIFY
  const requestSpotifyToken = async() => {
    try{
      delete axios.defaults.headers.common["Authorization"];
      const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        { 
          grant_type: 'client_credentials', 
          client_id: clientId,
          client_secret: clientSecret,
        }, 
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }        
      )
      setSpotifyToken(response.data.access_token);
    } catch(e){
      console.log(e)
  }
  }
  requestSpotifyToken();

  }, [])

  const [payload, setPayload] = useState({
    username: '',
    dateFormatted: '',
    dateRaw: '',
    albumImage: '',
    albumName: '',
    artistName: '',
    textBody: ''
  })

  return (
    <motion.div  initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}    transition={{ duration: 1.15 }} >


  <main className="bg-[rgb(1,78,1)] text-white h-screen overflow-x-hidden z-0">
  <div class="flex flex-col items-center bg-[rgb(1,78,1)]">
    <Header />
    <Search spotifyToken={spotifyToken} setPayload={setPayload} payload={payload}/>
    <FeedContainer feed={Comments} />
  </div>
  </main>
  </motion.div>
  )
}

export default SpotifyHome