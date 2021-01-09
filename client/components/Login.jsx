import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
<<<<<<< Updated upstream
import { useAuth } from '../routes/useAuth';
=======
>>>>>>> Stashed changes
import axios from 'axios';
import { loginUser, useAuthContext } from '../state';

const Login = () => {
  const history = useHistory();
  const { authState, dispatch } = useAuthContext(); 

  // react hooks
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

<<<<<<< Updated upstream
  const auth = useAuth();
  // console.log('auth in Loginin Component', auth)
  const history = useHistory();

=======
>>>>>>> Stashed changes
  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = { username, password }

    try {
<<<<<<< Updated upstream
      const res = await axios.post('/user/login', { username, password });
      console.log('res==>', res);
   
        console.log('res.data ===> ', res.data);
        auth.login(res.data.id, res.data.email, () =>
          history.push('/dashboard')
        );
   
    } catch (error) {
       if (error.response.status === 401) {
         history.push('/');
       }
      console.log(
        'Error in handleSubmit of Login component: ',
        error.response.data.err
      );
=======
      await loginUser(dispatch, payload)
      history.push({
        pathname: '/',
      });
    } catch (error) {
      console.log('error-> ', error.response.data.err);
>>>>>>> Stashed changes
    }
  };

  return (
    <div className='outer-wrapper'>
      <div className='recent-posts'>
        <p align='left'>
          Get interview insights while you manage <br />
          every step in your job search, from application to offer.
        </p>
      </div>
      <div id="sign-up" className="login-wrapper">
        <form onSubmit={handleSubmit} id="list">
          <h1>Log in</h1>
          <>
            <p>Email</p>
            <input

              value={username}
              type='email'
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </>
          <>
            <p>Password</p>
            <input
              password={password}
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
          <div className="loginButtonWrapper">
            <button className="loginButton">Log in</button>
            <div><span style={{ color: '#727171', fontWeight: '300' }}>Don't have an account? <Link style={{ textDecoration: 'none', fontWeight: '400', color: '#3b3a3a' }} to="/signup">Create one</Link></span></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
