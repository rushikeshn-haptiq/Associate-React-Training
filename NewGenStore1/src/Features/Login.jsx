import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const usersRes = await fetch('https://dummyjson.com/users');
      const usersData = await usersRes.json();
      const foundUser = usersData.users.find(user => user.email === email);

      if (!foundUser) {
        alert('No user found with this email');
        return;
      }

      const loginRes = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: foundUser.username,
          password: password,
        }),
      });

      const loginData = await loginRes.json();

      if (!loginRes.ok) {
        alert(loginData.message || 'Invalid credentials');
        return;
      }

      dispatch(login(loginData));
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Try again!');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1650&q=80')",
      }}
    >
      <div className="bg-white/30 backdrop-blur-lg rounded-lg shadow-lg p-8 w-full max-w-md mx-4 md:mx-0">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Welcome Back 👋</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-white/40 rounded bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-white/40 rounded bg-white/20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
  