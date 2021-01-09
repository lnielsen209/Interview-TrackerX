import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../routes/useAuth';
import axios from 'axios';

const Signup = () => {
  // react hooks
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const auth = useAuth();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // check if passwords match before submit
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
          console.log('res.data ===> ', res.data);
          auth.signup(res.data.id, res.data.email, () =>
            history.push('/dashboard')
          );
          console.log('auth.user in Signup Component ===> ', auth.user);
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
          <h1>Create an Account</h1>
          <>
            <p>First Name</p>
            <input
              className="inputSignUp"
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </>
          <>
            <p>Last Name</p>
            <input
              className="inputSignUp"
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </>
          <>
            <p>Email Address</p>
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
            <p>Re-enter password</p>
            <input
              className="inputSignUp"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </>
          <button>Create Account</button>
          <Link to="/">
            <button>Back</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signup;
