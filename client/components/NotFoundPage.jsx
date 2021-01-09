import React from 'react';
import { Link } from 'react-router-dom';

const textParagraph = `Unfortunately the page you're looking for doesn't exist(anymore) or there
was an error in the link you follow or typed`;

function NotFoundPage() {
  return (
    <>
      <h1>page not found</h1>
      <p>{textParagraph}</p>
      <Link to="/">Go to HomePage</Link>
    </>
  );
};

export default NotFoundPage;
