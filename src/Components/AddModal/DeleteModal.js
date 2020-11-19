import React from 'react';

const deleteModal = (props)=>(
    <div>
        <h1>Are you sure you want to delete?</h1>
        <input type="button" value="Yes" onClick={props.modalClosed}/>
        <input type="button" value="Cancel" onClick={props.modalClosed} />   
    </div>
);

export default deleteModal;