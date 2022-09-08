import React from 'react';
import {
  Checkbox,
  Grid,
  TextField,
  FormControlLabel,
  Paper,
  Button
} from '@material-ui/core';
import { authApi } from '../../ApiService';

import { useNavigate } from "react-router-dom";

const Login = () => {
  let history = useNavigate();
  const [email, setEmail] = React.useState('');
  const [pass, setPass] = React.useState('');

  const handleLogin = () => {
  console.log("hello", pass , email)
  const data ={
    email:email,
    password:pass
  }
  authApi(data)
  .then((res)=>{
    console.log("the res is ", res)
    localStorage.setItem('Token',JSON.stringify(res.Token))
			history('/dashboard');
  })
  };

  return (
    <div style={{ display:'flex', justifyContent:'center', alignItems:'center', backgroundColor:'#0d1117' , height:"100vh"}}>
      <Paper>
        <Grid
          container
          spacing={3}
         
          
        >
          <Grid item xs={12}>
           <center><TextField label="Username" onChange={(e)=>setEmail(e.target.value)}></TextField></center> 
          </Grid>
          <Grid item xs={12}>
            <center><TextField label="Password" type={'password'} onChange={(e)=>setPass(e.target.value)}></TextField></center>
          </Grid>
          
          <Grid item xs={12}>
            <Button  onClick={handleLogin} fullWidth> Login </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Login;
