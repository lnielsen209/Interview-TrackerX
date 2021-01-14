import React from 'react';

export default function oAuth() {
  return (
    <div>
      <button>
        <a
          // target='_blank'
          href='/auth/google'
          style={{ textDecoration: 'none', color: 'white' }}
        >
          Signin with Google
        </a>
      </button>
      <button>
        <a
          // target='_blank'
          href='/auth/github'
          style={{ textDecoration: 'none', color: 'white' }}
        >
          Signin with Github
        </a>
      </button>
    </div>
  );
}
