import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from './../../Context'
import { useState } from 'react'
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios'

export default function Settings() {
  const PF = 'http://localhost:5000/images/'
  const { user, setUser } = useContext(UserContext)
  const [username, setusername] = useState(user.username)
  const [email, setemail] = useState(user.email)
  const [password, setpassword] = useState('')
  const [file, setfile] = useState(null)
  const [success, setsuccess] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    }
    if (file) {
      const formdata = new FormData()
      const filename = Date.now() + file.name
      formdata.append('name', filename)
      formdata.append('file', file)
      updatedUser.profilePic = filename
      try {
        await axios.post('/upload', formdata)
      } catch (err) {
        console.log(err)
      }
    }
    try {
      const res = await axios.put('/users/' + user._id, updatedUser)
      setsuccess(true)
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(res.data))
      
    } catch (err) {
      console.log(err.response.data)
    }
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <span className="settingsTitleUpdate">Update Your Account</span>
          <span className="settingsTitleDelete">Delete Account</span>
        </div>
        <form className="settingsForm" onSubmit={handleSubmit}>
          <label>Profile Picture</label>
          <div className="settingsPP">
            <img
              src={file ? URL.createObjectURL(file) : PF + user.profilePic}
              alt="profile picture"
            />
            <label htmlFor="fileInput">
              <FaUserCircle className='settingsPPIcon'/>
            </label>
            <input
              id="fileInput"
              type="file"
              style={{ display: 'none' }}
              className="settingsPPInput"
              onChange={(e) => setfile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder="username"
            name="name"
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button className="settingsSubmitButton" type="submit">
            Update
          </button>
          {success && (
            <span
              style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}
            >
              Profile has been updated...
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  )
}
