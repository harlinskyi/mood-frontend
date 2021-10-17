import React from 'react';
import { Link } from 'react-router-dom';

const pageNotFound = () => (
    <div>
      <h1>404 - Page Not Found!</h1>
      <Link to="/">
        Go Home
      </Link>
    </div>
  );


  export default pageNotFound;