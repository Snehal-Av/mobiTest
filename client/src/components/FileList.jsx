import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const GetFile = () => {
    // const { fileId, code } = useParams()
    const navigate = useNavigate()
    const [fileList, setFileList] = useState([])

    const { getTokenInLS } = useAuth()

    const getfiles = async () => {
        try {
            const token = getTokenInLS('token')
            await axios.get('http://localhost:7001/getfile', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }).then((res) => {
                setFileList(res.data)
            })
        } catch (error) {
            console.log(error);
        }
    }
    const deleteFile = async (fileId) => {
        try {
            const token = getTokenInLS('token')
            await axios.delete(`http://localhost:7001/removefile/${fileId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            }).then((res) => {
                setFileList(fileList.filter(file=>file._id !==fileId))
                console.log(res.data);

                navigate('/getlist')
            })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getfiles()
    }, [])

    return (
        <div className='file'>
            <table class="table">
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">File Name</th>
                    <th scope="col">Download</th>
                    <th scope="col">Delete</th>
                </tr>
                {
                    fileList.map((file,i) => {
                        return (
                            <>
                                <tr>
                                    <th>{i+1}</th>
                                    <td>{file.filename}</td>
                                    <td><p><Link to={`/download/${file._id}`}>Download</Link></p></td>
                                    <td><button onClick={()=>deleteFile(file._id)}>Delete</button></td>
                                </tr>
                            </>
                        )
                    })
                }
            </table>
            
        </div>
    )
}

export default GetFile