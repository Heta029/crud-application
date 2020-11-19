import React,{ useState } from 'react';
import classes from './TableHeader.css';
import ColumnResizer from 'react-column-resizer';

function TableHeader(props) {
   
    return(
    <tr>   
    <th style={{display:props.hiddenUserId?'none':'block'}}>
    <div ><strong className={classes.Close} name="hiddenUserId" onClick={()=>props.hideHandler('UserId')}>x</strong></div>
         User Id     
        <button type="button" onClick={() => props.onSortID('ASC','userId')}>
          ASC 
        </button>  
        <button type="button" onClick={() => props.onSortID('DEC','userId')}>
          DEC 
        </button>  
    </th>
    <ColumnResizer className="columnResizer" minWidth={0} />
    <th style={{display:props.hiddenTitle?'none':'block'}}>
    <div ><strong className={classes.Close} name="hiddenTitle" onClick={()=>props.hideHandler('Title')}>x</strong></div>
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
    <th style={{display:props.hiddenBody?'none':'block'}}>
    <div ><strong className={classes.Close} name="hiddenBody" onClick={()=>props.hideHandler('Body')}>x</strong></div>
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
};
    

export default TableHeader;