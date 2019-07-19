import React from 'react';
import './Header.css';

class Links extends React.Component {
    render() {
        return (
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="/Saved">Saved Articles</a>
                </li>
            </ul>
        );
    }
}

export default Links;