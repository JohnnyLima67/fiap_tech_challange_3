import { useState } from "react";
import { Navigate } from "react-router-dom";


export default function CreatePost() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev: React.FormEvent) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        if (file) {
            data.set('file', file);
        }
        ev.preventDefault();
        const response = await fetch('http://localhost:4000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if (response.ok) {
            setRedirect(true);
        } else {
            alert('Failed to create post.');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }
    
    return(
        <form className="create-post" onSubmit={createNewPost}>
            <h1>Create New Post</h1>
            <input type="title" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
            <input type="summary" placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)} />
            <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
            <textarea name="content" id="content" cols={30} rows={10} placeholder="Content" value={content} onChange={e => setContent(e.target.value)}></textarea>
            <button type="submit">Create Post</button>
        </form>
    );
}