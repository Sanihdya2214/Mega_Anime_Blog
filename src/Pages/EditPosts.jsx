import React, { useEffect,useState } from 'react'
import appwriteService from "../appwrite/conf"
import PostForm from '../Components/PostForm/PostForm.jsx'
import Container from '../Components/Container/Container'
import { useNavigate, useParams } from 'react-router-dom';

function EditPosts() {
   const [post, setPosts] = useState(null)
   const {slug} = useParams()
   const navigate = useNavigate()

   useEffect(() => {
       if (slug) {
           appwriteService.getPost(slug).then((post) => {
               if (post) {
                   setPosts(post)
               }
           })
       } else {
           navigate('/')
       }
   }, [slug, navigate])
 return post ? (
   <div className='py-8'>
       <Container>
           <PostForm post={post} />
       </Container>
   </div>
 ) : null
}

export default EditPosts