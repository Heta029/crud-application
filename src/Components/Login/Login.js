import axios from 'axios';
import { setUserSession } from '../../Utils/Common';
import React, { useState } from 'react';
import classes from './Login.css';

 
function Login(props) {
    const username = useFormInput('');
    const password = useFormInput('');    
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successText, setText] = useState('');
    const [forgetPassword, setPassword] = useState(false);

  // handle button click of login form
    const handleLogin = () => {      
        setError(null);
        setLoading(true);
        if(username.value=='heta' && password.value=='12345')
        {   console.log(username);                     
            setLoading(false);
            setUserSession(password,username);
            props.history.push('/CRUDApp');            
        }
        else{
          setLoading(false);
          setError("Please enter correct username and password");         
        }               
    }
    
  return (
    <div className={classes.container}>
      <label><strong>Login</strong></label><br /><br />
      <div>
        <label>Username</label><br />
        <input type="text" {...username}  />
      </div>
      <div style={{ marginTop: 10 }} >
        <label>Password</label><br />
        <input type="password" {...password}  />
      </div>
      <span className={classes.Forgotpassword} onClick={()=>setPassword(true)}>Forgot password?</span>
      {error && <><small style={{ color: 'red' }}>{error}</small><br/></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />    
     {
       forgetPassword?
       <div>
        <div style={{ marginTop: 10 }} >
         <label>New Password</label><br />
         <input type="password" />
        <div className={classes.Success}>{successText}</div>
         <input type="button" value="Submit" onClick={()=>setText('Password changed successfully')} disabled={loading} />
         </div>
         </div>:null
     }      
    </div>        
  );
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
}
 
export default Login;