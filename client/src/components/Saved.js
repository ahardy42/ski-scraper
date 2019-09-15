import React, {useEffect} from 'react';
import GRAB from '../utils/API';
import List from './List';

const Saved = ({save, deleteArticle, getSaved, saved}) => {
    useEffect(getSaved, [saved]);
    const commentSubmit = (id, input) => {
        GRAB(`/api/comment/${id}`, "PUT", input)
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }
    const commentDelete = id => {
        GRAB(`/api/comment/${id}`, "DELETE")
        .then(response => console.log(response))
        .catch(err => console.log(err));
    }
    return (
        <div className="container">
            <ul className="list-unstyled">
                {saved.map(article => {
                    return <List  getSaved={getSaved} isSaved={true} article={article} key={article._id} save={save} delete={deleteArticle} submit={commentSubmit} commentDelete={commentDelete} />
                })}
            </ul>
        </div>
    );
}

export default Saved;