import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useFetcher, useNavigate } from 'react-router-dom'
function AuthLayout({children,authentication=true}) {

    const navigate=useNavigate()
    const [loader,setLoader]=useState(true)
    const authStatus=useSelector((state)=>state.auth.status)

    useEffect(() => {
        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus,navigate,authentication])
    


return loader? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout