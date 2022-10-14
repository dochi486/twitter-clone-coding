import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/orofile">Profile</Link>
      </li>
    </ul>
  </nav>;
};

export default Navigation;
