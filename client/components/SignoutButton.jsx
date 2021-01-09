import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
<<<<<<< Updated upstream
import { useAuth } from '../routes/useAuth';
=======
import { UserContext } from '../index';
>>>>>>> Stashed changes
import axios from 'axios';

const SignoutButton = () => {
  const auth = useAuth();
  const history = useHistory();

  const handleClick = async (e) => {
    try {
      // We don't need to make an http request to logout
      const res = await axios.get('/user/logout');
      if (res.status === 200) {
<<<<<<< Updated upstream
        auth.signout(() => history.push('/'));
=======
        console.log('res.status in SignoutButton Component ===> ', res.status);
        context.saveUser(null);
        history.push('/');
>>>>>>> Stashed changes
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
