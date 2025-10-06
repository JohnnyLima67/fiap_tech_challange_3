import { use, useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { userInfo } from "os";

export default function ShowPage() {
  const { id } = useParams();
  interface PostInfo {
    title: string;
    content: string;
    file: string;
    createdAt: string;
    author: { username: string, _id: string };
    _id: string;
    // add other properties if needed
  }
  const [postInfo, setPostInfo] = useState<PostInfo | null>(null);
  const { userInfo: currentUser } = useContext(UserContext);
  useEffect(() => {
    fetch(`http://localhost:4000/posts/${id}`)
      .then(res => res.json())
      .then(postInfo => setPostInfo(postInfo));
  }, [id]);
  console.log(currentUser);
  return (
    <div className="post-full">
      <h1>{postInfo?.title}</h1>
      <header>Por {postInfo?.author.username} em {new Date(postInfo?.createdAt || '').toLocaleDateString()}</header>
      {currentUser && currentUser.id === postInfo?.author._id && currentUser.role === 'admin' && (
        <Link to={`/edit/${postInfo?._id}`} className="edit-button">Editar</Link>
      )}
      <img src={'http://localhost:4000/' + postInfo?.file} alt="Blog Post" />
      <p>{postInfo?.content}</p>
    </div>
  );
}