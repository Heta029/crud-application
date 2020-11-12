import React from 'react';
import Auxillary from '../../hoc/Auxillary';
import classes from './TableRow.css';
import ColumnResizer from "react-column-resizer";

const tableRow = (props) =>(
    <Auxillary>
        <td>{props.userId}        
        </td>
        <ColumnResizer className="columnResizer" minWidth={0} />
        <td  style={{display:props.hidden?'none':''}}>{props.title}
        </td>
        <ColumnResizer className="columnResizer" minWidth={0} />
        <td>{props.content}
        </td>
        <ColumnResizer className="columnResizer" minWidth={0} />
        <td>
            <button className={classes.btn}>EDIT</button>
        </td>
        <td>
            <button className={classes.btnDelete}>DELETE</button>
        </td>
    </Auxillary>   
);

export default tableRow;