import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from './AuthProvider'
import { useNavigate } from 'react-router'

const FileUpload = () => {
    const navigate=useNavigate()
    const [file, setFile] = useState(null)
  
    const {getTokenInLS}=useAuth()

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const onFileUpload = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('file', file);
        try {
            const token=getTokenInLS('token')
            const res = await axios.post('http://localhost:7001/upload', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            alert(`uploaded ${res.data.code}`)
            navigate('/getfile')
        } catch (err) {
            console.error(err.message);
    
        }

    }

    return (
        <div className='file'>
            <h2>File Upload</h2>
            <form action='/upload' enctype="multipart/form-data">
            <input  type="file" onChange={onFileChange} />
            <button onClick={onFileUpload}>Upload</button>
            </form>
            {/* <p>{message}</p>
            {code && <p>Your 6-digit code is: {code}</p>} */}

        </div>
    )
}

export default FileUpload