import React from 'react'
import {useDispatch} from "react-redux"
import { logout } from '../../Store/authSlice'
import authService from '../../appwrite/auth'
import Button from '../Button'

function LogoutBtn() {

    const dispatch=useDispatch()
      const logoutHandler=()=>{

            authService.logout().then(()=>{
                   dispatch(logout())
            })
                                

      }  


  return (
   <Button className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
           onClick={logoutHandler}
            
   >Logout</Button>
  )
}

export default LogoutBtn