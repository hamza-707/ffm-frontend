import React from 'react';
import './styles.css';
import axios from 'axios';

import { Form, Button } from 'react-bootstrap';

const CDeleteBookings = (props) => {
   const [items, setItems] = React.useState([]);
   const [delRun, setDelRun] = React.useState({value: false});
   React.useEffect(async () => {
      const obj = {
         customerID: props.customerID
      };
      const config = {
         headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
         }
     };
      await axios.post('https://dbproject-group21.000webhostapp.com/db_proj/CActiveBookings.php', obj, config).then((res) => {
         setItems(res.data);
      });
   }, [delRun]);
   const [checked, setCheck] = React.useState([])
   React.useEffect(() => {
      setCheck(
         new Array(...items.map((i, key) => {
            return false;
         }))
      )
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
   async function handleDelete(){
      for(let i = 0; i<items.length; i++){
         if(checked[i] == true){
            const obj = {
               bookingID: items[i].id
            };
            const config = {
               headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
               }
           };
            await axios.post('https://dbproject-group21.000webhostapp.com/db_proj/CDeleteBookings.php', obj, config)
         }
      }
      setDelRun({value: true});
   }

   return (
      <>
         <div className='container'>
            <h1>Delete Bookings</h1>
            {items.map((i, key) => (
               <div className='hehecontainer'>
                  <div className='item'>
                     <div>
                        <div>Field Name : {i.name}</div>
                        <div>Location : {i.location}</div>
                        <div className='zahn'>
                           <div>Rate : {i.rate}</div>
                           <div>Date : {i.date}</div>
                           <div>Time : {i.start_time}</div>
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

         <Button className='delete' onClick = {handleDelete}>
            <div className='yay'>Delete</div>
         </Button>
      </>
   );
};

export default CDeleteBookings;
