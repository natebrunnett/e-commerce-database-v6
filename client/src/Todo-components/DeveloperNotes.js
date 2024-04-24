import React, {useState} from 'react'

function DeveloperNotes() {

    const [open, setOpen] = useState(false);

    return (
        <div className='flex flex-row relative right-60 ml-24'>
            <button className='absolute top-3' onClick={() => setOpen(!open)}>ℹ️</button>
            {open && <p className='text-white w-96 text-sm mt-2 ml-1 absolute left-7 top-0'>To-dos will be stored in the brower's Local Storage for up to 365 days unless you use an online database 😉</p>}
        </div>
    )
}

export default DeveloperNotes