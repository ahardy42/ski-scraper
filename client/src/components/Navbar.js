import React from 'react';

class Navbar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-light mb-4">
                <span className="navbar-brand mb-0 h1">The Wax Scraper | Nordic Skiing News</span>
                <div className="d-flex">
                    <ul class="nav justify-content-end">
                        <li class="nav-item">
                            <a class="nav-link active" href="/">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/saved">Saved Articles</a>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;