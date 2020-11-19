import React, { useState } from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './TableRow.css';
import ColumnResizer from "react-column-resizer";

const tableRow = (props) =>{


    return(<Auxillary>        
        <td style={{display:props.hiddenUserId?'none':'block'}}>{props.userId}                
        </td>
        <ColumnResizer className="columnResizer" minWidth={0} />
        <td  style={{display:props.hiddenTitle?'none':''}}>{props.title}
        </td>
        <ColumnResizer className="columnResizer" minWidth={0} />
        <td style={{display:props.hiddenBody?'none':'block'}}>{props.content}
        </td>
        <ColumnResizer className="columnResizer" minWidth={0} />
        <td>
            <button className={classes.btn} onClick={()=>props.EditHandler(props.userId,props.title,props.content)}>EDIT</button>
        </td>
        <td>
            <button className={classes.btnDelete} onClick={props.delete}>DELETE</button>
        </td>
    </Auxillary>  
     );
    
};

export default tableRow;