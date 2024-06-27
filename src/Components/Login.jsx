import React, { useCallback, useState, useTransition } from 'react'
import { Link,useActionData,useNavigate } from 'react-router-dom'
import { login as authLogin } from '../Store/authSlice'
import Button from './Button'
import Input from './input'
import Logo from './Logo'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from "react-hook-form"

function Login() {
   const navigate=useNavigate()
   const dispatch=useDispatch()
   const {register,handleSubmit}=useForm()

     const[error,setError]=useState("")

     const Login=async (data)=>{
          setError("")
          try {
            const session =await authService.login(data)
         
            
            if(session){
                const userData=await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData))
                    navigate("/")
            }
          } catch (error) {
              setError(error.message)
          }
         

     }

  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
        <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form 
          onSubmit={handleSubmit(Login)} className='mt-8'> {/*This handlesubmit takes the login as a method and do the things behind 
          as this handlesubmit is like a event */}
            <div className='space-y-5'>
                <Input 
                 label="Email"
                 placeholder='Enter Your Email'
                 type="email"
  /*This register syntax is used as it is a part of form
  and it is written like this only no change*/                {...register("email",{
                    required:true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }

                 })}
                />
                <Input 
                  label="Password :"
                  type="password"
                  placeholder='Enter Your Password'
                  {...register("password",{required:true,})}
                
                />
                <Button
                type="submit"
                className='w-full'
                >Sign In</Button>
            </div>



          </form>
        </div>
        </div>
  )
}

export {Login}