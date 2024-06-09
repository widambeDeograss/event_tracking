"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context'; // Adjust the path as needed
import Alert from '@/components/Alert'; // Adjust the path as needed

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState({ message: '', type: 'info' });
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      // setAlert({ message: 'Login successful!', type: 'success' });
    } catch (error) {
      console.error('Login failed:', error);
      setAlert({ message: 'Login failed. Please check your credentials and try again.', type: 'error' });
    }
  };

  return (
    <div className='flex flex-col items-center'>
      {alert.message && (
        <Alert message={alert.message} type={alert.type} onClose={() => setAlert({ message: '', type: 'info' })} />
      )}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col justify-center items-center gap-5 max-w-lg shadow-2xl shadow-gray-900 py-10 hover:shadow-gray-300 bg-white mx-auto rounded-md text-gray-900 mt-20 text-xs px-10'
      >
        <h3 className='text-xl font-bold'>EventTracking</h3>
        <h3 className='text-xs'>Log In To continue</h3>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Username
          </span>
          <input
            required
            type="text"
            name="email"
            className="mt-1 px-3 py-4 w-[350px] md:w-[450px] bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 text-xs"
            placeholder="Enter your username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="block">
          <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
            Password
          </span>
          <input
            required
            type="password"
            name="password"
            className="mt-1 w-[350px] md:w-[450px] px-3 py-4 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 text-xs"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        
        <span className='block w-full mr-auto ml-7'>Don't have an account? <Link className='text-blue-700 font-bold' href="/signup">Sign Up</Link></span>
        <button className='bg-[#6476F3] text-white rounded-md p-[10px] w-[90%]' type="submit">Log In</button>
      </form>
    </div>
  );
};

LoginPage.useLayout = false;

export default LoginPage;
