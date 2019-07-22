import React from 'react';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-white">
                <span className="navbar-brand mb-0 h1">The Wax Scraper | Nordic Skiing News</span>
                <div className="d-flex">
                    <ul className="nav justify-content-end">
                        <li className="nav-item">
                            <NavLink exact to="/" className="nav-link" activeClassName="nav-link active">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/saved" className="nav-link" activeClassName="nav-link active">Saved Articles</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;