import { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios'
import './homepage.css'
import { useLocation } from 'react-router'

export default function Homepage() {
  const [posts, setPosts] = useState([])
  const { search } = useLocation()
  // console.log(search)

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/posts' + search)
      setPosts(res.data)
    }
    fetchPosts()
  }, [])

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  )
}
