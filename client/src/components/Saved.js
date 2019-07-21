import React from 'react';
import List from './List';

class Saved extends React.Component {
    render() {
        return (
            <div className="container">
                <ul className="list-unstyled">
                    {this.props.saved.map(article => {
                        return <List article={article} key={article._id} save={this.props.save} delete={this.props.delete}/>
                    })}
                </ul>
            </div>
        );
    }
}

export default Saved;