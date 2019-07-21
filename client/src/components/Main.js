import React from 'react';
import List from './List';

class Main extends React.Component {
    render() {
        return (
            <div className="container">
                <ul className="list-unstyled">
                    {this.props.articles.map(article => {
                        return <List article={article} />
                    })}
                </ul>
            </div>
        );
    }
}

export default Main;