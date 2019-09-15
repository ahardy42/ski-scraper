import React from 'react';

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
    }
    render() {
        if (this.props.comments) {
            return (
                <>
                    {this.props.comments.map(
                        comment => {
                            return (
                                <p className="card-text my-2" key={comment._id}>User Comment: {comment.body}<button type="button" className="close" id={comment._id} onClick={this.handleCommentDelete}>
                                    <span id={comment._id}>&times;</span>
                                </button></p>
                            )
                        }
                    )}
                    <div className="input-group my-2">
                        <textarea className="form-control" placeholder="Add your comment here!" aria-label="Add your comment here!" onChange={this.props.handleChange}></textarea>
                    </div>
                </>
            );
        } else {
            return (
                <div className="input-group my-2">
                    <textarea className="form-control" placeholder="Add your comment here!" aria-label="Add your comment here!" onChange={this.props.handleChange}></textarea>
                </div>
            );
        } 
    }
    handleCommentDelete(event) {
        let id = event.target.id;
        this.props.commentDelete(id)
        .then(response => {
            this.props.getSaved();
        })
        .catch(err => {
            console.log(err);
        });
    }

}

export default Comments;