import React from 'react';

const CommentForm = ({handleChange, input}) => {
    return (
        <div className="input-group my-2">
            <textarea className="form-control" placeholder="Add your comment here!" aria-label="Add your comment here!" value={input} onChange={handleChange}></textarea>
        </div>
    );
}

export default CommentForm;