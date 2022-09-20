import Sidebar from '../../components/sidebar/Sidebar'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router'
import axios from 'axios'
import { useContext, useEffect, useState } from 'react'
import moment from 'moment'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import './singlePost.css'
import { UserContext } from '../../Context'

export default function SinglePost() {
  const publicFolder = 'http://localhost:5000/images/' // api=>images
  const location = useLocation()
  let locArray = location.pathname.split('/') //  ['', 'post', '63219d72a3337fc41d96ead5']
  const path = locArray[locArray.length - 1]
  const navigate = useNavigate()
  const { user, setUser } = useContext(UserContext)

  const [post, setPost] = useState({})
  const [title, setTitle] = useState('')
  const [desc, setdesc] = useState('')
  const [updatemode, setupdatemode] = useState(false)

  async function handleDelete() {
    try {
      await axios.delete('/posts/' + post._id, {
        data: { username: user.username },
      })
      navigate('/')
    } catch (err) {
      console.log(err.response.data)
    }
  }

  async function handleUpdate() {
    try {
      await axios.put('/posts/' + post._id, {
        username: user.username,
        title: title,
        desc: desc,
        updatedAt: Date.now(),
      })
      setupdatemode(false)
      // window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    async function getPost() {
      const { data } = await axios.get('/posts/' + path)
      setPost(data)
      setTitle(data.title)
      setdesc(data.desc)
    }
    getPost()
  }, [path])

  console.log(post)

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
          {updatemode ? (
            <input
              type="text"
              value={title}
              className="singlePostTitleInput"
              autoFocus
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h1 className="singlePostTitle">
              {title}
              {user?.username === post.username && (
                <div className="singlePostEdit">
                  <FaEdit
                    className="singlePostIcon"
                    onClick={() => setupdatemode(true)}
                  />
                  <FaTrashAlt
                    className="singlePostIcon"
                    onClick={handleDelete}
                  />
                </div>
              )}
            </h1>
          )}

          <div className="singlePostInfo">
            <span>
              Author:
              <b className="singlePostAuthor">
                <Link className="link" to={`/posts?username=${post.username}`}>
                  {post.username}
                </Link>
              </b>
            </span>
            <span> {moment(post.updatedAt).fromNow()}</span>
          </div>
          {updatemode ? (
            <textarea
              rows="10"
              cols="45"
              className="singlePostDescInput"
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
            />
          ) : (
            <p className="singlePostDesc">{desc}</p>
          )}
          {updatemode && (
            <button className="singlePostButton" onClick={handleUpdate}>
              Update
            </button>
          )}
        </div>
      </div>
      <Sidebar />
    </div>
  )
}
