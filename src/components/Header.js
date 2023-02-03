import React, { useState } from 'react'
import logo from '../images/logo-01.png'
import { Link } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider';


function Header({ connectHandler, admin}) {
  const { user, account } = useStateContext()

  const logOut = () => {
    localStorage.removeItem("address");
    localStorage.removeItem("userInfo");
    window.location.reload()
  }

  return (
    <div className='bg-amazon_blue flex flex-grow border-b-2 border-default items-center justify-between'>
        <div className='p-2 mx-10 cursor-pointer'>
          <Link to='/'>
            <img src={logo} height={50} width={120} alt="" />
          </Link>
        </div>
        <div className={`${admin  ? "hidden" : "flex"} text-default text-lg mx-10 space-x-10 items-center`}>
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
              <>
              <p className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline' onClick={connectHandler}>Login With Metamask</p>
              
              <p onClick={logOut} className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline'>Log Out</p>
              
              </>
            )}

            {user && account && (
              <p onClick={logOut} className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline'>{`${account.substring(0,5)}... ${account.substring(20, 24)}`}</p>
            )}
        </div>

        <div className={`${admin == "login" ? "flex" : "hidden"} text-default text-lg mx-10 space-x-10 items-center`}>
            <Link to='/instruction'>
              <p className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline'>Welcome To Admin Panel</p>
            </Link>
        </div>

        <div className={`${admin == "dashboard" ? "flex" : "hidden"} text-default text-lg mx-10 space-x-10 items-center`}>
            <div className='hidden md:inline'><h4 className='text-2xl'>Welcome to Admin Panel User</h4></div>
        </div>

        <div className={`${admin == "dashboard" ? "flex" : "hidden"} text-default text-lg mx-10 space-x-10 items-center`}>

            <Link to='/instruction'>
              <p className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline'>Modify Users</p>
            </Link>  

            <Link>
              <p onClick={logOut} className='hover:underline hover:text-teal-300 cursor-pointer hidden md:inline'>Log Out</p>
            </Link>
        </div>
    </div>
  )
}

export default Header