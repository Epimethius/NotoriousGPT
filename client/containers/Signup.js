import React from 'react';
import { useNavigate } from "react-router-dom";
const axios = require('axios');


const SignUp = () => {
    const addUser = async (username, password) => {
        const result = await axios.post('http://localhost:3000/signup', {username: username, password: password});
        console.log(result);
    }
    const navigate = useNavigate();
    return (
    <form >
        <label>Username</label>
        <input id = 'uname' type = 'text'/>
        <label>Password</label>
        <input id = 'pword' type = 'text'/>
        <input type = 'submit' value = 'Sign Up' onClick = {async (e) => {
            e.preventDefault();
            try{
              addUser(e.target.form[0].value, e.target.form[1].value);
              navigate('/login');
            }
            catch{
              window.alert('Try again!');
            }

        }} />
    </form>
    )
};

export default SignUp;