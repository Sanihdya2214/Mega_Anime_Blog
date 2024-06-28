import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login as authLogin } from '../Store/authSlice'
import authService from '../appwrite/auth'
import Button from './Button'
import Input from './input'
import Logo from './Logo'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit,formState:{isSubmitting} } = useForm()
    const [error, setError] = useState("")

    const Login = async (data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <>
        
        {isSubmitting && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="text-white text-2xl">Loading...</div>
                </div>
            )}
        <div className='flex items-center justify-center min-h-screen bg-gray-700'>
            <div className='mx-auto w-full max-w-md bg-gray-800 text-white rounded-xl p-10 shadow-lg'>
                <div className="mb-4 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-gray-400">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-blue-500 transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit(Login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input
                            label="Email"
                            placeholder='Enter Your Email'
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password"
                            type="password"
                            placeholder='Enter Your Password'
                            {...register("password", { required: true })}
                        />
                        <Button disabled={isSubmitting} type="submit" className='w-full bg-blue-500 hover:bg-blue-600 text-white'>
                            Sign In
                        </Button>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}

export { Login }
