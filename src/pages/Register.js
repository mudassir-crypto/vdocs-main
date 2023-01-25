import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useForm } from "react-hook-form"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors, dirtyFields } } = useForm({ defaultValues: { AdmissionType: "instituteRound" }}) 

  const navigate = useNavigate()
  const { user } = useStateContext()

  useEffect(() => {
    if(user){
        navigate('/dashboard')
    }
  }, [])

  const onSubmit = async (user) => {
    console.log(user)
    if(user.password !== user.password2){
        console.log("Password does not match")
    } else {
        delete user.terms
        delete user.password2
        
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/register`, user, config)
            console.log(data)
            navigate('/login')

        } catch (error) {
            console.log(error.response.data.message)
        }
    }
    }

    


  return (
    <div>
        <Header/>

        <div className='max-w-3xl mx-auto py-10 px-5'>
            <div className='bg-amazon_blue text-default rounded-lg'>
                <div className='border-b-2 border-default flex items-center justify-between'>
                    <h4 className='text-4xl p-4'>SignUp To Vdocs</h4>
                    <div className='flex items-center'>
                        <p className='text-2xl font bold'>Or Click Here To</p>
                        <Link to="/login">
                            <button className='bg-default p-3 px-8 mx-5 text-xl font-bold text-amazon_blue rounded-lg'>Login</button>
                        </Link>
                    </div>
                </div>

                <div className='flex flex-col p-5'>
                    <form action="" className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Enter Name</label>
                            <input type="text" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                            {...register("name", { required: true })}
                            />
                            {errors.name && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Enter Email</label>
                            <input type="email" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                            {...register("email", { required: true })}
                            />
                            {errors.email && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Enter Password</label>
                            <input type="password" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                            {...register("password", { required: true })}
                            />
                            {errors.number && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Confirm Password</label>
                            <input type="password" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                            {...register("password2", { required: true })}
                            />
                            {errors.password2 && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Enter Mobile Number</label>
                            <input type="text" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                            {...register("phone", { required: true })}
                            />
                            {errors.number && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Enter Gender</label>
                            <input type="text" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                            {...register("gender", { required: true })}
                            />
                            {errors.gender && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Enter DOB</label>
                            <input type="date" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                            {...register("DOB", { required: true })}
                            />
                            {errors.DOB && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Enter HSC Passing Year</label>
                            <input type="text" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                            {...register("passingYear", { required: true })}
                            />
                            {errors.year && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Enter JEE Score (Percentile)</label>
                            <input type="text" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                            {...register("jeeScore", { required: true })}
                            />
                            {errors.jeeScore && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Enter CET Score (Percentile)</label>
                            <input type="text" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                            {...register("cetScore", { required: true })}
                            />
                            {errors.cetScore && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Enter 12th Score (Percentage)</label>
                            <input type="text" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                            {...register("hscScore", { required: true })}
                            />
                            {errors.hscScore && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Enter 10th Score (Percentage)</label>
                            <input type="text" className='bg-white rounded-lg outline-none border-none p-3 font-bold'
                            {...register("sscScore", { required: true })}
                            />
                            {errors.sscScore && <span className='text-red-500'>This field is required</span>}
                        </div>

                        <div className='flex flex-col space-y-2'>
                            <label className='text-xl' htmlFor="">Admission Type</label>
                            <div className='flex items-center space-x-3'>
                                <input type="radio" name="admissionType" value="capRound" 
                                {...register("AdmissionType")} 
                                />
                                <label htmlFor="">Cap Round</label>
                                <input type="radio" name="admissionType" value="instituteRound" 
                                {...register("AdmissionType")}
                                />
                                <label htmlFor="">Institute Round</label>
                            </div>  
                        </div>

                        {dirtyFields?.AdmissionType && (
                            <div className='flex flex-col space-y-2'>
                                <label className='text-xl' htmlFor="">Category (Original certificate to be verified by college)</label>
                                <div className='flex items-center space-x-3'>
                                    <input type="radio" name="category" value="open"
                                    {...register("category")}
                                    />
                                    <label htmlFor="">Open</label>
                                    <input type="radio" name="category" value="sc"
                                    {...register("category")}
                                    />
                                    <label htmlFor="">SC</label>

                                    <input type="radio" name="category" value="st"
                                    {...register("category")}
                                    />
                                    <label htmlFor="">ST</label>
                                    <input type="radio" name="category" value="obc"
                                    {...register("category")}
                                    />
                                    <label htmlFor="">OBC</label>
                                    <input type="radio" name="category" value="ews"
                                    {...register("category")}
                                    />
                                    <label htmlFor="">EWS</label>
                                    <input type="radio" name="category" value="sebc"
                                    {...register("category")}
                                    />
                                    <label htmlFor="">SEBC</label>
                                    <input type="radio" name="category" value="vjnt"
                                    {...register("category")}
                                    />
                                    <label htmlFor="">VJNT</label>
                                </div>  
                            </div>
                        )}

                        <div className='flex flex-col space-y-2'>
                            
                            <div className='flex space-x-3'>
                                <input type="checkbox"
                                {...register("terms", { required: true })}
                                />
                                <label>Please read the terms and conditions</label>
                                {errors.terms && <span className='text-red-500'>This field is required</span>}
                            </div>
                        </div>
                       
                        <div className='flex'>
                            <button type='submit' className='bg-default flex-1 p-4 text-xl font-bold text-amazon_blue rounded-lg'>Submit</button>
                        </div>    
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register