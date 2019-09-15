import React from 'react';
import CommentForm from './CommentForm';
import Buttons from './Buttons';
import CommentList from './CommentList';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCommentAdd = this.handleCommentAdd.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.state = {
            input: ""
        }
    }
    handleDelete() {
        let id = this.props.article._id;
        this.props.delete(id);
    }
    handleSave() {
        let id = this.props.article._id;
        this.props.save(id);
    }
    handleCommentChange(event) {
        this.setState({
            input: event.target.value
        });
    }
    handleCommentAdd() {
        let id = this.props.article._id;
        let body = {body: this.state.input};
        this.props.submit(id, body);
        this.setState({
            input : ""
        }, () => {
            this.props.getSaved();
        });
    }
    handleCommentDelete() {
        this.props.commentDelete();
        this.props.getSaved();
    }
    render() {
        let article = this.props.article;
        return (
            <li className="list-group-item" id={article._id}>
                <div className="row">
                    <div className="col-3">
                        <a href={article.href} target="_blank" rel="noopener noreferrer">
                            <img className="card-imagew" src={article.img} alt="Card cap" />
                        </a>
                    </div>
                    <div className="col-9">
                        <div className="card mb-3">
                            <div className="card-body">
                                <a href={article.href} target="_blank" rel="noopener noreferrer">
                                    <h5 className="card-title">{article.header}</h5>
                                </a>
                                <p className="card-text">{article.description}</p>
                                <p className="card-text"><small className="text-muted">{article.published}</small></p>
                                <Buttons isSaved={this.props.isSaved} handleDelete={this.handleDelete} handleCommentAdd={this.handleCommentAdd} handleSave={this.handleSave} comment={this.props.article.comment}/>
                                {this.props.isSaved ? (
                                    <>
                                        <CommentList comments={this.props.article.comments} commentDelete={this.props.commentDelete} />
                                        <CommentForm input={this.state.input} handleChange={this.handleCommentChange}/>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default List;