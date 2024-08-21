import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Home() {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post(`${process.env.SERVER_URL}/api/auth/logout`, {}, { withCredentials: true });
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
        }
    };

    useEffect(() => {
        const fetchProtectedContent = async () => {
            try {
                const response = await axios.get(`${process.env.SERVER_URL}/home`, { withCredentials: true });
                setMessage(response.data.message);
            } catch (err) {
                console.error('Not authenticated', err);
                navigate('/login');
            }
        };

        fetchProtectedContent();
    }, [navigate]);

    return (
        <div>
            <h2>{message}</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Home;
