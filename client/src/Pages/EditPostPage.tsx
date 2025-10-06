import React, { use, useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { set } from "mongoose";

export default function EditPostPage() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [redirect, setRedirect] = useState(false);

    const { id } = useParams();
    interface PostInfo {
    title: string;
    summary: string;
    content: string;
    file: string;
    createdAt: string;
    author: { username: string, _id: string };
    _id: string;
    // add other properties if needed
    }
    const [postInfo, setPostInfo] = useState<PostInfo | null>(null);

    useEffect(() => {
    fetch(`http://localhost:4000/posts/${id}`)
        .then(res => res.json())
        .then(postInfo => setPostInfo(postInfo));
    }, [id]);
    
    useEffect(() => {
        if (postInfo) {
            setTitle(postInfo.title);
            setSummary(postInfo.summary);
            setContent(postInfo.content);
        }
    }, [postInfo]);


    async function updatePost(ev: React.FormEvent) {
        ev.preventDefault();
        if (postInfo) {
            const data = new FormData();
            data.set('title', title);
            data.set('summary', summary);
            data.set('content', content);
            if (file) {
                data.set('file', file);
            }

            const response = await fetch(`http://localhost:4000/posts/${postInfo._id}`, {
                method: 'PUT',
                body: data,
                credentials: 'include',
            });
            console.log(response);
            if (response.ok) {
                setRedirect(true);
            }
        }
    }

    async function deletePost() {
        if (postInfo && window.confirm("Tem certeza que deseja excluir este post?")) {
            const response = await fetch(`http://localhost:4000/posts/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                setRedirect(true);
            }
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    
    return(
        <form className="create-post" onSubmit={updatePost}>
            <h1>Update  Post</h1>
            <input type="title" placeholder={title} value={title} onChange={e => setTitle(e.target.value)} />
            <input type="summary" placeholder={summary} value={summary} onChange={e => setSummary(e.target.value)} />
            
            {file ? (
            <div style={{ marginBottom: '1rem' }}>
                <span style={{ marginRight: '1rem' }}>{file.name}</span>
                <button type="button" onClick={() => setFile(null)}>Remover arquivo</button>
            </div>
            ) : postInfo?.file ? (
            <div style={{ marginBottom: '1rem' }}>
                <span style={{ marginRight: '1rem' }}>{postInfo.file}</span>
                <button type="button" onClick={() => setPostInfo(prev => prev ? { ...prev, file: '' } : null)}>Remover arquivo</button>
            </div>
            ) : (
            <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
            )}

            <textarea name="content" id="content" cols={30} rows={10} placeholder={content} value={content} onChange={e => setContent(e.target.value)}></textarea>
            <button type="submit">Update Post</button>
            <button type="button" onClick={deletePost} style={{ backgroundColor: '#e74c3c', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px' }}>
                Delete Post
            </button>
        </form>
    );
}