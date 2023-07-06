import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { authActions } from '../store';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate()
  // This is used to update the state
  const dispath = useDispatch();
  const [inputs, setInputs] = useState({
    name:"",
    email:"",
    password:"",
  });
  const [isSignup, setIsSignup] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }));
  };

  const sendRequest = async (type="login") => {
  const res =  await axios.post(`http://localhost:4001/users/${type}`, {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
    }).catch((err)=> console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
   if (isSignup) {

    // We can store the id of the user inside the localStorage, 
    // because the localStorage will available even after we refresh 
    // the page even if we close the browser and and if we re-open 
    // it as well it will always be available and its atype of 
    // permanent storage inside the browser where the 
    // users id will be available 

    sendRequest("signup").then((data) => localStorage.setItem('userId',data.user._id))
      .then(() => dispath(authActions.login()))
      .then(() => navigate("/blogs"))
      .then((data) => console.log(data));
   } else {
    sendRequest()
    .then((data) => localStorage.setItem('userId',data.user._id))
    .then(() => dispath(authActions.login()))
    .then(() => navigate("/blogs"))
    .then((data) => console.log(data));
   }
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* inside this form we will be having input fields and we wll be using input fields from material ui and not from the html */}
        <Box 
         maxWidth={400}
         display="flex"
         flexDirection={'column'}
          alignItems='center'
          justifyContent={'center'}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          >

          <Typography variant='h2' paddig={3} textAlign='center'>
            { isSignup ? "Signup" : "Login"}
            </Typography>

        {
          isSignup && <TextField 
          name="name" 
          onChange={handleChange}
          value={inputs.name} 
          placeholder='Name' margin='normal'
          />
        }  
          <TextField 
          name="email" 
          onChange={handleChange}
          value={inputs.email} 
          type={"email"} placeholder="Email" 
          margin='normal'
          />
          <TextField 
          name="password" 
          onChange={handleChange}
          value={inputs.password} 
          type={'password'} placeholder='Password' 
          margin='normal'
          />
          <Button type='submit'
          variant='contained' 
          sx={{ borderRadius: 3,marginTop: 3 }} 
          color='warning'>
            Submit
             </Button>
          <Button sx={{ borderRadius: 3,marginTop: 3 }}
          onClick={() => setIsSignup(!isSignup)}>
          Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth;
