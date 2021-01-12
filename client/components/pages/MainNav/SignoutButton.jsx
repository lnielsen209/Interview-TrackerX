import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../routes/useAuth';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const SignoutButton = () => {
  const auth = useAuth();
  const history = useHistory();

  const handleClick = async (e) => {
    try {
      const res = await axios.get('/user/logout');
      if (res.status === 200) {
        auth.signout(() => history.push('/login'));
      }
    } catch (error) {
      if (error.response.status === 401) {
        history.push('/login');
      }
      console.log(
        'Error in handleSubmit of Logout component:',
        error.response.data.err
      );
    }
  };

  return (
    <button onClick={handleClick}>
      <FontAwesomeIcon icon={faSignOutAlt} />
      Sign Out
    </button>
  );
};

export default SignoutButton;
