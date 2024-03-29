import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useStateContext } from '../../context/ContextProvider'
import Header from '../../components/Header'
import { SearchIcon } from "@heroicons/react/outline"
import { Link, useNavigate } from 'react-router-dom'


function Dashboard() {
    const [users, setUsers] = useState([])
    const { user, setUser } = useStateContext()
    const [verifiedUser, setVerifiedUser] = useState([]);
    const searchInput = useRef()

    const navigate = useNavigate()

    useEffect(() => {
        const token = JSON.parse(sessionStorage.getItem("userInfo"))
        fetchCurrentUser(token)

        if(!user){
            navigate('/login')
        }
        //console.log(user.role)
        if(user && user.role !== "admin"){
            navigate('/dashboard')
        }
      

        fetchUsers(token, '')
        seperateUser();
      
    }, [])
    
    const fetchUsers = async (token, searchInput) => {
      
      try {
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/searchUser?search=${searchInput}`, config)
          //console.log(data.users)
          setUsers(data.users)
      } catch (error) {
         console.log(error.response.data.message)
      }
    }

    const fetchCurrentUser = async (token) => {
        try {
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/getCurrentUser`, config)
  
          setUser(data.user)
          
        } catch (error) {
          console.log(error.response.data.message)
        }
    }

    const seperateUser = () => {
        users.map((user, idx) => {
            if(user.isVerified === false) {
                verifiedUser.push(user)
            }
        })
    }


    const searchUser = async (e) => {
        e.preventDefault()
        let usrToken = JSON.parse(sessionStorage.getItem("userInfo"))
        const search = searchInput.current.value 
 
        searchInput.current.value = null

        await fetchUsers(usrToken, search)
    }


  return (
    <div>
      <Header admin="dashboard"/>

       <div className='flex md:hidden max-w-5xl flex-1 bg-white rounded-lg text-default items-center mt-10 mx-4'>
            <form className='flex flex-1 items-center' onSubmit={searchUser} >
                <input type="text" placeholder='Enter User Name' className="w-full p-3 outline-none border-none rounded-lg font-semibold" ref={searchInput}/>
                <button type='submit' className=''>
                    <SearchIcon className='h-8 w-8 mr-4 cursor-pointer hover:text-green-500' />
                </button>
            </form>
        </div>  

        <div className='max-w-7xl mx-auto mt-6 md:mt-12 p-3'>
            <div className='bg-amazon_blue text-default max-w-7xl mx-auto'> 
                <div className='border-b-2 border-default p-4 flex items-center'>
                    <p className='text-3xl mr-20'>List of Verified Users</p>
                    <div className='hidden md:flex max-w-5xl flex-1 bg-white rounded-lg text-default items-center'>
                        <form className='flex flex-1 items-center' onSubmit={searchUser} >
                            <input type="text" placeholder='Enter User Name' className="w-full p-3 outline-none border-none rounded-lg font-semibold" ref={searchInput}/>
                            <button type='submit' className=''>
                                <SearchIcon className='h-8 w-8 mr-4 cursor-pointer hover:text-green-500' />
                            </button>
                        </form>
                    </div>
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
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                            No of Docs
                        </th> */}
                        <th scope="col" className="px-6 py-3">
                            View
                        </th>
                        <th scope="col" className="px-6 py-3">
                            uploader
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((student, idx) => (
                        student.status === "verified"  && (
                        <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                            
                            <td className="px-6 py-4">
                                {idx+1}
                            </td>
                            <td className="px-6 py-4">
                               {student.name}
                            </td>
                            <td className="px-6 py-4">
                                {student.email}
                            </td>
                            <td className="px-6 py-4">
                                {student.category}
                            </td>
                            {/* <td className="px-6 py-4">
                                10
                            </td> */}
                            <td className="px-6 py-4">
                            <Link 
                                to={`/admin/user/${student._id}`}
                            >
                              click here
                            </Link>
                            </td>
                            <td className="px-6 py-4">
                                <a
                                    href={"https://etherscan.io/address/" + student.metamask}
                                    rel="noopener noreferrer"
                                    target="_blank">
                                    {student.metamask ? student.metamask : "No metamask"}
                                </a>
                                
                            </td>
                        </tr>
                        )
                    ))}
                        
                </tbody>
            </table>
        </div>


      </div>
      

      <div className='max-w-7xl mx-auto mt-6 md:mt-12 p-3'>
            <div className='bg-amazon_blue text-default max-w-7xl mx-auto'> 
                <div className='border-b-2 border-default p-4 flex items-center'>
                    <p className='text-3xl mr-20'>List of Unverified Users</p>
                    <div className='hidden md:flex max-w-5xl flex-1 bg-white rounded-lg text-default items-center'>
                        <form className='flex flex-1 items-center' onSubmit={searchUser} >
                            <input type="text" placeholder='Enter User Name' className="w-full p-3 outline-none border-none rounded-lg font-semibold" ref={searchInput}/>
                            <button type='submit' className=''>
                                <SearchIcon className='h-8 w-8 mr-4 cursor-pointer hover:text-green-500' />
                            </button>
                        </form>
                    </div>
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
                            Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Category
                        </th>
                        {/* <th scope="col" className="px-6 py-3">
                            No of Docs
                        </th> */}
                        <th scope="col" className="px-6 py-3">
                            View
                        </th>
                        <th scope="col" className="px-6 py-3">
                            uploader
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((student, idx) => (
                        student.status !== "verified"  && (
                        <tr key={idx} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                            
                            <td className="px-6 py-4">
                                {idx+1}
                            </td>
                            <td className="px-6 py-4">
                               {student.name}
                            </td>
                            <td className="px-6 py-4">
                                {student.email}
                            </td>
                            <td className="px-6 py-4">
                                {student.category}
                            </td>
                            {/* <td className="px-6 py-4">
                                10
                            </td> */}
                            <td className="px-6 py-4">
                            <Link 
                                to={`/admin/user/${student._id}`}
                            >
                              click here
                            </Link>
                            </td>
                            <td className="px-6 py-4">
                                <a
                                    href={"https://etherscan.io/address/" + student.metamask}
                                    rel="noopener noreferrer"
                                    target="_blank">
                                    {student.metamask ? student.metamask : "No metamask"}
                                </a>
                                
                            </td>
                        </tr>
                        )
                    ))}
                        
                </tbody>
            </table>
        </div>


      </div>
    </div>
  )
}

export default Dashboard
