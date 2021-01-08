import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App.jsx';
import axios from 'axios';

const SignoutButton = () => {
  const context = useContext(UserContext);
  const history = useHistory();

  const handleClick = async (e) => {
    try {
      const res = await axios.get('/user/logout');
      if (res.status === 200) {
        console.log('res.status in SignoutButton Component ===> ', res.status);
        context.saveUser(null);
        history.push('/');
      }
    } catch (error) {
      console.log('Error in handleSubmit of Logout component:', error);
    }
  };

  return <button onClick={handleClick}>Log Out</button>;
};

export default SignoutButton;
