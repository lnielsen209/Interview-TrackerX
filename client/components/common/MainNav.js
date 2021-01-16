import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SignoutButton from '../common/SignoutButton';
import { useAuth } from '../../routes/useAuth';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  height: 10vh;
  width: 100%;
  padding: 0 10vw;
  position: fixed;
  top: 0;
`;

const MainNav = () => {
  const auth = useAuth();
  //console.log('authmainNav==>', auth);

  return (
    <Nav className='MainNav'>
      <Link className='title' to='/'>
        Interview Tracker
      </Link>

      <div>{auth.user.id && <SignoutButton />}</div>
      <div>
        {auth.user.id && auth.user.avatar.includes('http') ? (
          <img
            src={auth.user.avatar}
            alt='avatar'
            style={{ heigh: '25px', width: '25px' }}
          />
        ) : (
          <img
            src={`/avatarImages/${auth.user.avatar}`}
            alt='avatar'
            style={{ heigh: '25px', width: '25px' }}
          />
        )}
      </div>

      <div>
        {auth.user.id && (
          <p>
            <span>Hi, </span> {auth.user.firstname}
          </p>
        )}
      </div>
      <div>
        {auth.user.email && (
          <a
            href={`mailto:${auth.user.email}`}
            data-toggle='tooltip'
            title='Send an Email to yourself!'
            style={{ color: 'black' }}
          >
            {auth.user.email}
          </a>
        )}
      </div>
    </Nav>
  );
};

export { MainNav };
