import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const [csrfToken , setCsrfToken] = useState(null)
    const [userData, setUserData] = useState(null)

    useEffect(() => {
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
            setUserData({
                id: res.data.tokenData.id,
                username: res.data.tokenData.username,
                email: res.data.tokenData.email,
            })
            setCsrfToken(res.data.tokenData.csrfToken) // for now store this in local storage (use global context)
            callback() // do anything here after login
        }catch(err){
            console.log('Unable to log in account: ', err)
        } 
    };

    const logout = (callback) => {
        setUserData(null)
        setCsrfToken(null)
        callback()
    };

    return (
        <AuthContext.Provider value={{ csrfToken, userData, signup, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

