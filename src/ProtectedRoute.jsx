import { useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedPage = ({ children }) => {
    const { csrfToken } = useContext(AuthContext);
    const [authorize, setAuthorize] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_APP_SERVER}/api/auth/verify`, {
                    withCredentials: true,
                    headers: {
                        'x-csrf-token': csrfToken
                    }
                });
                setAuthorize(res.data.authenticated);
            } catch (err) {
                console.log(err);
                setAuthorize(false);
            }
        };
        verifyAuth();
    }, [csrfToken]);

    if (authorize === null) {
        return <div>Loading...</div>;
    }

    return authorize ? children : <Navigate to="/" replace />;
};

export default ProtectedPage;

