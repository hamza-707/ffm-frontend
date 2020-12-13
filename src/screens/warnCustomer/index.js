import React from 'react';
import axios from 'axios';
import './styles.css';

import { Form, Button } from 'react-bootstrap';

const Warn = (props) => {
   const [items, setItems] = React.useState([]);
   const [warnRun, setWarnRun] = React.useState({ value: false });
   const [removeRun, setRemoveRun] = React.useState({ value: false });
   React.useEffect(async () => {
      const obj = {
         fieldID: props.fieldID,
      };
      await axios
         .post('https://dbproject-group21.000webhostapp.com/db_proj/OPastBookings.php', obj)
         .then((res) => {
            setItems(res.data);
         });
   }, [warnRun, removeRun]);
   const [checked, setCheck] = React.useState([]);
   React.useEffect(() => {
      setCheck(
         new Array(
            ...items.map((i, key) => {
               return false;
            })
         )
      );
   }, [items]);
   const onChange = (index) => {
      setCheck(
         new Array(
            ...items.map((i, key) => {
               if (key === index) {
                  return !checked[key];
               }
               return checked[key];
            })
         )
      );
   };
   async function handleWarn() {
      let count = 0;
      for (let i = 0; i < items.length; i++) {
         if (checked[i] === true) {
            const obj = {
               bookingID: items[i].id,
            };
            await axios
               .post('https://dbproject-group21.000webhostapp.com/db_proj/OWarn.php', obj);
            count++;
            if (count === 1) {
               alert('Customer(s) Warned');
            }
         }
      }
      setWarnRun({ value: true });
   }
   async function handleRemove() {
      let count = 0;
      for (let i = 0; i < items.length; i++) {
         if (checked[i] === true) {
            const obj = {
               bookingID: items[i].id,
            };
            await axios
               .post('https://dbproject-group21.000webhostapp.com/db_proj/OAvailed.php', obj);
            count++;
            if (count === 1) {
               alert('Bookings(s) Removed');
            }
         }
      }
      setRemoveRun({ value: true });
   }
   return (
      <>
         <div className='container'>
            <h1>Warn Customers</h1>
            {items.map((i, key) => (
               <div className='hehecontainer'>
                  <div className='item'>
                     <div>
                        <div>Customer Name: {i.name}</div>
                        <div className='zahn'>
                           <div>Time: {i.start_time}</div>
                           <div>Date: {i.date}</div>
                        </div>
                     </div>
                  </div>
                  <div className='item2'>
                     <Form className='form'>
                        <Form.Group
                           controlId='formBasicCheckbox'
                           className='check'>
                           <Form.Check
                              onChange={() => onChange(key)}
                              checked={checked[key]}
                              type='checkbox'
                           />
                        </Form.Group>
                     </Form>
                  </div>
               </div>
            ))}
         </div>

         <Button className='delete' onClick = {handleRemove}>
            <div className='yay'>Remove</div>
         </Button>
         <Button className='delete' onClick={handleWarn}>
            <div className='yay'>Warn</div>
         </Button>
      </>
   );
};

export default Warn;
