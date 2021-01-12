import React from 'react';
import { Link } from 'react-router-dom';
import SignoutButton from '../MainNav/SignoutButton';
import { useAuth } from '../../../routes/useAuth';

const MainNav = () => {
  const auth = useAuth();

  return (
    <nav className="MainNav">
      <Link className="title" to="/">
        Interview Tracker
      </Link>
      <div>{auth.user.id && <SignoutButton />}</div>
    </nav>
  );
};

export default MainNav;
