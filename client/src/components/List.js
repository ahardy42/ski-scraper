import React from 'react';

class List extends React.Component {
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
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        );
    }
}

export default List;