import React from 'react';
import List from './List';

class Saved extends React.Component {
    constructor(props) {
        super(props);
        this.commentSubmit = this.commentSubmit.bind(this);
    }
    render() {
        return (
            <div className="container">
                <ul className="list-unstyled">
                    {this.props.saved.map(article => {
                        return <List article={article} key={article._id} save={this.props.save} delete={this.props.delete} submit={this.commentSubmit}/>
                    })}
                </ul>
            </div>
        );
    }
    async commentSubmit(id, input) {
        let response = await fetch(`/api/comment/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(input)
        });
        let json = response.json();
        console.log(json);
        return json;
    }
}

export default Saved;