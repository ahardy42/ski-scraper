import React from 'react';
import Card from './Card';

class List extends React.Component {
    render() {
        return (
            <ul class="list-group">
                {this.props.list.map(
                    card => <Card img={card.img} heading={card.heading} description={card.description} key={card.id}/>
                )}
            </ul>
        );
    }
}

export default List;