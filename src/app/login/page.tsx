'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push('/protected');
            } else {
                alert('Login failed');
            }
        } catch (err) {
            console.error('Login failed', err);
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className='border-2 border-black'
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className='border-2 border-black'
            />
            <button type="submit" className='border-2 border-black'>Login</button>
        </form>
    );
}
