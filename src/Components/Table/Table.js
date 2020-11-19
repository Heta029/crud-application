import React from 'react';
import TableRow from '../TableRow/TableRow';
import Auxillary from '../../hoc/Auxillary'

const table = (props) => {
  
 return( 
 <Auxillary>     
    <tr>
       <TableRow hiddenUserId={props.hiddenUserId} hiddenTitle={props.hiddenTitle} hiddenBody={props.hiddenBody} userId={props.usersUserId} EditHandler={props.EditHandler} title={props.usersTitle} content={props.usersContent} delete={props.delete}/>
    </tr> 
  </Auxillary>
  );

};

export default table;