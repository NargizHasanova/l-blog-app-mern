import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import moment from 'moment'
import './singlePost.css'

export default function SinglePost() {
  const publicFolder = 'http://localhost:5000/images/' // api=>images
  const location = useLocation()
  console.log(location)
  let locArray = location.pathname.split('/') //  ['', 'post', '63219d72a3337fc41d96ead5']
  const path = locArray[locArray.length - 1]

  const [post, setPost] = useState({})

  useEffect(() => {
    async function getPost() {
      const res = await axios.get('/posts/' + path)
      setPost(res.data)
    }
    getPost()
  }, [path])
  return (
    <div className="single">
      <div className="singlePost">
        <div className="singlePostWrapper">
          <img
            className="singlePostImg"
            src={
              post.photo
                ? publicFolder + post.photo
                : 'https://static8.depositphotos.com/1020341/932/i/950/depositphotos_9328285-stock-photo-old-empty-post-card.jpg'
            }
            alt="post-title-image"
          />
          <h1 className="singlePostTitle">
            {post.title}
            <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit"></i>
              <i className="singlePostIcon far fa-trash-alt"></i>
            </div>
          </h1>
          <div className="singlePostInfo">
            <span>
              Author:
              <b className="singlePostAuthor">
                <Link className="link" to={`/posts?username=${post.username}`}>
                  {post.username}
                </Link>
              </b>
            </span>
            <span> {moment(post.createdAt).fromNow()}</span>
          </div>
          <p className="singlePostDesc">{post.desc}</p>
        </div>
      </div>
      <Sidebar />
    </div>
  )
}
