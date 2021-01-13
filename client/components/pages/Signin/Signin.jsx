import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../routes/useAuth';
import PageLayout from '../../common/PageLayout';
import {
  H1,
  PLeft,
  PCenter,
  SigninWrapper,
  Input,
} from '../../../style/styled';
import OAuth from './oAuth';
import axios from 'axios';

const Signin = () => {
  // react hooks
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const auth = useAuth();
  // console.log('auth in Signin Component', auth)
  const history = useHistory();

  useEffect(() => {
    oauthSignin();
  }, []);

  const oauthSignin = async () => {
    try {
      const res = await axios.get(`/auth/signin`);
      console.log('res==>', res.data);

      auth.signin(res.data.id, res.data.email, () => history.push('/'));
    } catch (error) {
      console.log('error==>', error);
      if (error.response.status === 401) {
        history.push('/signin');
      }
      console.log('Error in authSign: ', error.response);
    }
  };

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
    <PageLayout className='outer-wrapper'>
      <div>
        <H1>Get interview insights while you manage</H1>
        <H1>every step in your job search, from application to offer.</H1>
      </div>
      <SigninWrapper>
        <form onSubmit={handleSubmit}>
          <>
            <PLeft>Email</PLeft>
            <Input
              value={username}
              type='email'
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </>
          <>
            <PLeft>Password</PLeft>
            <Input
              password={password}
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
          <div className='signinButtonWrapper'>
            <button className='signinButton'>Log in</button>
            <PCenter>or</PCenter>
            <OAuth />
            <Link to='/signup'>
              <button className='signupButton'>Sign up</button>
            </Link>
          </div>
        </form>
      </SigninWrapper>
    </PageLayout>
  );
};

export default Signin;
