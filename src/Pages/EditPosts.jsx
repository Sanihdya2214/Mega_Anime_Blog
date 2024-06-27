import React, { useEffect,useState } from 'react'
import appwriteService from "../appwrite/conf"
import PostForm from '../Components/PostForm/PostForm'
import Container from '../Components/Container/Container'
import { useNavigate, useParams } from 'react-router-dom';

function EditPosts() {

  const [Posts, setPosts] = useState(null);

  const {slug}=useParams();
  const navigate=useNavigate()

    useEffect((slug) => {
         if(slug){
            appwriteService.getPost(slug).then((post)=>{
                   if(post){
                    setPosts(post)
                   }
                   
            })
            
         }  else{
            navigate("/")
         }
    
      }, [slug,navigate])
    

   return Posts ? (
      <div className='py-8'>
        <Container>
            <PostForm post={Posts}/>
        </Container>
      </div>

  ) :null
}

export default EditPosts