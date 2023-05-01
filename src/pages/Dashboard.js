import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Header from '../components/Header'
import Web3 from "web3"
import moment from "moment/moment"
import DStorage from '../abis/DStorage.json'
import { Web3Storage } from 'web3.storage'
import { convertBytes } from "../components/helpers"
import { useStateContext } from "../context/ContextProvider"
import axios from "axios"
import Loader from "../components/Loader"
import { ToastContainer, toast } from 'react-toastify'
import { Document, Page } from 'react-pdf';


// import { Mailer } from 'nodemailer-react'

const Dashboard = () => {
    
    const [loading, setLoading] = useState(false)
    const [dstorage, setDstorage] = useState({})
    const [files, setFiles] = useState([])
    const [file, setfile] = useState([])
    const [metaError, setMetaError] = useState()
    const descriptionInput = useRef()
    const [pdfFile, setPdfFile] = useState(null);

    const navigate = useNavigate()
    const { user, account, setAccount } = useStateContext()


    useEffect(() => {
        if(sessionStorage.address){
            setAccount(JSON.parse(sessionStorage.address))
            window.web3 = new Web3(window.ethereum)
            window.web3 = new Web3(window.web3.currentProvider)
        }

        if(!user){
            navigate('/login')
        }

        if(user.role === "admin"){
            navigate('/admin/dashboard')
        }

        if(account){
            loadBlockchainData()
        }
    }, [account, user])
  
    const connect = async () => {
        if (window.ethereum) {
            try {
                const res = await window.ethereum.request({
                    method: "eth_requestAccounts",
                })
                window.web3 = new Web3(window.ethereum)
                window.web3 = new Web3(window.web3.currentProvider)
                await accountsChanged(res[0])
            } catch (err) {
                console.error(err);
                console.log("There was a problem connecting to MetaMask")
            }
        } else {
            console.log("Install MetaMask")
        }
    }

    const accountsChanged = async (newAccount) => {
        const token = JSON.parse(sessionStorage.getItem("userInfo"))
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/metamask`, { metamask: newAccount}, config)
            
            setAccount(data.account)
            sessionStorage.setItem("address", JSON.stringify(data.account))
        } catch (error) {
            //console.log(error.response.data.message)
            setMetaError(error.response.data.message)
            
        }
        
    }

    const loadBlockchainData = async () => {
        setLoading(true)
        
        const web3 = window.web3 
        
        const networkId = await web3.eth.net.getId()
        const networkData = DStorage.networks[networkId]
        
        if(networkData){

            const dstorageCopy = new web3.eth.Contract(DStorage.abi, networkData.address)
            setDstorage(dstorageCopy)
            //console.log(dstorageCopy)

            const filesCount = await dstorageCopy.methods.fileCount().call()
            
            //console.log("fileCount: ", filesCount)
            //setFileCount(filesCount)
            
            let arr = []
            for(let i = 1; i <= filesCount; i++){
                const file = await dstorageCopy.methods.getFiles(i).call()
                //console.log(file.uploader, account)
                if(file.uploader.toLowerCase() === account.toLowerCase()){
                    arr.push(file)
                }
            
            }
            setFiles(arr)
            setLoading(false)
        } else {
            setLoading(false)
            window.alert("DStorage contract not deployed to detected network")
            navigate('/')
        }
        
        //setAccount(accounts[0])

        

        //setLoading(false)
    }
    
    
    function makeStorageClient () {
        return new Web3Storage({ token: process.env.REACT_APP_TOKEN })
    }

    const uploadFile = async (description, file) => {
        setLoading(true)

        const client = makeStorageClient()
        try{
        const cid = await client.put(file)
        //const url = `https://${cid}.ipfs.w3s.link/${file[0].name}`
        await dstorage.methods.uploadFile(cid, file[0].size, file[0].type, file[0].name,description).send({ from: account })
            .on("transactionHash", (hash) => {
                console.log(hash)
                setLoading(false)
            window.location.reload()
            })
            .on("error", (e) => {
                setLoading(false)
                window.alert("Error")
            })
        
        } catch(error){
            console.log(error)
            setLoading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const description = descriptionInput.current.value 
        if(description === "") return 
        
        descriptionInput.current.value = null
        let fileExist = false
        files.forEach(data => {
            if(data.fileName === file[0].name && data.fileSize === file[0].size.toString()){
                fileExist = true
            }
        })
        if(fileExist == false)
            uploadFile(description, file)
        else
            window.alert("File with name already exists")
    }

    const fileChange = (e) => {
        if(!e.target.files) return 
        
        setfile(e.target.files)
    }

    const sendForVerification = async () => {
        const token = JSON.parse(sessionStorage.getItem("userInfo"))
        try {
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
          const { data } = await axios.patch(`${process.env.REACT_APP_API_URL}/api/v1/requestVerification`, { status: "pending"}, config)
  
          toast.success(data.message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
          })
          
          setTimeout(() => {
            window.location.reload()
          }, 3000)

        } catch (error) {
          console.log(error.response.data.message)
        }
    }

    const btnDisable = user.isVerified || user?.status === "verified" || user?.status === "pending"

    const handleClick = (i1, i2) => {
        const url =    `https://${i1}.ipfs.w3s.link/${i2}`
        const url2 = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`
        const newWindow = window.open('', '_blank');
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.width = '100%';
        iframe.height = '100%';
        iframe.style.border = 'none';
        newWindow.document.body.appendChild(iframe);
      };

   console.log(user)
 
    return (
        <div>
            <Header connectHandler={connect} /> 
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme="light"
            />
            {loading && <Loader />}
            <div className='max-w-7xl mx-auto mt-12 p-3'>
                
                {account ? (
                    <>
                    
                    <div className='bg-amazon_blue text-default max-w-3xl mx-auto'> 
                    <form onSubmit={handleSubmit}>
                        <div className='border-b-2 border-default p-5'>
                            <h4 className='text-4xl'>Add Document Here</h4>
                        </div>
                        <div className='flex flex-col items-center justify-between p-5'>
                            {/* <label htmlFor="dropzone-file" className=" w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">PDF, DOCX, JPG or PNG</p>
                                </div> */}
                                <input id="dropzone-file" name="file" type="file" className="" onChange={fileChange} />
                            {/* </label> */}
                            <input type="text" name="description" ref={descriptionInput} className='w-full outline-none border-none p-3 rounded-md mt-3' placeholder='Enter File Description'/>
                            <button type='submit' className='bg-default text-amazon_blue w-full p-3 mt-3 text-xl rounded-lg'>Upload</button>
                        </div>
                        </form>
                    </div>

                    <div className='bg-amazon_blue text-default max-w-7xl mx-auto mt-20 mb-10'>
                        <div className='border-b-2 border-default p-5'>
                            <h4 className='text-4xl'>View Uploaded Document Here</h4>
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
                                    {files.slice(0).reverse().map((item, idx) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={idx}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {/* {item.fileId} */}
                                                {files.length - (idx)}
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
                                            <button onClick={() => handleClick(item.fileHash, item.fileName)}>
                                                View Doc Pdf
                                            </button>
                                            {/* <a target="_blank" rel="noreferrer"
                                                href={`https://${item.fileHash}.ipfs.w3s.link/${item.fileName}`}
                                            >
                                                {item.fileHash}
                                            </a> */}
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
                    <div className="flex flex-col items-center justify-center max-w-xl mx-auto mb-20">
                        <button onClick={sendForVerification} className={`bg-default text-amazon_blue w-full p-3 mt-3 text-xl rounded-lg font-bold ${btnDisable ? 'opacity-40' : ''}`} disabled={btnDisable}>Submit for verification</button>
                    </div>
                    </>
                ) : (
                    <div className='bg-amazon_blue text-default max-w-3xl mx-auto p-3'> 
                        <div className='border-b-2 border-default'>
                            <h4 className='text-4xl mb-3'>Metamask Account Not Found</h4>
                        </div>
                        <div className="py-8">
                            {metaError ? (
                                <p className="text-xl">{metaError}</p>
                            ) : (
                            <p className="text-xl">To view dashboard you must login with metmask first. For more details visit Instructions</p>
                            )}
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Dashboard