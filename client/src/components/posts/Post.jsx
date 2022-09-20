import { Link } from 'react-router-dom'
import moment from 'moment'
import './post.css'

export default function Post({ post }) {
  const publicFolder = 'http://localhost:5000/images/' // api=>images

  return (
    <div className="post">
      <img
        className="postImg"
        src={
          post.photo
            ? publicFolder + post.photo
            : 'https://static8.depositphotos.com/1020341/932/i/950/depositphotos_9328285-stock-photo-old-empty-post-card.jpg'
        }
        alt="post-image"
      />
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((category, index) => (
            <span key={index} className="postCat">
              <Link className="link" to="/posts?cat=Music">
                {category}
              </Link>
            </span>
          ))}
        </div>
        <span className="postTitle">
          <Link to={`/post/${post._id}`} className="link">
            {post.title}
          </Link>
        </span>
        <hr />
        <span className="postDate">
          {/* {new Date(post.createdAt).toDateString()} */}
          {moment(post.createdAt).fromNow()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  )
}
