import React, { useState } from 'react'
import logo from '../images/logo-01.png'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider';


function Header({ connectHandler}) {
  const { user, account } = useStateContext()

  return (
    <div className='bg-amazon_blue flex flex-grow border-b-2 border-default items-center justify-between'>
        <div className='p-2 mx-10 cursor-pointer'>
          <Link to='/'>
            <img src={logo} height={50} width={120} alt="" />
          </Link>
        </div>
        <div className='flex text-default text-lg mx-10 space-x-10 items-center'>
            <Link to='/instruction'>
              <p className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline'>Instructions</p>
            </Link>
            <Link to='/about'>
              <p className='hover:underline hover:text-teal-300 cursor-pointer'>About Vidyalankar</p>
            </Link>
            {!user && (
              <Link to='/register'>
                <p className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline'>Sign Up</p>
              </Link>
            )}
            {user && !account && (
              <p className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline' onClick={connectHandler}>Login With Metamask</p>
            )}

            {/* {user && account && (
              <p className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline'>{`${account.substring(0,5)}... ${account.substring(20, 24)}`}</p>
            )} */}

            
        </div>
    </div>
  )
}

export default Header