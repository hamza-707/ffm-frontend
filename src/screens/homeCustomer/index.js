import React from 'react';
import './styles.css';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Link from 'react-router-dom/Link';
import axios from 'axios';

const HomeCustomer = (props) => {
   const [items, setItems] = React.useState([]);
   const [slots, setSlots] = React.useState([]);
   const [date, setDate] = React.useState('');
   const [ID, setID] = React.useState('');
   const [timing, setTiming] = React.useState('');
   React.useEffect(async () => {
      await axios.get('https://dbproject-group21.000webhostapp.com/db_proj/loadFieldsData.php').then((res) => {
         setItems(res.data);
      });
   }, []);
   React.useEffect(async () => {
      if (ID !== '' && date !== '') {
         const obj = {
            fieldID: ID,
            date1: date,
         };
         let slotData = [];
         let id = '';
         let slotTime = '';
         let numSlot = '';
         await axios
            .post('https://dbproject-group21.000webhostapp.com/db_proj/loadTiming.php', obj)
            .then((res) => {
               for (let i = 0; i < res.data.length; i++) {
                  id = res.data[i][0];
                  slotTime = res.data[i][1];
                  numSlot = res.data[i][2];
                  slotData.push({
                     id: id,
                     slot: slotTime,
                     numSlot: numSlot,
                  });
               }
               setSlots(slotData);
            });
      }
   }, [date, ID]);
   const handleProceed = async () => {
      if (ID !== '' && timing !== '' && date !== '') {
         const obj = {
            fieldID: ID,
            customerID: props.customerID,
            timing: timing,
            date: date,
         };
         await axios
            .post('https://dbproject-group21.000webhostapp.com/db_proj/makeBooking.php', obj)
            .then((res) => {
               let msg = res.data;
               if (msg == 'Made') {
                  alert('Booking Made Successfully');
                  setID('');
                  setTiming('');
                  setDate('');
               } else if (msg == 'Blacklist') {
                  alert(
                     'This Field has Blacklisted you. Hence You are unable to make bookings here'
                  );
                  setID('');
                  setTiming('');
                  setDate('');
               } else {
                  alert('Please Select a Valid Time for Booking');
                  setID('');
                  setTiming('');
                  setDate('');
               }
            });
      } else {
         alert('Please Fill in the Data before proceeding');
      }
   };
   const handleSelect = (i) => {
      setID(i);
   };
   const handleDate = (i) => {
      setDate(i.target.value);
   };
   const [check1, setCheck1] = React.useState(false);
   const [check2, setCheck2] = React.useState(false);

   const checkbox1 = () => {
      // items = [
      //    ...items.sort(function (a, b) {
      //       var nameA = a.name.toUpperCase();
      //       var nameB = b.name.toUpperCase();
      //       if (nameA < nameB) {
      //          return -1;
      //       }
      //       if (nameA > nameB) {
      //          return 1;
      //       }
      //       return 0;
      //    }),
      // ];
      // console.log(items);
      // setCheck1(true);
      // setCheck2(false);
   };

   const checkbox2 = () => {
      // items = [
      //    ...items.sort(function (a, b) {
      //       return a.rate - b.rate;
      //    }),
      // ];
      // setCheck2(true);
      // setCheck1(false);
   };

   const handleTimings = (i) => {
      setTiming(i);
   };

   const handleLogOut = () => {
      props.updateIsOwner(false);
      props.updateID('');
      props.updateUser({ value: false });
   };

   return (
      <div className='container'>
         <div className='boxcontainer'>
            <div className='filter'>
               <Form className='form'>
                  <Form.Group controlId='formBasicCheckbox' className='check'>
                     <Form.Check
                        onChange={checkbox1}
                        checked={check1}
                        type='checkbox'
                        label='Order by Name'
                     />
                  </Form.Group>
                  <Form.Group controlId='formBasicCheckbox' className='check'>
                     <Form.Check
                        type='checkbox'
                        label='Order by Rate'
                        checked={check2}
                        onChange={checkbox2}
                     />
                  </Form.Group>
               </Form>
            </div>
            <div className='hehelol'>
               <Form className='box'>
                  <Form.Group
                     controlId='exampleForm.ControlSelect1'
                     className='box'>
                     <Form.Label className='box'>Select the field</Form.Label>
                     <Form.Control
                        as='select'
                        onChange={(ref) => handleSelect(ref.target.value)}
                        className='contain'>
                        <option value='' hidden />
                        {items.map((i, key) => (
                           <option value={i.ID} key={key}>
                              Name: {i.name}, Location: {i.location}, Rate: {i.rate}, Rating: {i.rating}
                           </option>
                        ))}
                     </Form.Control>
                  </Form.Group>

                  <Form.Group
                     controlId='exampleForm.ControlTextarea1'
                     className='box'>
                     <Form.Label className='box'>Date</Form.Label>
                     <Form.Control
                        type='date'
                        value={date}
                        onChange={handleDate}
                        className='contain'
                        maxLength={10}
                        placeholder='DD/MM/YYYY'
                     />
                  </Form.Group>
                  <Form.Group
                     controlId='exampleForm.ControlSelect1'
                     className='box'>
                     <Form.Label className='box'>Select timings</Form.Label>
                     <Form.Control
                        as='select'
                        onChange={(ref) => handleTimings(ref.target.value)}
                        className='contain'>
                        <option value='' hidden />
                        {slots.map((i, key) => (
                           <option value={i.slot} key={key}>
                              Slot: {i.slot}, Fields Available: {i.numSlot}
                           </option>
                        ))}
                     </Form.Control>
                  </Form.Group>
               </Form>
               <div className='lol'>
                  <div>
                     <Link
                        to='/'
                        style={{ textDecoration: 'none' }}
                        onClick={handleProceed}>
                        <div className='bob'>Proceed</div>
                     </Link>
                  </div>

                  <div>
                     <Link
                        to='/current-bookings'
                        style={{ textDecoration: 'none' }}>
                        <div className='bob'>Active Bookings</div>
                     </Link>
                  </div>
                  <div>
                     <Link to='/ratings' style={{ textDecoration: 'none' }}>
                        <div className='bob'>Add Ratings</div>
                     </Link>
                  </div>
               </div>
               <div className='lol'>
                  <div>
                     <Link
                        to='/delete-bookings'
                        style={{ textDecoration: 'none' }}>
                        <div className='bob'>Delete Bookings</div>
                     </Link>
                  </div>

                  <div>
                     <Link
                        to='/'
                        onClick={handleLogOut}
                        style={{ textDecoration: 'none' }}>
                        <div className='bob'>Log Out</div>
                     </Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default HomeCustomer;
