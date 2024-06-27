import React from 'react';
import logo from '../assets/logo2.avif'; // Make sure this path is correct

function Logo({ width = "100px" }) {
  return (
    <div>
      <img src={logo} alt="Logo" style={{ width }} />
    </div>
  );
}

export default Logo;
