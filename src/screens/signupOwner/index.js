import React from 'react';
import axios from 'axios';
import './styles.css';
const SignupOwner = (props) => {
   const [name, setName] = React.useState('');
   const [contact, setContact] = React.useState('');
   const [email, setEmail] = React.useState('');
   const [password1, setPassword1] = React.useState('');
   const [password2, setPassword2] = React.useState('');
   const [location, setLocation] = React.useState('');
   const [num, setNum] = React.useState('');
   const [rate, setRate] = React.useState('');
   let msg = '';
   async function handleSignup() {
      console.log('handler called');
      const obj = {
         name: name,
         contact: contact,
         email: email,
         password1: password1,
         password2: password2,
         location: location,
         rate: rate,
         num: num,
      };
      await axios
         .post('https://dbproject-group21.000webhostapp.com/db_proj/registerField.php', obj)
         .then((res) => {
            msg = res.data;
         })
         .catch((error) => {
            console.log(error);
         });
      if (msg === 'Success') {
         alert('Registered Succefully. Please log in');
         props.history.push('/');
      } else {
         alert('Error: Could Not Register');
         props.history.push('/');
      }
   }
   return (
      <selection className='signin'>
         <div className='signinContainer'>
            <h1>Futsal Field Management</h1>
            <label>Field Name:</label>
            <input
               type='text'
               required
               onChange={(e) => {
                  setName(e.target.value);
               }}
            />
            <label>Location:</label>
            <input
               type='text'
               required
               onChange={(e) => {
                  setLocation(e.target.value);
               }}
            />
            <label>Contact No:</label>
            <input
               type='text'
               required
               onChange={(e) => {
                  setContact(e.target.value);
               }}
            />
            <label>Number of Fields:</label>
            <input
               type='text'
               required
               onChange={(e) => {
                  setNum(e.target.value);
               }}
            />
            <label>Booking Rate:</label>
            <input
               type='text'
               required
               onChange={(e) => {
                  setRate(e.target.value);
               }}
            />
            <label>Email:</label>
            <input
               type='email'
               required
               onChange={(e) => {
                  setEmail(e.target.value);
               }}
            />
            <label>Password:</label>
            <input
               type='password'
               required
               onChange={(e) => {
                  setPassword1(e.target.value);
               }}
            />
            <label>Confirm Password:</label>
            <input
               type='password'
               required
               onChange={(e) => {
                  setPassword2(e.target.value);
               }}
            />
            <div className='button'>
               <button onClick={handleSignup}>Register</button>
            </div>
         </div>
      </selection>
   );
};

export default SignupOwner;
