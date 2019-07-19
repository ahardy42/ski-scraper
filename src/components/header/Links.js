import React from 'react';
import './Header.css';

class Links extends React.Component {
    render() {
        return (
            <ul className="navbar-nav">
                <li class="nav-item active">
                    <a class="nav-link" href="/">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="/Saved">Saved Articles</a>
                </li>
            </ul>
        );
    }
}

export default Links;