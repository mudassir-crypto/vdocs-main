import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import DStorage from '../../abis/DStorage.json'
import { convertBytes } from "../../components/helpers"
import moment from "moment/moment"
import Web3 from 'web3'
import { useStateContext } from '../../context/ContextProvider'
import { useNavigate, useParams } from 'react-router-dom'

function Dashboard() {
  const [files, setFiles] = useState([])
  const [student, setStudent] = useState({})

  const { user } = useStateContext()

  const navigate = useNavigate()

  const { userId } = useParams()
    
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("userInfo"))
    if(!user){
        navigate('/login')
    }
    
    if(user && user.role !== "admin"){
        navigate('/dashboard')
    }

    fetchUserById(token, userId)

    
  }, [user, userId])

  console.log(student)
    const fetchUserById = async (token, id) => {
        
        try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/${id}`, config)
            
            setStudent(data.user)
            
            if(data.user.metamask){
                await loadData(data.user.metamask)
            }   
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    const loadData = async (metamask) => {
        let web3 = new Web3(Web3.givenProvider)
       
        const networkData = DStorage.networks['5777']
        
        const dstorageCopy = new web3.eth.Contract(DStorage.abi, networkData.address)
        
        const filesCount = await dstorageCopy.methods.fileCount().call()

        let arr = []
        for(let i = 1; i <= filesCount; i++){
            const file = await dstorageCopy.methods.getFiles(i).call()
            if(file.uploader.toLowerCase() === metamask.toLowerCase()){
                arr.push(file)
            }
        }
        setFiles(arr)
    }

    const verifyStatus = async (statusType) => {
        const token = JSON.parse(sessionStorage.getItem("userInfo"))
        let improperDocuments = "";
        if (statusType === "rejected") {
            improperDocuments = prompt("Enter reason for rejection:");
        }
        try {
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
          const { data } = await axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/verifyStudent/${student._id}`, { status: statusType, improperDocuments}, config)
  
          navigate("/admin/dashboard")
        } catch (error) {
          console.log(error.response.data.message)
        }
    }
  
    const btnHide = student.status === "verified" || student.status === "rejected" || student.isVerified === true
  return (
    <div>
      <Header admin="dashboard"/>

      <div className='max-w-7xl mx-auto mt-6 md:mt-12 p-3'>
            <div className='bg-amazon_blue text-default max-w-7xl mx-auto'> 
                <div className='border-b-2 border-default p-4 flex items-center'>
                    <p className='text-3xl mr-20'>Documents of {student.name} </p>
                </div> 
            </div>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Id
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Size
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            hash/view/get
                        </th>
                        <th scope="col" className="px-6 py-3">
                            uploader
                        </th>
                    </tr>
                </thead>
                <tbody>
                {files.map((item, idx) => (
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={idx}>
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {/* {item.fileId} */}
                            {idx+1}
                        </th>
                        <td className="px-6 py-4">
                            {item.fileName}
                        </td>
                        <td className="px-6 py-4">
                            {item.fileDescription}
                        </td>
                        <td className="px-6 py-4">
                            {item.fileType}
                        </td>
                        <td className="px-6 py-4">
                            {convertBytes(item.fileSize)}
                        </td>
                        <td className="px-6 py-4">
                            {moment.unix(item.uploadTime).format('h:mm:ss A D/M/Y')}
                        </td>
                        <td className="px-6 py-4">
                        <a target="_blank" rel="noreferrer"
                            href={`https://${item.fileHash}.ipfs.w3s.link/${item.fileName}`}
                        >
                            {item.fileHash}
                        </a>
                        </td>
                        <td className="px-6 py-4">
                            <a
                                href={"https://etherscan.io/address/" + item.uploader}
                                rel="noopener noreferrer"
                                target="_blank">
                                {item.uploader.substring(0,10)}...
                            </a>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
      </div>
      
      {student?.status === "pending" && (
        <div className={`flex flex-row max-w-3xl space-x-5 mx-auto items-center justify-center ${btnHide ? "hidden" : ""}`}>
            <button className='bg-default text-amazon_blue w-full p-3 mt-3 text-xl rounded-lg font-bold' onClick={() => verifyStatus("verified")}>Accept Verification</button>
            <button className='bg-default text-amazon_blue w-full p-3 mt-3 text-xl rounded-lg font-bold' onClick={() => verifyStatus("rejected")}>Reject Verification</button>
        </div>
      )}
        
    </div>
  )
}

export default Dashboard
