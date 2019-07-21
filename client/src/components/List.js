import React from 'react';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    handleDelete() {
        let id = this.props.article._id;
        this.props.delete(id);
    }
    handleSave() {
        let id = this.props.article._id;
        this.props.save(id);
    }
    render() {
        let article = this.props.article;
        let button, comment;
        if (article.isSaved) {
            button = <button type="button" className="btn btn-success mx-2" onClick={this.handleDelete}>Delete</button>;
            comment = <button type="button" className="btn btn-success mx-2">Add Comment</button>;
        } else {
            button = <button type="button" className="btn btn-success mx-2" onClick={this.handleSave}>Save</button>;
            comment = <button type="button" className="btn btn-success invisible mx-2">Add Comment</button>;
        }
        return (
            <li className="list-group-item" id={article._id}>
                <div className="row">
                    <div className="col-3">
                        <a href={article.href} target="_blank">
                            <img className="" src={article.img} alt="Card cap" />
                        </a>
                    </div>
                    <div className="col-9">
                        <div className="card mb-3">
                            <div className="card-body">
                                <a href={article.href} target="_blank">
                                    <h5 className="card-title">{article.header}</h5>
                                </a>
                                <p className="card-text">{article.description}</p>
                                <p className="card-text"><small className="text-muted">{article.published}</small></p>
                                {button}
                                {comment}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default List;