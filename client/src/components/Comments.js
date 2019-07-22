import React from 'react';

class Comments extends React.Component {
    render() {
        if (this.props.comment) {
            return (
                <p className="card-text my-2">User Comment: {this.props.comment.body}</p>
            );
        } else if (this.props.isSaved) {
            return (
                <div className="input-group my-2">
                    <textarea className="form-control" placeholder="Add your comment here!" aria-label="Add your comment here!" onChange={this.props.handleChange}></textarea>
                </div>
            );
        } else {
            return null;
        }
        
    }
}

export default Comments;