import Post from './Post'

export default function Posts({ posts }) {
  // console.log(posts);
  return (
    <div className="posts">
      {posts.map((item) => (
        <Post post={item} key={item._id} />
      ))}
    </div>
  )
}
