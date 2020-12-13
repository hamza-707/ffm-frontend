import React from 'react';
import axios from 'axios';
import './styles.css';

import { Form, Button } from 'react-bootstrap';

const ODeleteBooking = (props) => {
   const [items, setItems] = React.useState([]);
   const [delRun, setDelRun] = React.useState({value: false});
   React.useEffect(async () => {
      const obj = {
         fieldID: props.fieldID
      };
      await axios.post('https://dbproject-group21.000webhostapp.com/db_proj/OActiveBookings.php', obj).then((res) => {
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
            await axios.post('https://dbproject-group21.000webhostapp.com/db_proj/ODeleteBookings.php', obj);
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
                        <div>Name: {i.name}</div>
                        <div className='zahn'>
                           <div>Time : {i.start_time}</div>
                           <div>Date : {i.date}</div>
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

export default ODeleteBooking;
