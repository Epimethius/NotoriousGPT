import React from 'react';
import {useEffect} from 'react';
import { useNavigate, Link } from "react-router-dom";
const axios = require('axios');


const Login = () => {
    //const navigate = useNavigate();
    const loggedIn = async () => {
      try{
        const result = await axios.get('http://localhost:3000/login/already'); 
        if(result){
          //navigate('/notes');
        }
      }
      catch{

      }
      
    }
    useEffect(() => {
      loggedIn();
    }, []);
    return (
    <div>
    <p id = 'bigtitle'>NOTORIOUS GPT</p>
    <form >
        <label>Username</label>
        <input id = 'uname' type = 'text'/>
        <label>Password</label>
        <input id = 'pword' type = 'text'/>
        <input type = 'submit' value = 'login' onClick = {async (e) => {
            e.preventDefault();
            //console.log('ya clicked me');
            try{
              const result = await axios.post('http://localhost:3000/login', {username: e.target.form[0].value, password: e.target.form[1].value});
              //console.log(result);
              if(result) {
                navigate('/notes');
              }
            }
            catch{
              e.target.form[0].value = '';
              e.target.form[1].value = '';
              window.alert('Incorrect Username or Password');
            }
            
        }} />
    </form>
    <Link to= '/signup'> Sign Up</Link>
    </div>
    )
};

export default Login;