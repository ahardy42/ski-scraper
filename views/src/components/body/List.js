import React from 'react';
import Card from './Card';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [{
                img: "test",
                heading: "test",
                description: "test",
                _id: "test",
                datePublished: "test"
            }]
        }
    }
    
    render() {
        return (
            <ul className="list-group">
                {this.state.list.map(
                    card => <Card img={card.img} heading={card.heading} description={card.description} key={card._id} published={card.datePublished}/>
                )}
            </ul>
        );
    }
}

export default List;