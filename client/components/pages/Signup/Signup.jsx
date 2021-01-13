import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../../routes/useAuth';
import PageLayout from '../../common/PageLayout';
import styled from 'styled-components';
import {
  StyledFormLabel,
  StyledFormInput,
  StyledButton,
  StyledFormWrapper,
  StyledH1,
  StyledH3,
} from '../../common';
import axios from 'axios';

const H1 = styled(StyledH1)`
  margin-bottom: 8px;
`;

const H3 = styled(StyledH3)``;

const Div = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const SignupWrapper = styled(StyledFormWrapper)``;

const SignupLabal = styled(StyledFormLabel)``;

const SignupInput = styled(StyledFormInput)`
  height: 42px;
  margin: 4px 0px 8px 0px;
`;

const SignupButton = styled(StyledButton)``;

const SigninButton = styled(StyledButton)``;

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
        // console.log('res.data ===> ', res.data);
        auth.signup(res.data.id, res.data.email, () => history.push('/'));
        // console.log('auth.user in Signup Component ===> ', auth.user);
      } catch (error) {
        if (error.response.status === 401) {
          history.push('/signin');
        }
        console.log(
          'Error in handleSubmit of Signup component:',
          error.response.data.err
        );
      }
    }
  };

  return (
    <PageLayout>
      <SignupWrapper>
        <form onSubmit={handleSubmit} id="list">
          <H1 center>Create an Account</H1>
          <Div>
            <H3 light>Already have an account?</H3>
            <Link to="/signin">
              <SigninButton secondary small>
                Sign In
              </SigninButton>
            </Link>
          </Div>
          <>
            <SignupLabal light>First Name</SignupLabal>
            <SignupInput
              className="inputSignUp"
              type="text"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </>
          <>
            <SignupLabal light>Last Name</SignupLabal>
            <SignupInput
              className="inputSignUp"
              type="text"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </>
          <>
            <SignupLabal light>Email Address</SignupLabal>
            <SignupInput
              className="inputSignUp"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </>
          <>
            <SignupLabal light>Password</SignupLabal>
            <SignupInput
              className="inputSignUp"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </>
          <>
            <SignupLabal light>Re-enter password</SignupLabal>
            <SignupInput
              className="inputSignUp"
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </>
          <SignupButton>Sign Up</SignupButton>
        </form>
      </SignupWrapper>
    </PageLayout>
  );
};

export default Signup;
