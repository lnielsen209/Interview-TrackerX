import React from 'react';

export default function oAuth() {
  const handleClick = (e) => {
    e.preventDefault();
  };

  return <button onClick={handleClick}>login with Google</button>;
}
