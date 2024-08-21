'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedPage() {
    const [message, setMessage] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchProtectedContent = async () => {
            try {
                const res = await fetch('/api/home', { credentials: 'include' });
                if (res.status === 401) {
                    router.push('/login');
                } else {
                    const data = await res.json();
                    setMessage(data.message);
                }
            } catch (err) {
                console.error('Failed to fetch protected content', err);
                router.push('/login');
            }
        };

        fetchProtectedContent();
    }, [router]);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
            router.push('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    return (
        <div>
            <h2>{message}</h2>
            <button onClick={handleLogout} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Logout</button>
        </div>
    );
}
