import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {Provider} from "react-redux"
import store from './Store/Store.js' 
import { RouterProvider,Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import SignUp from "./Pages/SignUp.jsx" 
import AuthLayout from './Components/AuthLayout.jsx'
import Login from "./Pages/Login.jsx"
import AllPost from "./Pages/AllPost.jsx"
import EditPosts from './Pages/EditPosts'
import Post from './Pages/Post.jsx'
import AddPost from './Pages/AddPost.jsx'
/*
const router =createBrowserRouter(
  createRoutesFromElements(
  <Route  path="/" element= {<App /> }>
    <Route path="/" element={<Home/>}></Route>
    <Route path="/login" element={<AuthLayout authentication={false}> <Login/> </AuthLayout>}></Route>
    <Route path="/signup" element={<AuthLayout authentication={false}> <SignUp/> </AuthLayout>}></Route>
    <Route path="/all-posts" element={<AuthLayout authentication>{""} <AllPost/> </AuthLayout>}></Route>
    <Route path="/edit-post/:slug" element={<AuthLayout authentication>{""} <EditPost/> </AuthLayout>}></Route>
    <Route path="/post/:slug" element={ <Post/>}></Route>
    <Route path="/add-post" element={<AuthLayout authentication>{""} <AddPost/> </AuthLayout>}></Route>

 </Route>




  )
)

*/
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                <AuthLayout authentication={false}>
                    <Login />
                </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <SignUp />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPost />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
    ],
},
])



ReactDOM.createRoot(document.getElementById('root')).render(
  
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  
  </React.StrictMode>,
)
