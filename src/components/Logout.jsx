import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        const performLogout = async () => {
            try {
                await axios.post(`${process.env.SERVER_URL}/api/auth/logout`, {}, { withCredentials: true });
                navigate('/login');
            } catch (err) {
                console.error('Logout failed', err);
            }
        };

        performLogout();
    }, [navigate]);

    return <h2>Logging out...</h2>;
}

export default Logout;
