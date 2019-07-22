import React from 'react';

class Buttons extends React.Component {
    render() {
        if (this.props.isSaved && this.props.comment) {
            // return a delete button only
            return (
                <button type="button" className="btn btn-danger mx-2" onClick={this.props.handleDelete}>Delete</button>
            );
        } else if (this.props.isSaved) {
            // return a delete and add comment button
            return (
                <>
                    <button type="button" className="btn btn-danger mx-2" onClick={this.props.handleDelete}>Delete</button>
                    <button type="button" className="btn btn-success mx-2" onClick={this.props.handleCommentAdd}>Add Comment</button>
                </>
            );
        } else {
            // return a save article button
            return (
                <button type="button" className="btn btn-success mx-2" onClick={this.props.handleSave}>Save</button>
            );
        }

    }
}

export default Buttons;