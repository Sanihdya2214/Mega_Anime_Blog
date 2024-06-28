import './App.css'
import React, { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import authService from './appwrite/auth'
import { login, logout } from './Store/authSlice'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  
  const dispatch = useDispatch()

  useEffect(() => {
   
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className='min-h-screen flex flex-col justify-between bg-gray-900 text-white'>
      <Header />
      <main className='flex-grow'>
        <Outlet  />
      </main>
      <Footer />
    </div>
  ) : (
    <div className='w-full min-h-screen flex justify-center items-center bg-gray-900 text-white'>
      <p>Loading...</p>
    </div>
  )
}

export default App
