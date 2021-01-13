import React from 'react';

export default function oAuth() {
  const handleClick = (e) => {
    e.preventDefault();
  };

  return <button onClick={handleClick}>Sign in with Google</button>;
}
