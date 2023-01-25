import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import asset from '../images/Asset-1.png'

const HomeScreen = () => {
  return (
    <div>
      <Header/>

      <main className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-5'>
        
        <div className='items-center justify-center mt-16 md:mt-36 max-w-lg mr-3'>
          <p className='text-default text-xl text-justify my-3'>
          A <span className='font-extrabold'>blockchain</span> based data storage and access framework 
          for our college admission cell to remove its total dependence on a  
          <span className='font-extrabold'> centralized repository.</span></p>
          <p className='text-default text-xl text-justify'>
          Documents could be stored as hashes to provide an extra layer of security and to prevent misuse of the said 
          documents as well. This will also help in improving and fastening the admission process.
          </p>
          <div className='flex justify-between mt-10 space-x-10'>
            <button className='bg-default h-14 w-32 rounded-lg flex-grow font-bold text-xl text-gray-800'>
                <Link to='/register'>Sign Up</Link>
            </button>

            <button className='bg-default h-14 w-32 flex-grow rounded-lg font-bold text-xl text-gray-800'>
                <Link to='/instruction'>View Instructions</Link>  
            </button>
          </div>
        </div>

        <div className='items-center justify-center mt-36'>
          <img src={asset} height={700} width={700} alt="" />
        </div>
      </main>
    </div>
  )
}

export default HomeScreen