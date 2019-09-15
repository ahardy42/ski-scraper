import React from 'react';
import List from './List';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSnowflake} from '@fortawesome/free-solid-svg-icons';

class Main extends React.Component {
    renderList = () => {
        let filtered = this.props.articles.filter(article => !article.isSaved);
        return(
            filtered.map(article => {
                return <List isSaved={false} article={article} key={article._id} save={this.props.save} delete={this.props.delete} />
            })
        );     
    }
    renderSpinner = () => {
        return (
            <div className="loading-icon">
                <FontAwesomeIcon icon={faSnowflake} size="10x" spin></FontAwesomeIcon>
            </div>
        )
    }
    render() {
        return (
            <div className="container">
                {this.props.articles.length < 1 ? this.renderSpinner() : null}
                <ul className="list-unstyled">
                    {this.props.articles.length > 0 ? this.renderList() : null}
                </ul>
            </div>
        );
    }
}

export default Main;