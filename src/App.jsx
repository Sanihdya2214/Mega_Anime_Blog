
import './App.css'
import react from "react"
import {useState,useEffect} from "react"
import {useDispatch} from "react-redux"
import authService from './appwrite/auth'
import { login,logout } from './Store/authSlice'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
     const [Loading, setLoading] = useState(true)
     const [key, setKey] = useState(0); 
     const dispatch=useDispatch()

     useEffect(()=>{
      setKey(prevKey => prevKey + 1);
        authService.getCurrentUser()
        .then((userData)=>{
           if(userData){
          
            dispatch(login({userData}))
}         
else{
     dispatch(logout())
}
          
        })
    .finally(()=> setLoading(false))
     },[])
   
  return !Loading ?(
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
       <div className='w-full block'>
        <Header/>
        <main>
          <Outlet key={key}/> 
        </main>
        <Footer/>
       </div>
    </div>
  ) : (
    <div className='w-full min-h-screen flex justify-center items-center bg-slate-400'>
      <p>Loading...</p>
    </div>
  )
}

export default App
