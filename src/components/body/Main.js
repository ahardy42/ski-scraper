import React from 'react';
import List from './List';
import './Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: []
        }
        this.getLinks = this.getLinks.bind(this);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
        this.addComment = this.addComment.bind(this);
    }
    render() {
        return (
            <main>
                <div class="row my-5">
                    <div class="col">
                        <List list={this.state.links} />
                    </div>
                </div>
            </main>
        );
    }
    componentDidMount() {
        this.getLinks();
    }
    getLinks() {
        this.setState({links: this.props.scraper()})
    }
    save(id, body) {
        fetch("api/save/"+id, {
          method: "post",
          body: body
        }).then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        }).then((data) => {
            return data;
        });
    }
    delete(id) {
        fetch("api/delete/" + id, {
            method: "delete"
        }).then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        }).then((data) => {
            return data;
        });
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

export default Main;