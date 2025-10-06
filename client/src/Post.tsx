import { Link } from "react-router-dom";

type PostProps = {
  title: string;
  summary: string;
  file: string;
  content: string;
  createdAt: string | number | Date;
  author: {
    username: string;
  };
  _id: string;
};

export default function Post({title, summary, file, content, createdAt, author, _id}: PostProps) {
  return (
<div className="post">
      <Link to={'/post/' + encodeURIComponent(_id)} className="image-link">
        <img src={'http://localhost:4000/' + file} alt="Blog Post" />
      </Link>
      <div className="content">
        <Link to={'/post/' + encodeURIComponent(_id)} className="title-link">
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <span className="author">{author.username}</span>
          <time>{new Date(createdAt).toLocaleString()}</time>
        </p>
        <p className="summary">
          {summary}
        </p>
        <Link to={'/post/' + encodeURIComponent(_id)} className="read-more">Ver postagem completa</Link>
      </div>
    </div>
  );
}