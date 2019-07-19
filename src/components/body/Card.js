import React from 'react';

class Card extends React.Component {
    render() {
        return (
            <li className="list-group-item">
                <div className="card mb-3">
                    <img src={this.props.src} alt="sweetness"></img>
                    <div className="card-body">
                        <h5 className="card-title">{this.props.heading}</h5>
                        <p className="card-text">{this.props.description}</p>
                    </div>
                </div>
            </li>
        );
    }
}

export default Card;