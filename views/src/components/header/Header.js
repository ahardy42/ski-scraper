import React from 'react';
import Links from './Links';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <a className="navbar-brand" href="/">The Wax Scraper | Skiing News Aggregator</a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <Links />
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;