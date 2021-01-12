import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../routes/useAuth';

import OAuth from './oAuth';
import axios from 'axios';

const Signin = () => {
  // react hooks
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();
  // console.log('auth in Signin Component', auth)
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/user/signin', { username, password });

      // console.log('res.data ===> ', res.data);
      auth.signin(res.data.id, res.data.email, () => history.push('/'));
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/signin');
      }
      console.log(
        'Error in handleSubmit of Signin component: ',
        error.response.data.err
      );
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
      <OAuth />
      <div className="signin-wrapper">
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
          <div className="signinButtonWrapper">
            <button className="signinButton">Log in</button>
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

export default Signin;
