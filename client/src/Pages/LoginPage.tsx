import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../UserContext";

export default function LoginPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUserInfo} = useContext(UserContext);

    async function login(e: React.FormEvent){
        e.preventDefault();
        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });
        if(response.status === 200){
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
                console.log(userInfo);
            });
        } else {
            alert('Login failed');
        }
    }
    
    if(redirect){
        return <Navigate to={'/'} />
    }
    return(
       <form className="login" onSubmit={login}>
        <h1>Login</h1>
        <input type="username" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
       </form>
    );
}
