import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../routes/useAuth';
import PageLayout from '../../common/PageLayout';
import styled from 'styled-components';
import {
  StyledFormLabel,
  StyledFormInput,
  StyledFormPWDInput,
  StyledButton,
  StyledFormWrapper,
  StyledH1,
  StyledH3,
} from '../../common';
import { Theme } from '../../../style/Theme';
import OAuth from './oAuth';
import axios from 'axios';

const Title = styled(StyledH1)`
  font-family: sans-serif;
  font-size: 42px;
  font-weight: 200;
  line-height: 50px;
  color: ${Theme.primary};
`;

const H1 = styled(StyledH1)`
  margin-bottom: 8px;
`;

const H3 = styled(StyledH3)``;

const Div = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const SigninWrapper = styled(StyledFormWrapper)``;

const SigninLabal = styled(StyledFormLabel)``;

const SigninInput = styled(StyledFormInput)``;

const SigninButton = styled(StyledButton)``;

const SignupButton = styled(StyledButton)``;

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
      console.log('res.data ==>', res.data);

      auth.signin(res.data.id, res.data.email, res.data.firstname, () =>
        history.push('/')
      );
    } catch (error) {
      // console.log('error==>', error);
      if (error.response.status === 401) {
        history.push('/signin');
      }
      console.log(
        'Error in authSign  in Signin component: ',
        error.response.data.err
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('/user/signin', { username, password });

      // console.log('res.data ===> ', res.data);
      auth.signin(res.data.id, res.data.email, res.data.firstname, () =>
        history.push('/')
      );
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/signin');
      }
      console.log(
        'Error in handleSubmit in Signin component: ',
        error.response.data.err
      );
    }
  };

  return (
    <PageLayout>
      <div>
        <Title center>Get interview insights while you manage</Title>
        <Title center>
          every step in your job search, from application to offer.
        </Title>
      </div>
      <SigninWrapper>
        <form onSubmit={handleSubmit}>
          <H1 center>Welcome Back</H1>
          <Div>
            <H3 light>New to Interview Tracker?</H3>
            <Link to='/signup'>
              <SignupButton secondary small>
                Sign Up
              </SignupButton>
            </Link>
          </Div>
          <>
            <SigninLabal light>Email</SigninLabal>
            <SigninInput
              value={username}
              type='email'
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </>
          <>
            <SigninLabal light>Password</SigninLabal>
            <StyledFormPWDInput
              password={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
          <>
            <SigninButton>Sign In</SigninButton>
          </>
          <>
            <SigninLabal light center>
              or
            </SigninLabal>
          </>
          <>
            <OAuth />
          </>
        </form>
      </SigninWrapper>
    </PageLayout>
  );
};

export default Signin;
