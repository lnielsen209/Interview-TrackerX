import React, { useContext } from 'react';
import { UserContext } from '../../index';

export async function loginUser(dispatch, loginPayload) {
  let token = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user')).token
    : '';

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `${token}` },
    body: JSON.stringify(loginPayload),
  };
  console.log("loginPayload",loginPayload)

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`/user/login`, requestOptions);
    let data = await response.json();
    const context = useContext(UserContext);
    context.saveUser(data.id);
    // data.user 
    if (data.id) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('user', JSON.stringify(data));
      console.log("data ", data)
    }
    dispatch({ type: 'ERROR', payload: data.message });
  } catch (error) {
    dispatch({ type: 'ERROR', payload: error });
  }
}

export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('user');
}
