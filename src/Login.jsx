// src/components/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom' 
import axios from 'axios'

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(import.meta.env.VITE_APP_SERVER+'/api/auth/login',{
       'email':email,
       'password':password,
    })
    .then(res=>{
        console.log(res.data)
        navigate('/chats',{ replace: true}) // navigate to login
    })
    .catch(err=>{
        console.log('Unable to log in account: ', err)
    })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account? <a href="/signup" className="text-green-500">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;

