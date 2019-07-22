import React from 'react';
import Comments from './Comments';
import Buttons from './Buttons';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.handleSave = this.handleSave.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCommentAdd = this.handleCommentAdd.bind(this);
        this.handleCommentChange = this.handleCommentChange.bind(this);
        this.state = {
            article: this.props.article,
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
        console.log(id, body);
        this.props.submit(id, body)
        .then(article => {
            console.log(article);
            let savedArticle = article;
            savedArticle.comment.isSaved = true;
            this.setState({
                article: savedArticle
            });
        });
    }
    render() {
        let article = this.props.article;
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
                                <Buttons handleDelete={this.handleDelete} handleCommentAdd={this.handleCommentAdd} handleSave={this.handleSave} isSaved={this.state.article.isSaved} comment={this.state.article.comment}/>
                                <Comments comment={this.state.article.comment ? this.state.article.comment : null} isSaved={this.state.article.isSaved} handleChange={this.handleCommentChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default List;