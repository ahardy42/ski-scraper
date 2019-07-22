import React from 'react';
import List from './List';

class Saved extends React.Component {
    constructor(props) {
        super(props);
        this.commentSubmit = this.commentSubmit.bind(this);
        this.commentDelete = this.commentDelete.bind(this);
    }
    render() {
        return (
            <div className="container">
                <ul className="list-unstyled">
                    {this.props.saved.map(article => {
                        return <List article={article} key={article._id} save={this.props.save} delete={this.props.delete} submit={this.commentSubmit} commentDelete={this.commentDelete} getSaved={this.props.getSaved}/>
                    })}
                </ul>
            </div>
        );
    }
    componentDidMount() {
        this.props.getSaved();
    }
    async commentSubmit(id, input) {
        let updatedInput = input;
        updatedInput.article = id;
        let response = await fetch(`/api/comment/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedInput)
        });
        let json = response.json();
        console.log(json);
        return json;
    }
    async commentDelete(id) {
        let response = await fetch(`/api/comment/${id}`, {
            method: "DELETE",
        });
        let json = response.json();
        console.log(json);
        return json;
    }
}

export default Saved;