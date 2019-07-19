import React from 'react';
import List from './List';
import './Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.save = this.save.bind(this);
        this.delete = this.delete.bind(this);
    }
    render() {
        return (
            <main>
                <div className="row my-5">
                    <div className="col">
                        <List list={this.props.scraper} />
                    </div>
                </div>
            </main>
        );
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
}

export default Main;