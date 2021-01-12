import React from 'react';

export default function oAuth() {
  return (
    <button>
      <a
        target='_blank'
        href='/auth/google'
        style={{ textDecoration: 'none', color: 'white' }}
      >
        login with Google
      </a>
    </button>
  );

  // export default function oAuth() {
  //   const redirectGoogle = () => {
  //     fetch('auth/google')
  //       .then((res) => {
  //         console.log('res==>', res);
  //       })
  //       .catch((err) => {
  //         console.log('err==>', err);
  //       });
  //   };

  // export default function oAuth() {
  //   const redirectGoogle = async () => {
  //     const response = await fetch('/auth/google', {
  //       method: 'GET', // *GET, POST, PUT, DELETE, etc.
  //       mode: 'no-cors', // no-cors, *cors, same-origin
  //     });
  //     console.log('response===>', response);
  //   };

  //   return <button onClick={redirectGoogle}>login with Google</button>;
}
