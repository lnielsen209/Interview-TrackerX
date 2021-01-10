import React from 'react';
import { Link } from 'react-router-dom';
import SignoutButton from './SignoutButton';
import { useAuth } from '../routes/useAuth';

export default function MainNav() {
  const auth = useAuth();

  return (
    <nav className="MainNav">
      <Link className="title" to="/">
        Interview Tracker
      </Link>
      <Link className="home" to="/">
        Home
      </Link>
      <Link className="aboutUs" to="/team">
        About Us
      </Link>
      {auth.user.id && <SignoutButton />}
    </nav>
  );
}
