import { Link } from 'react-router-dom'
import './topbar.css'
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaPinterestSquare,
  FaInstagramSquare,
  FaSearch,
} from 'react-icons/fa'
import { BsFacebook } from 'react-icons/bs'
import { UserContext } from '../../Context'
import { useContext } from 'react'

export default function Topbar() {
  const { user, setUser } = useContext(UserContext)
  function handleLogout() {
    localStorage.removeItem('user')
    setUser(null)
    window.location.reload()
  }

  return (
    <div className="top">
      <div className="topLeft">
        <BsFacebook className="icon" />
        <FaInstagramSquare className="icon" />
        <FaPinterestSquare className="icon" />
        <FaTwitterSquare className="icon" />
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">ABOUT</li>
          <li className="topListItem">CONTACT</li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          {user && (
            <li onClick={handleLogout} className="topListItem">
              LOGOUT
            </li>
          )}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img className="topImg" src={user.profilePic} alt="profile photo" />
          </Link>
        ) : (
          <ul className="topList">
            <li className="topListItem">
              <Link className="link" to="/login">
                LOGIN
              </Link>
            </li>
            <li className="topListItem">
              <Link className="link" to="/register">
                REGISTER
              </Link>
            </li>
          </ul>
        )}
        <FaSearch className="search-btn-nav" />
      </div>
    </div>
  )
}
