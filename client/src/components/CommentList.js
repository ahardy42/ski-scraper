import React from 'react';

const CommentList = ({comments, commentDelete}) => {
    return (
        <>
            {comments.map(
                comment => {
                    return (
                        <p className="card-text my-2" key={comment._id}>User Comment: {comment.body}<button type="button" className="close" id={comment._id} onClick={() => commentDelete(comment._id)}>
                            <span id={comment._id}>&times;</span>
                        </button></p>
                    )
                }
            )}
        </>
    );
}

export default CommentList;