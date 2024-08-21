import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.SERVER_URL}/api/auth/login`, { username, password }, { withCredentials: true });
            navigate('/home');
        } catch (err) {
            console.error('Login failed', err);
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <p>username = user, password = password</p>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
