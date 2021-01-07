import React from 'react';
import { useContext } from 'react';
import Login from './Login';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App.jsx';

export default function signout() {
  const context = useContext(UserContext);
  let history = useHistory();
  console.log('history==>', history);
  const handleClick = async (e) => {
    const resp = await fetch(`/user/logout`, {
      method: 'GET',
      headers: { 'content-type': 'application/JSON' },
    });
    console.log('status===>', resp.status);
    if (resp.status === 200) {
      console.log('im in this block');
      console.log('context---->', context);
      context.saveUser(null);
      history.push('/');
    }
  };

  return <button onClick={handleClick}>logout</button>;
}
