import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
<<<<<<< Updated upstream
import { useAuth } from '../routes/useAuth';
=======
import { UserContext } from '../index';
>>>>>>> Stashed changes
import axios from 'axios';
import { loginUser, useAuthContext } from '../state';

const Signup = () => {
  const history = useHistory();
  const { authState, dispatch } = useAuthContext();

  // react hooks
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

<<<<<<< Updated upstream
  const auth = useAuth();
  const history = useHistory();
=======
  const context = useContext(UserContext);

  const handleLogin = async () => {
    let payload = { email, password };
    try {
      await loginUser(dispatch, payload); //loginUser action makes the request and handles all the neccessary state changes
      //navigate to dashboard on success
      history.push({
        pathname: '/',
      });
    } catch (error) {
      console.log(error);
    }
  };
>>>>>>> Stashed changes

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      alert('password does not match');
    } else {
      try {
        const res = await axios.post('/user/signup', {
          first_name,
          last_name,
          email,
          password,
        });
<<<<<<< Updated upstream
          console.log('res.data ===> ', res.data);
          auth.signup(res.data.id, res.data.email, () =>
            history.push('/dashboard')
          );
          console.log('auth.user in Signup Component ===> ', auth.user);
=======
        // refactor
        if (res.status === 200) {
          handleLogin()
          context.saveUser(res.data.id);
        }
>>>>>>> Stashed changes
      } catch (error) {
           if (error.response.status === 401) {
             history.push('/');
           }
        console.log(
          'Error in handleSubmit of Signup component:',
          error.response.data.err
        );
      }
    }
  };

  return (
    <div id="wrapper">
      <div id="sign-up" className="login-wrapper">
        <form onSubmit={handleSubmit} id="list">
          <h1>Let's get started</h1>
          <>
            <p>First name</p>
            <input
              className="inputSignUp"
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </>
          <>
            <p>Last name</p>
            <input
              className="inputSignUp"
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </>
          <>
            <p>Email address</p>
            <input
              className="inputSignUp"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>
          <>
            <p>Password</p>
            <input
              className="inputSignUp"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
          <>
            <p>Confirm password</p>
            <input
              className="inputSignUp"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </>
          <button className="loginButton">Create Account</button>
          <div style={{ textAlign: "center" }}><Link style={{ textDecoration: 'none', fontWeight: '400', color: '#3b3a3a' }} to="/">Already have an account? </Link></div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
