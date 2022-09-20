import './write.css'
import { AiOutlineFileAdd } from 'react-icons/ai'
import { useState } from 'react'
import { UserContext } from './../../Context'
import { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

// FORMDATAYA BAX YOUTUBEDA!
// createObjectURL!!

export default function Write() {
  const [title, settitle] = useState('')
  const [desc, setdesc] = useState('')
  const [file, setfile] = useState('')
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  console.log(file)

  async function handleSubmit(e) {
    e.preventDefault()
    const newPost = {
      username: user.username,
      title: title,
      desc: desc,
    }
    if (file) {
      const formdata = new FormData()
      const filename = Date.now() + file.name
      formdata.append('name', filename)
      formdata.append('file', file)
      newPost.photo = filename
      try {
        await axios.post('/upload', formdata)
      } catch (err) {
        console.log(err)
      }
    }
    try {
      const res = await axios.post('/posts', newPost)
      navigate('/post/' + res.data._id)
    } catch (err) {
      console.log(err.response.data)
    }
  }
  return (
    <div className="write">
      {file && (
        <img
          className="writeImg"
          src={URL.createObjectURL(file)}
          alt="caption-image"
        />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <AiOutlineFileAdd className="writeIcon" />
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: 'none' }}
            onChange={(e) => setfile(e.target.files[0])}
          />
          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            autoFocus={true}
            onChange={(e) => settitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            autoFocus={true}
            onChange={(e) => setdesc(e.target.value)}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
    // Webpack in Programming
    // What is webpack? It is something that collects different file formats, create a single package and helps to run our application.
    // We can install webpack and config it as we wish,but also we can use ready webpack.
    // For example, in react we don't need to install and config webpack because it is alreade built in our react-application.
  )
}
