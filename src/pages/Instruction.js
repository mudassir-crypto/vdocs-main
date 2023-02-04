import React from 'react'
import Header from '../components/Header'
import instruction1 from '../images/instructions-01.jpg'
import instruction2 from '../images/instructions-2.png'
import instruction3 from '../images/instructions-5.png'
import instruction4 from '../images/instructions-6.png'
import instruction5 from '../images/instructions-7.png'
import instruction6 from '../images/instructions-8.png'
import instruction7 from '../images/instructions-9.png'
import instruction8 from '../images/instructions-10.png'

function Instruction() {
  return (
    <div>
        <Header/>

        <div className='max-w-7xl mx-auto text-default p-3'>
            <div className='mt-10 bg-amazon_blue p-5 max-w-5xl mx-auto rounded-lg'>
              <div className='border-b-2 border-default'>
                <p className='text-3xl mb-4'>Follow the Instructions given below</p>
              </div>

              <div>
                <div>
                    <p className='text-2xl mt-5 font-semibold'>Step 1:- Sign Up/ Create Account</p>
                    <div className='border-2 border-default mt-5 mb-3'>
                      <img src={instruction1} className='h-50 w-50' alt="" />
                    </div>
                    <p className='text-lg text-justify'>A user who wants to secure admissionn in Vidyalankar Institute of Technology must register 
                      on vDocs and fill out all the necessary details namely Name, Email, Number, Dob, Gender, Year of 12th, Marks secured in various exams (10th, 12th, JEE, CET) and admission type
                    </p>
                </div>

                <div>
                    <p className='text-2xl mt-5 font-semibold'>Step 2:- Login Using Email & Password</p>
                    <div className='border-2 border-default mt-5 mb-3'>
                      <img src={instruction2} className='h-50 w-50' alt="" />
                    </div>
                    <p className='text-lg text-justify'>
                      On Succesfull login, A new user will be redirected on to the dashboard. Follow Step 3 very carefully
                    </p>
                </div>

                <div>
                    <p className='text-2xl mt-5 font-semibold'>Step 3:- Login With Metamask</p>
                    <p className='text-lg text-justify mt-2'>
                      After reaching dashboard comes the most important part, Logging in with metamask. In order to login a user must download 
                      a tool called <a href="https://trufflesuite.com/ganache/" className='underline'>Ganache</a> and must also install  <a href='https://metamask.io/download/' className='underline'> metamask </a> 
                       extension for browser of their choice. Ganache must be set on localhost:7545. Now open metamask from extensions tab on your browser and setup your wallet.
                    </p>
                    <p className='text-lg text-justify mt-2'>
                      Once the wallet has been setup the user needs to add a new test network and name it ganache as shown in the picture. Click on dd network and then add a network manually and fill in the details as shown below
                    </p>
                    <div className='border-4 border-default mt-5 mb-3 flex flex-col space-y-5 lg:space-y-0 lg:flex-row justify-between'>
                      <img src={instruction3} className='h-50 w-50' alt="" />
                      <img src={instruction4} className='h-50 w-50' alt="" />
                    </div>
                    <p className='text-lg text-justify'>
                      After the network has been added the user must open the ganache application. From there the user must copy the private key of an account and import it
                       into the metamask. Your ganache must look like this and the private key needs to be copied by clicking on the key icon on the right
                    </p>
                    <div className='border-4 border-default mt-5 mb-3'>
                      <img src={instruction5} className='h-50 w-50' alt="" />
                    </div>
                    <p className='text-lg text-justify'>
                      Now the account needs to be imported into metamask as shown below by pasting the private key.
                      <br/>
                      <span className='font-bold'>Note: The account private key and public key need to be saved since they are unique for each account. If keys are lost the users account would not be restored under any circumstances</span>
                    </p>
                    <div className='border-4 border-default mt-5 mb-3 flex flex-col space-y-5 lg:space-y-0 lg:flex-row justify-between'>
                      <img src={instruction6} className='h-50 w-50' alt="" />
                      <img src={instruction7} className='h-50 w-50' alt="" />
                    </div>
                    <p className='text-lg text-justify'>
                      Now the setup has been completed and user can login with metamask. On successfull login user would be redirected on to the dashboard where he/she can upload the necessary documents
                    </p>
                    <div className='border-4 border-default mt-5 mb-3'>
                      <img src={instruction8} className='h-50 w-50' alt="" />
                    </div>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Instruction