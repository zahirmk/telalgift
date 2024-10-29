import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logo from './Images/TelalImage.png'; 
import axios from 'axios'; 
import OrderForm from './OrderForm';
import Dashboard from './Dashboard';



const Login = (props) => {
  //const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [userDetails, setUserDetails] = useState(null);
  const [branch, setbranch] = useState('')

  const navigate = useNavigate()

  const onButtonClick = async () => {
    try {
        const response = await axios.post('http://localhost:5000/login', {
        //const response = await axios.post('http://promotion.altelal.com/login', {
          email,
          password, 
          branch,
        });

        // Check if the login is successful
        if (response.status === 200) {
          //alert('Login successful');
          //setUserDetails(response.data);
          setUserDetails(response.data.user);
          //const temp1 = response.data.user.branch;
          //alert(temp1)
          //navigate('/OrderForm'); 
          const user = response.data.user;

          setUserDetails(user);
          
          
          //navigate('/OrderForm', { state: { userDetails: response.data.user } });
         navigate('/Dashboard', { state: { userDetails: response.data.user } });

        }
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Handle invalid credentials
          alert('Invalid email or password');
          setEmailError('Invalid email or password');
          setPasswordError('Invalid email or password');
        } else {
          // Handle server error
          alert('Server error. Please try again later.');
        }
      }
    
  };

  return (
    <div className={'mainContainer'}>

    <div className={'logoContainer1'}>
        <img src={logo} alt="Logo" className="logo1" />
      </div>

      <div className={'titleContainer'}>
      <div style={{color: 'grey'}} > Promotions </div>
        <div>Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type = "text"
          value={email}
          placeholder="Enter User ID"
          onChange={(ev) => setEmail(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{emailError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          type = "password"
          value={password} 
          placeholder="Enter Password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" onClick={onButtonClick} value={'Log in'} />
      </div>
      
    </div>
  )
}

export default Login