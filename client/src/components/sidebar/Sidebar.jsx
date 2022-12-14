import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './sidebar.css'

export default function Sidebar() {
  const [cats, setCats] = useState([])

  useEffect(() => {
    async function getCats() {
      const res = await axios.get('/categories')
      setCats(res.data)
    }
    getCats()
  }, [])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://scontent.fgyd9-1.fna.fbcdn.net/v/t1.6435-9/187288030_3989110807801333_8261365288573342664_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=174925&_nc_ohc=9F9L0aqOj7MAX_8VEjr&_nc_ht=scontent.fgyd9-1.fna&oh=00_AT8L9aNO2-kHpcxI9-fcbqeaH0nfg8rfPyc_wB8sAZ5Qmw&oe=633AD0EF"
          alt=""
        />
        <p>
          Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
          amet ex esse.Sunt eu ut nostrud id quis proident.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((category) => (
            <li key={category._id} className="sidebarListItem">
              <Link className="link" to={`/posts?cat=${category.name}`}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fab fa-facebook-square"></i>
          <i className="sidebarIcon fab fa-instagram-square"></i>
          <i className="sidebarIcon fab fa-pinterest-square"></i>
          <i className="sidebarIcon fab fa-twitter-square"></i>
        </div>
      </div>
    </div>
  )
}
