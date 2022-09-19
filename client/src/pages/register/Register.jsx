import { useState } from 'react'
import axios from 'axios'
import './register.css'
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError(false)
    try {
      const res = await axios.post('/auth/register', {
        username,
        email,
        password,
      })
      // window.location.replace('/login')
      navigate("/login")
      console.log(res.data)
    } catch (err) {
      console.log(err.response.data)
      setError(err.response.data)
    }
  }
  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="registerButton">
          Register
        </button>
      </form>
      <button type="submit" className="registerLoginButton">
        Login
      </button>
      {error && <span className='auth-error'>{error}</span>}
    </div>
  )
}
