import React from 'react';
import { Link } from 'react-router-dom';
import SignoutButton from './SignoutButton';
import { useAuth } from '../routes/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers } from '@fortawesome/free-solid-svg-icons';

export default function MainNav() {
  const auth = useAuth();

  return (
    <nav className="MainNav">
      <Link className="title" to="/">
        Interview Tracker
      </Link>
      <Link className="home" to="/">
        <FontAwesomeIcon icon={faHome} />
        Home
      </Link>
      <Link className="aboutUs" to="/team">
        <FontAwesomeIcon icon={faUsers} />
        About Us
      </Link>
      <div>{auth.user.id && <SignoutButton />}</div>
    </nav>
  );
}
