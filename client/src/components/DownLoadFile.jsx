import axios from 'axios'
import React, { useState } from 'react'

const DownLoadFile = () => {
    
    
    const [code,setCode]=useState('')
    const handleDownload=async()=>{
        try {
          const res=await axios.get(`http://localhost:7001/download/${code}`,{
            responseType: 'blob' 
          })
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file');
          document.body.appendChild(link);
          link.click();
        } catch (error) {
            alert('Invalid code or file not found');
        }
    }
  return (
    <div className='download'>
      <input type="text" placeholder="6-digit code" onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleDownload}>Download</button>
    </div>
  )
}

export default DownLoadFile