import React from 'react'
import Search from '../components/Search'
import {useState ,useEffect} from 'react';
import Post from '../components/Post';
import FeedContainer from '../components/FeedContainer'
import Header from '../components/Header';
import axios from "axios";

function MusicPage({user, feed, setFeed}) {

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
  <main className="bg-[rgb(1,78,1)] text-white h-screen overflow-x-hidden z-0">
  <div class="flex flex-col items-center bg-[rgb(1,78,1)]">
    <Header />
    <Search spotifyToken={spotifyToken} setPayload={setPayload} payload={payload}/>
    <Post payload={payload} user={user} setPayload={setPayload} setFeed={setFeed}/>
    <FeedContainer feed={feed} />
  </div>
  </main>
  )
}

export default MusicPage