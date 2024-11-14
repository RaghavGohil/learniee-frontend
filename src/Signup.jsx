import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

function Signup({ onSignup }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signup } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, email, password, () => {
      navigate('/', { replace: true });
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#151617]">
      <div className="bg-[#1c1d1f] p-6 text-slate-100 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Name</label>
            <input
              type="text"
              className="w-full bg-[#151617] border-hidden p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#487db5]"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Email</label>
            <input
              type="email"
              className="w-full bg-[#151617] border-hidden p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#487db5]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Password</label>
            <input
              type="password"
              className="w-full bg-[#151617] border-hidden p-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-[#487db5]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#30353b] text-white p-2 rounded hover:bg-[#2b2e30]"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/" className="underline text-[#487db5]">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;

