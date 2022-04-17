import React, { Component } from 'react';
import Link from 'next/link';
import IconETH from './IconETH';
import Logo from './Logo';

class Nav extends Component {
  render() {
    return (
      <nav className="nav">
        <div className="container">
          <Logo />
          <div className="nav-links">
            <Link href="/portals">Portals</Link>
            <a href="/">Guides</a>
            <button className="button small">
              <IconETH /> Connect
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default Nav;
