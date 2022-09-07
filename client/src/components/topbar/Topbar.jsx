import { Link } from "react-router-dom";
import "./topbar.css";
import { FaFacebookSquare, FaTwitterSquare, FaPinterestSquare, FaInstagramSquare, FaSearch } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";

export default function Topbar() {
  let user = true
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
          {user && <li className="topListItem">LOGOUT</li>}
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link className="link" to="/settings">
            <img
              className="topImg"
              src="https://scontent.fgyd9-1.fna.fbcdn.net/v/t1.6435-9/87480129_2803633269682432_116641613723205632_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=174925&_nc_ohc=RPcN4zluhDEAX8HqlVf&tn=xFhffK1ddS5HS4Bq&_nc_ht=scontent.fgyd9-1.fna&oh=00_AT_7NvgRST24h-x7iZGocbFT-ZF6VEabHJiFaj3yGxgk_w&oe=633A3B6E"
              alt="profile photo"
            />
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
  );
}
