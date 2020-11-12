import React from 'react';
import classes from './TableHeader.css';
import ColumnResizer from 'react-column-resizer';

const tableHeader = (props) => (
    <tr>
    <th>
    <div ><strong className={classes.Close} onClick={props.hide}>x</strong></div>
         User Id     
        <button type="button" onClick={() => props.onSortID('ASC','userId')}>
          ASC 
        </button>  
        <button type="button" onClick={() => props.onSortID('DEC','userId')}>
          DEC 
        </button>  
    </th>
    <ColumnResizer className="columnResizer" minWidth={0} />
    <th style={{display:props.hidden?'none':''}}>
    <div ><strong className={classes.Close} onClick={props.hide}>x</strong></div>
    Title
    <br/>
        <button type="button" onClick={() => props.onSort('ASC','title')}>
            ASC
        </button>
        <button type="button" onClick={() => props.onSort('DEC','title')}>
            DEC
        </button>        
    </th>
    <ColumnResizer className="columnResizer" minWidth={0} />
    <th>
    <div ><strong className={classes.Close} onClick={props.hide}>x</strong></div>
    Body
    <br/>
        <button type="button" onClick={() => props.onSort('ASC','body')}>
           ASC 
        </button>
       <button type="button" onClick={() => props.onSort('DEC','body')}>
           DEC 
        </button>
    </th>
    <ColumnResizer className="columnResizer" minWidth={0} />
    <th>EDIT</th>
    <th>DELETE</th>
    </tr>    
);

export default tableHeader;