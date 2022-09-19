import { useEffect, useState } from 'react'
import { useRef } from 'react'
import axios from 'axios'
import './login.css'
import { useContext } from 'react'
import { UserContext } from '../../Context'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const userRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  const { user, setUser } = useContext(UserContext)
  const [userNameState, setUserName] = useState('')
  const [passwordState, setPassword] = useState('')
  console.log(user)

  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(false)
  const [isBtnLight, setIsBtnLight] = useState(true)

  useEffect(() => {
    if (userNameState.trim() && passwordState.trim()) {
      setIsBtnLight(false)
    } else {
      setIsBtnLight(true)
    }
  }, [userNameState, passwordState])

  useEffect(() => {
    user && localStorage.setItem('user', JSON.stringify(user))
    user && navigate('/')
  }, [user])

  async function handleSubmit(e) {
    e.preventDefault()
    setIsFetching(true)
    const username = userRef.current.value
    const password = passwordRef.current.value
    if (!userNameState.trim() || !passwordState.trim()) {
      return
    }
    try {
      const res = await axios.post('/auth/login', {
        username,
        password,
      })

      setUser(res.data)

      setError(false)
      setIsBtnLight(false)
    } catch (error) {
      setError('invalid username or password!')
      setIsFetching(false)
    }
  }
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="loginInput"
          ref={userRef}
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUserName(e.target.value)}
        />
        <label>Password</label>
        <input
          className="loginInput"
          ref={passwordRef}
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="loginButton"
          style={{
            backgroundColor: isBtnLight ? 'lightcoral' : 'rgb(227, 99, 99)',
          }}
          disabled={isFetching}
        >
          Login
        </button>
        {error && <span className="auth-error">{error}</span>}
      </form>
      <button className="loginRegisterButton">Register</button>
    </div>
  )
}
