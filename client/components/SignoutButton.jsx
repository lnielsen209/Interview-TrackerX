import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../routes/useAuth';
import axios from 'axios';

const SignoutButton = () => {
  const auth = useAuth();
  const history = useHistory();

  const handleClick = async (e) => {
    try {
      const res = await axios.get('/user/logout');
      if (res.status === 200) {
        auth.signout(() => history.push('/'));
      }
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/');
      }
      console.log(
        'Error in handleSubmit of Logout component:',
        error.response.data.err
      );
    }
  };

  return <button onClick={handleClick}>Log Out</button>;
};

export default SignoutButton;
