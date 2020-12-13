import React from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.css';

const EditProfile = (props) => {
   
   const [name, setName] = React.useState('');
   const [location, setLocation] = React.useState('');
   const [fieldCount, setFieldCount] = React.useState('');
   const [rate, setRate] = React.useState('');

   
   const handleClick = async () => {
      console.log(fieldCount);
      const obj = {
         id: props.fieldID,
         name: name,
         location: location,
         num: fieldCount,
         rate: rate
      };
      console.log(obj);
      let msg = "";
      await axios.post('https://dbproject-group21.000webhostapp.com/db_proj/editProfile.php', obj)
         .then(res => {
            msg = res.data;
            if(msg == "No"){
               alert("Please Enter data in at least one Field");
            }
            else{
               alert("Changes Made");
            }
         })
   };

   return (
      <div className='container'>
         <h1 className='title'>Edit Profile</h1>
         <p>Note: Empty Fields mean that data will not be changed</p>
         <div className='optn'>
            <Form>
               <Form.Group
                  controlId='exampleForm.ControlTextarea1'
                  className='box'>
                  <Form.Label className='box'>Name of Field:</Form.Label>
                  <Form.Control
                     as='input'
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     className='contain'
                  />
               </Form.Group>
               <Form.Group
                  controlId='exampleForm.ControlTextarea1'
                  className='box'>
                  <Form.Label className='box'>Number of fields:</Form.Label>
                  <Form.Control
                     as='input'
                     value={fieldCount}
                     onChange={(e) => setFieldCount(e.target.value)}
                     className='contain'
                  />
               </Form.Group>
               <Form.Group
                  controlId='exampleForm.ControlTextarea1'
                  className='box'>
                  <Form.Label className='box'>Location:</Form.Label>
                  <Form.Control
                     as='input'
                     value={location}
                     onChange={(e) => setLocation(e.target.value)}
                     className='contain'
                  />
               </Form.Group>
               <Form.Group
                  controlId='exampleForm.ControlTextarea1'
                  className='box'>
                  <Form.Label className='box'>Rate:</Form.Label>
                  <Form.Control
                     as='input'
                     value={rate}
                     onChange={(e) => setRate(e.target.value)}
                     className='contain'
                  />
               </Form.Group>
            </Form>
            <Link to='/' style={{ textDecoration: 'none' }}>
               <div className='menu'>Discard Changes</div>
            </Link>
            <Link
               to='/'
               onClick={handleClick}
               style={{ textDecoration: 'none' }}>
               <div className='menu'>Save</div>
            </Link>
         </div>
      </div>
   );
};

export default EditProfile;
