
import React from "react";
import axios from "axios";
import {useState} from "react";
import Result from "./Blog-components/components/Result";

let Search=({spotifyToken, payload, setPayload})=>{
      
  const [testList, setList] = useState([]);
  const [searchInput, setInput] = useState('');
      
  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`,
      {
        headers: {
          Authorization : `Bearer ${spotifyToken}`,
        }
      })
      console.log(response);
      if(response.status === 200){
        setList(response.data.artists.items)
      }

    } catch (error) {
      console.log(error)
    }
  }
      
 return(
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-2xl">Search the Spotify db</h1>
        <button>"artist"</button>
        <form onChange={handleSearch}>
          <input 
            className="text-black rounded-xl pl-2 h-7 mb-2 w-96" 
            value={searchInput}
            placeholder="ex. 'electronic' for artists related to electronic" 
            onChange={(e) => setInput(e.target.value)}/>
        </form>

        {(testList.length > 0) &&
        <div className="mx-2 h-64 overflow-y-auto bg-[rgb(8,41,8)] rounded-xl pl-2 snap-y snap-mandatory">
        {testList.map((item, idx) => {
        return(
          <Result item={item} idx={idx} payload={payload} setPayload={setPayload} testList={testList}/>
        )})}
        {/*Search Results */}
            </div>
        }
        </div>
)

}

export default Search
