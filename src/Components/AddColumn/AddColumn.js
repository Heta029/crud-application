import React from 'react';
import Aux from '../../hoc/Auxillary'
import classes from './AddColumn.css'

const addColumn = (props) =>(
<Aux>
    <div className={classes.container}>
    <strong  style={{display:props.hiddenUserId||props.hiddenTitle||props.hiddenBody?'block':'none'}}>Click on the below fields to add them in the table:</strong>
    <h3 className={classes.columnName} style={{display:props.hiddenUserId?'block':'none'}} name="hiddenUserId" onClick={()=>props.showHandler('UserId')} >
         User Id
    </h3>
    <h3 className={classes.columnName} style={{display:props.hiddenTitle?'block':'none'}} name="hiddenTitle" onClick={()=>props.showHandler('Title')}>
        Title
    </h3>
    <h3 className={classes.columnName} style={{display:props.hiddenBody?'block':'none'}} name="hiddenBody" onClick={()=>props.showHandler('Body')}>
        Body
    </h3>
    </div>
   
</Aux>
);

export default addColumn;