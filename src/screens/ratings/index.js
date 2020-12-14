import React from 'react';
import axios from 'axios';
import './styles.css';

import { Form, Button } from 'react-bootstrap';

const Ratings = (props) => {
   const [items, setItems] = React.useState([]);
   const [ratings, setRatings] = React.useState(0);
   const [rateRun, setRateRun] = React.useState({value: false})
   React.useEffect(async () => {
      const obj = {
         customerID: props.customerID,
      };
      const config = {
         headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
         }
     };
      await axios
         .post('https://dbproject-group21.000webhostapp.com/db_proj/CRateableBookings.php', obj, config)
         .then((res) => {
            setItems(res.data);
         });
   }, [rateRun]);
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

   const handleClick = async () => {
      let count = 0;
      checked.forEach((i) => {
         if (i) {
            count = count + 1;
         }
      });
      if (count === 0) {
         alert('Please select a field');
      } else if (count === 1) {
         for(let i=0; i<checked.length; i++){
            if(checked[i] == true){
               const obj = {
                  bookingID: items[i].id,
                  rating: ratings
               }
               const config = {
                  headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                  }
              };
               await axios.post('https://dbproject-group21.000webhostapp.com/db_proj/giveRatings.php', obj, config)
               setRateRun({value: true});   
            }
         }
      } else {
         alert('Please select only one field');
      }
   };

   return (
      <>
         <div className='container'>
            <h1>Add Ratings</h1>
            {items.map((i, key) => (
               <div className='hehecontainer'>
                  <div className='item'>
                     <div>
                        <div>Field Name : {i.name}</div>
                        <div>Location : {i.location}</div>
                        <div className='zahn'>
                           <div>Rate : {i.rate}</div>
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
            <Form classname='ratings'>
               <Form.Group
                  controlId='exampleForm.ControlSelect1'
                  className='box'>
                  <Form.Label className='box'>Rating</Form.Label>
                  <Form.Control
                     as='select'
                     onChange={(e) => setRatings(e.target.value)}
                     className='contain'>
                     <option value={1}>1</option>
                     <option value={2}>2</option>
                     <option value={3}>3</option>
                     <option value={4}>4</option>
                     <option value={5}>5</option>
                     <option value={6}>6</option>
                     <option value={7}>7</option>
                     <option value={8}>8</option>
                     <option value={9}>9</option>
                     <option value={10}>10</option>
                  </Form.Control>
               </Form.Group>
            </Form>
         </div>

         <Button onClick={handleClick} className='delete'>
            <div className='yay'>Rate Field</div>
         </Button>
      </>
   );
};

export default Ratings;
