import React from 'react'

function Result({item, idx, payload, setPayload, testList, }) {
    // const HandleSearchContainer = (idx) => {
    //     console.log(testList[idx]);
    //     setPayload({...payload,
    //         albumImage: testList[idx].images[0].url,
    //         albumName: testList[idx].name,
    //         artistName: testList[idx].artists[0].name
    //     })
    // }
  console.log(item)
  return (
    <>
    <div className="hover:bg-white hover:bg-opacity-50 w-full flex items-center justify-between snap-start" key={idx}>
          <p className="w-32">{item.name}</p>
          <p className="w-32 overflow-y-hidden max-h-12 py-1">{item.name}</p>
          <p className="w-32 ">{item.release_date}</p>
          {item.images.length > 0 && <img className="w-16" src={item.images[0].url}/>}
    </div>
    </>
  )
}

export default Result