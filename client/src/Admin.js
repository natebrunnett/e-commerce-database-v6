import React from 'react'
import axios from 'axios'
import URL from './Config'


function Admin() {

    let MakeSomethingHappenInServer= async () => {
     try {
        await axios.post(URL + '/users/debug', {})
     } catch (error) {
        console.log(error)
     }
    }


  return (
    <>
    <button onClick={() => MakeSomethingHappenInServer()}>Debug</button>
    </>
  )
}

export default Admin