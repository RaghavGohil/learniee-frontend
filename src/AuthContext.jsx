import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [csrfToken , setCsrfToken] = useState(null);

    useEffect(() => {
        // Optional: Load token from localStorage or cookie on app start
        //const savedToken = localStorage.getItem('authToken');
        //if (savedToken) {
        //    setAuthToken(savedToken);
        //    setIsAuthenticated(true);
        //}
    }, []);

    const signup = async (username, email, password, callback) => {
        try{
            axios.post(import.meta.env.VITE_APP_SERVER+'/api/auth/signup',{
                'username':username,
                'email':email,
                'password':password,
            })
            callback()
        }catch(err){
            console.log('Unable to create an account: ', err)
        }
    }

    const login = async (email, password, callback) => {
        try{
            const res = await axios.post(import.meta.env.VITE_APP_SERVER+'/api/auth/login',{
               'email':email,
               'password':password,
            },{
               withCredentials: true 
            })
            localStorage.setItem('username',res.data.tokenData.username) // change later
            setCsrfToken(res.data.tokenData.csrfToken) // for now store this in local storage (use global context)
            callback() // do anything here after login
        }catch(err){
            console.log('Unable to log in account: ', err)
        } 
    };

    const logout = () => {
        // Clear token and authentication status
        setAuthToken(null);
        setCsrfToken(null);
    };

    return (
        <AuthContext.Provider value={{ csrfToken, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

