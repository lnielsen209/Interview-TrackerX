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
}
