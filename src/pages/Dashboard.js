import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Header from '../components/Header'
import Web3 from "web3"
import moment from "moment/moment"
import DStorage from '../abis/DStorage.json'
import { Web3Storage } from 'web3.storage'
import { convertBytes } from "../components/helpers"
import { ethers } from "ethers"
import { useStateContext } from "../context/ContextProvider"



const Dashboard = () => {
    //const [account, setAccount] = useState("")
    const [loading, setLoading] = useState(false)
    const [fileCount, setFileCount] = useState(0)
    const [dstorage, setDstorage] = useState({})
    const [files, setFiles] = useState([])
    const [file, setfile] = useState([])
    const descriptionInput = useRef()

    const navigate = useNavigate()
    const { user, account, setAccount } = useStateContext()

    console.log(user)
    useEffect(() => {
        if(!user){
            navigate('/login')
        }

        if (window.ethereum) {
            window.ethereum.on("accountsChanged", accountsChanged);
        }

        const loadingData = async () => {
            await loadBlockchainData()
        }

        if(account){
            loadBlockchainData()
        }
    }, [account, fileCount])
  
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
        setAccount(newAccount)
        localStorage.setItem("address", JSON.stringify(newAccount))
        try {
          const balance = await window.ethereum.request({
            method: "eth_getBalance",
            params: [newAccount.toString(), "latest"],
          });
          //setBalance(ethers.utils.formatEther(balance));
        } catch (err) {
          console.error(err);
          //setErrorMessage("There was a problem connecting to MetaMask");
        }
      }

    
    const loadWeb3 = async () => {
        if(window.ethereum){
        window.web3 = new Web3(window.ethereum)
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        //console.log("accounts", accounts)
        } else if(window.web3){
        window.web3 = new Web3(window.web3.currentProvider)
        //console.log("window.web3", window.web3)
        } else {
        window.alert("Non-Ethereum Browser detected. Install Metamask")
        navigate('/')
        } 
    }

    console.log(files)
    const loadBlockchainData = async () => {
        setLoading(true)
        // load account
        
        const web3 = window.web3 
        // const accounts = await web3.eth.getAccounts()
        // setAccount(accounts[0])
        console.log(web3)
        const networkId = await web3.eth.net.getId()
        const networkData = DStorage.networks[networkId]
        
        if(networkData){

            const dstorageCopy = new web3.eth.Contract(DStorage.abi, networkData.address)
            setDstorage(dstorageCopy)
            //console.log(dstorageCopy)

            const filesCount = await dstorageCopy.methods.fileCount().call()
            
            //console.log("fileCount: ", filesCount)
            setFileCount(filesCount)
            
            let arr = []
            for(let i = 1; i <= filesCount; i++){
                const file = await dstorageCopy.methods.getFiles(i).call()
                //console.log(file.uploader, account)
                if(file.uploader.toLowerCase() === account.toLowerCase()){
                    arr.push(file)
                }
            
            }
            setFiles(arr)
            
        } else {
            window.alert("DStorage contract not deployed to detected network")
            navigate('/')
        }
        
        //setAccount(accounts[0])

        

        setLoading(false)
    }
    
    
    function makeStorageClient () {
        return new Web3Storage({ token: process.env.REACT_APP_TOKEN })
    }

    const uploadFile = async (description, file) => {
        console.log(description, file)
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
        
        uploadFile(description, file)
    }

    const fileChange = (e) => {
        if(!e.target.files) return 

        setfile(e.target.files)
    }
   
 
    return (
        <div>
            <Header connectHandler={connect} /> 

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

                    <div className='bg-amazon_blue text-default max-w-3xl mx-auto mt-20'>
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
                                    {files.map((item, idx) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={idx}>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {item.fileId}
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
                                            <a 
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
                                    {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            1
                                        </th>
                                        <td className="px-6 py-4">
                                            Aadhar
                                        </td>
                                        <td className="px-6 py-4">
                                            Aadhar scanned copy
                                        </td>
                                        <td className="px-6 py-4">
                                            pdf
                                        </td>
                                        <td className="px-6 py-4">
                                            326kb
                                        </td>
                                        <td className="px-6 py-4">
                                            view here
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            1
                                        </th>
                                        <td className="px-6 py-4">
                                            Aadhar
                                        </td>
                                        <td className="px-6 py-4">
                                            Aadhar scanned copy
                                        </td>
                                        <td className="px-6 py-4">
                                            pdf
                                        </td>
                                        <td className="px-6 py-4">
                                            326kb
                                        </td>
                                        <td className="px-6 py-4">
                                            view here
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div> 
                    </>
                ) : (
                    <div className='bg-amazon_blue text-default max-w-3xl mx-auto p-3'> 
                        <div className='border-b-2 border-default'>
                            <h4 className='text-4xl mb-3'>Metamask Account Not Found</h4>
                        </div>
                        <div className="py-8">
                            <p className="text-xl">To view dashboard you must login with metmask first. For more details visit Instructions</p>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default Dashboard