import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from './AuthProvider'

const GetFile = () => {
    const [fileList, setFileList] = useState([])


    const getfiles = async (e) => {
        e.preventDefault()

        try {
            const res = await axios.post('http://localhost:7001/getfile');
            setFileList(res.data)
        } catch (err) {
            console.error(err.message);

        }

    }

    return (
        <div className='file'>
            <input
                type="text"
                placeholder="Enter your code to see files"
                value={fileList}
                onChange={(e) => setFileList(e.target.value)}
            />
            <button onClick={getfiles}>Get Files</button>
            <ul>
                {fileList.map((file) => (
                    <li key={file._id}>
                        {file.filename} - <a href={`http://localhost:7001/${file.filepath}`}>Download</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default GetFile