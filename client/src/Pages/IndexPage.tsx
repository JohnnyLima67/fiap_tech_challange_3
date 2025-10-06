import { useEffect, useState } from "react";
import Post from "../Post";

interface PostType {
    title: string;
    content: string;
    summary: string;
    file: string;
    createdAt: string;
    author: { username: string; };
    _id: string;
    // outros campos que o componente <Post /> espera
}

export default function IndexPage() {
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        fetch("http://localhost:4000/posts")
            .then(res => res.json())
            .then(data => setPosts(data));
    }, []);

    return (
        <>
            {posts.length > 0 && posts.map(post => (
                <Post {...post} />
            ))}
        </>
    );
}