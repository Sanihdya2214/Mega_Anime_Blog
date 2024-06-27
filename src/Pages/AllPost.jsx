import React, { useState } from 'react'
import Container from '../Components/Container/Container'
import PostCard from '../Components/PostCard'
import appwriteService from '../appwrite/conf'
import { useEffect } from 'react'

function AllPost() {
    const[posts,setPosts]=useState([])
    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
    }, [])
    
    })
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>
                ))}
            </div>
            </Container>
    </div>
  )
}

export default AllPost