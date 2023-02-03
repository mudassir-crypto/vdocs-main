import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '../../components/Header'
import DStorage from '../../abis/DStorage.json'
import { convertBytes } from "../../components/helpers"
import moment from "moment/moment"
import {SearchIcon} from "@heroicons/react/outline"
import Web3 from 'web3'
import { useStateContext } from '../../context/ContextProvider'
import { useNavigate, useParams } from 'react-router-dom'

function Dashboard() {
  const [files, setFiles] = useState([])
  const [student, setStudent] = useState({})
  const [metamask, setMetamask] = useState("")

  const { user } = useStateContext()

  const navigate = useNavigate()

  const { userId } = useParams()
    
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userInfo"))
    if(!user){
        navigate('/login')
    }
    //console.log(user.role)
    if(user && user.role !== "admin"){
        navigate('/dashboard')
    }

    fetchUserById(token, userId)

    
  }, [user, userId])

  
    const fetchUserById = async (token, id) => {
        
        try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
            const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/user/${id}`, config)
            setStudent(data.user)
            console.log(data.user)
            if(data.user.metamask){
                await loadData(data.user.metamask)
            }   
        } catch (error) {
        console.log(error.response.data.message)
        }
    }

    const loadData = async (metamask) => {
        let web3 = new Web3(Web3.givenProvider)
        //console.log(web3)
        //const networkId = await web3.eth.net.getId()
        const networkData = DStorage.networks['5777']
        //console.log(`networkId: ${networkId}, networkData: ${networkData}`)
        const dstorageCopy = new web3.eth.Contract(DStorage.abi, networkData.address)
        //console.log(dstorageCopy)
        const filesCount = await dstorageCopy.methods.fileCount().call()

        let arr = []
        for(let i = 1; i <= filesCount; i++){
            const file = await dstorageCopy.methods.getFiles(i).call()
            //console.log(file.uploader, account)
            if(file.uploader.toLowerCase() === metamask.toLowerCase()){
                arr.push(file)
            }
        }
        setFiles(arr)
    }
  
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
                            {moment.unix(item.uploadTime).format('h:mm:ss A M/D/Y')}
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
    </div>
  )
}

export default Dashboard
