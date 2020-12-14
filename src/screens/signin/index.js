import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import axios from 'axios';

const Login = (props) => {
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
   let msg = '';
   let ID = '';
   async function handleLogin() {
      const  obj = {
         email: email,
         password: password,
      };
      const config = {
         headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
         }
     };
      await axios
         .post('https://dbproject-group21.000webhostapp.com/db_proj/signin.php', obj, config)
         .then((res) => {
            msg = res.data[1];
            ID = res.data[0];
         })
         .catch((err) => console.log(err));
      if (msg === 'customer') {
         props.updateID(ID);
         props.updateIsOwner(false);
         props.updateUser({ value: true });
      } else if (msg === 'field') {
         props.updateID(ID);
         props.updateIsOwner(true);
         props.updateUser({ value: true });
      } else {
         alert('Incorrect Email/Password');
         props.updateIsOwner(false);
         props.updateUser({ value: false });
      }
   }
   return (
      <section className='login'>
         <div className='loginContainer'>
            <label>Username</label>
            <input
               type='text'
               autoFocus
               required
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <label>Password</label>
            <input
               type='password'
               required
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <div className='btnContainer'>
               <button onClick={handleLogin}> Sign in</button>
            </div>
            <div className='signup'>
               <p>
                  Don't have an account ?<Link to='/usertype'> Sign up</Link>
               </p>
            </div>
         </div>
      </section>
   );
};
export default Login;
