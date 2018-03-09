import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
          </a>

          <div className="navbar-burger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    )
  }
}
