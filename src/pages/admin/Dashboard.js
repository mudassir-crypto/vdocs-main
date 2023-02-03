import React from 'react'
import Header from '../../components/Header'
import DStorage from '../../abis/DStorage.json'
import { convertBytes } from "../../components/helpers"
import moment from "moment/moment"
import {SearchIcon} from "@heroicons/react/outline"
function Dashboard() {
  return (
    <div>
      <Header admin="dashboard"/>

       <div className='flex md:hidden max-w-5xl flex-1 bg-white rounded-lg text-default items-center mt-10 mx-4'>
            <input type="text" placeholder='Enter User Name' className="w-full p-3 outline-none border-none rounded-lg font-semibold"/>
            <SearchIcon className='h-8 w-8 mr-4 cursor-pointer hover:text-green-500'/>
        </div>  
      

      <div className='max-w-7xl mx-auto mt-6 md:mt-12 p-3'>
            <div className='bg-amazon_blue text-default max-w-7xl mx-auto'> 
                <div className='border-b-2 border-default p-4 flex items-center'>
                    <p className='text-3xl mr-20'>List of registered Users</p>
                    <div className='hidden md:flex max-w-5xl flex-1 bg-white rounded-lg text-default items-center'>
                        <input type="text" placeholder='Enter User Name' className="w-full p-3 outline-none border-none rounded-lg font-semibold"/>
                        <SearchIcon className='h-8 w-8 mr-4 cursor-pointer hover:text-green-500'/>
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
                        <th scope="col" className="px-6 py-3">
                            No of Docs
                        </th>
                        <th scope="col" className="px-6 py-3">
                            View
                        </th>
                        <th scope="col" className="px-6 py-3">
                            uploader
                        </th>
                    </tr>
                </thead>
                <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" >
                            
                            <td className="px-6 py-4">
                                1
                            </td>
                            <td className="px-6 py-4">
                               Hussain Rampurawala
                            </td>
                            <td className="px-6 py-4">
                              rampurahussain36@gmail.com
                            </td>
                            <td className="px-6 py-4">
                                Open
                            </td>
                            <td className="px-6 py-4">
                                10
                            </td>
                            <td className="px-6 py-4">
                            <a 
                                
                            >
                              click here
                            </a>
                            </td>
                            <td className="px-6 py-4">
                                {/* <a
                                    href={"https://etherscan.io/address/" + item.uploader}
                                    rel="noopener noreferrer"
                                    target="_blank">
                                    {item.uploader.substring(0,10)}...
                                </a> */}
                                hash value
                            </td>
                        </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
