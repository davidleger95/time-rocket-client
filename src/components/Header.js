import React from 'react';

import logo from '../logo.svg';

export default function Header() {
  return (
    <header className="Header">
      <img src={logo} className="logo" alt="logo" />
      <h1>Welcome to React</h1>
    </header>
  );
}
