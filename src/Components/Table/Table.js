import React from 'react';
import TableRow from '../TableRow/TableRow';
import Auxillary from '../../hoc/Auxillary'

const table = (props) => {
  
 return( 
 <Auxillary>     
    <tr>
       <TableRow userId={props.usersUserId} title={props.usersTitle} content={props.usersContent}/>
    </tr> 
  </Auxillary>
  );

};

export default table;