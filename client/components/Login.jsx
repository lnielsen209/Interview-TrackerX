import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App.jsx';
import axios from 'axios';

const Login = () => {
  // react hooks
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const context = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/user/login', { username, password });
      if (res.status === 200) {
        console.log('res.data ===> ', res.data);
        context.saveUser(res.data.id);
        history.push('/dashboard');
      }
    } catch (error) {
      console.log('Error in handleSubmit of Login component:', error);
    }
  };

  return (
    <div className="outer-wrapper">
      <div className="recent-posts">
        <p align="left">
          Get interview insights while you manage <br />
          every step in your job search, from application to offer.
        </p>
      </div>
      <div className="login-wrapper">
        <h1>Log in:</h1>
        <form onSubmit={handleSubmit}>
          <>
            <p>Email</p>
            <input
              value={username}
              type="email"
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </>
          <>
            <p>Password</p>
            <input
              password={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
          <div className="loginButtonWrapper">
            <button className="loginButton">Log in</button>
            <p>or</p>
            <Link to="/signup">
              <button className="signupButton">Sign up</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
