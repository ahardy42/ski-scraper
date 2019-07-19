import React from 'react';
import List from './List';
import './Main.css';

class Saved extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            saved: []
        }
        this.addComment = this.addComment.bind(this);
    }
    render() {
        return (
            <main>
                <div className="row my-5">
                    <div className="col">
                        <List list={this.state.saved} />
                    </div>
                </div>
            </main>
        );
    }
    addComment(comment) {
        fetch("api/comment/", {
            method: "post",
            body: comment
        }).then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        }).then((data) => {
            return data;
        });
    }
}

export default Saved;