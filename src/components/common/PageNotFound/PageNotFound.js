import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => (
    <div>
      <h1>Oops! Somethings is wrong.</h1>
      <Link to="/">
        Go Home
      </Link>
    </div>
  );

export default PageNotFound;
