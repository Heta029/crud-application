import React,{ useState } from 'react';
import classes from './AddModal.css';

const AddModal = (props) => {
    const [successText, setText] = useState('');
    
    return( <div>
        <label>User Id</label><br />
         <input type="text" value={props.edit?props.userId:""} /><br/>
         <label>Title</label><br />
         <input type="text" value={props.edit?props.title:""}/><br/>
         <label>Body</label><br />
         <input type="text" value={props.edit?props.content:""}/><br/>
         <div className={classes.Success} >{successText}</div>
         <input type="button" value={props.edit?"EDIT":"ADD"} onClick={()=>{props.edit?setText('Edited successfully!'):setText('Added successfully!')}}/>
         <input type="button" value="Cancel" onClick={props.modalClosed} />
    </div>    )
}
   

export default AddModal;