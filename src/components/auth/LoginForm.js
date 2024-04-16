
import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import UserContext from '../contextAPI/UserContext'; 
import App from '../../App';

function LoginForm() {
  const { setFname } = useContext(UserContext); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [storedEmail, setStoredEmail] = useState('');
  const [storedPassword, setStoredPassword] = useState('');
  const [storedFname, setStoredFname] = useState('');

  useEffect(() => {
    const storedSignupInfo = localStorage.getItem('signupInfo');
    if (storedSignupInfo) {
      const { fname: storedFname, email: storedEmail, password: storedPassword } = JSON.parse(storedSignupInfo);
      setStoredEmail(storedEmail);
      setStoredPassword(storedPassword);
      setStoredFname(storedFname)
      setFname(storedFname); 
    }
  }, [setFname]); 


  const handleSubmit = (e) => {
  e.preventDefault();
  if (!email || !password) {
    setErrorMessage('Please provide both email and password.');
    return;
  }

  if (email === storedEmail && password === storedPassword) {
    setLoginSuccess(true);
    setEmail('');
    setPassword('');
    setErrorMessage('');
  } else {
    console.log(storedFname);
    setErrorMessage('Invalid email or password. Please try again.');
  }
};


  const handleClear = () => {
    setEmail('');
    setPassword('');
    setErrorMessage('');
  };

   if (loginSuccess) {
    return <App />;
  }

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-opacity-100 bg-white bg-blur p-10 rounded-md shadow-lg w-full sm:max-w-sm">
        <h2 className="text-green-500 text-3xl font-bold mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="bg-gray-200 bg-opacity-50 backdrop-blur-sm w-full py-2 px-4 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-gray-200 bg-opacity-50 backdrop-blur-sm w-full py-2 px-4 rounded-md text-gray-800 placeholder-gray-500 focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <button
            type="submit"
            className="w-[49] bg-green-500 font-bold text-white py-2 px-10 m-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-400"
          >
            Log In
          </button>
          <button
            onClick={handleClear}
            className="w-[49]  font-bold border-2 border-gray-600 border py-2 px-10 m-2 rounded-md hover:border-gray focus:outline-none "
          >
            Clear
          </button>
          {errorMessage && <p className="text-green-500 text-sm">{errorMessage}</p>}
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-400">Already have an account?</span>{' '}
          <NavLink className='text-green-500 font-bold' to='/signup'>
              Signup
          </NavLink>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LoginForm;
