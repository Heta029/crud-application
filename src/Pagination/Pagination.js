import React, { useState } from 'react';

 function Pagination(props){
     const page = useFormInput('');
    
     return(
        <div style={{color:'green'}}><strong>Records per page:</strong><input type="number" {...page} />
        <input type="button" onClick={()=>props.update(page.value)} value="OK"/>             
        </div>
     )
 }
 const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
   
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  };

 export default Pagination;