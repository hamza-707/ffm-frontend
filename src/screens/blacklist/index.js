import React from 'react';
import axios from 'axios';
import './styles.css';

import { Form, Button } from 'react-bootstrap';

const Blacklist = (props) => {
   const [items, setItems] = React.useState([]);
   const [removeRun, setRemoveRun] = React.useState({value: false});
   React.useEffect(async() => {
      const obj = {
         fieldID: props.fieldID
      };
      const config = {
         headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
         }
     };
      await axios.post('https://dbproject-group21.000webhostapp.com/db_proj/loadBlacklist.php', obj, config)
         .then(res => {
            setItems(res.data);
         })
   }, [removeRun]);
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

   async function handleRemove(){
      for(let i=0; i<checked.length; i++){
         if(checked[i]){
            const obj = {
               customerID: items[i].id,
               fieldID: props.fieldID
            }
            const config = {
               headers: {
               'Content-Type': 'application/x-www-form-urlencoded'
               }
           };
            await axios.post('http://localhost/db_proj/removeBlacklist.php', obj, config);
         }
      }
      alert('Customer(s) Removed from Blacklist');
      setRemoveRun({value: true});
   }
   return (
      <>
         <div className='container'>
            <h1>BlackListed Customers</h1>
            {items.map((i, key) => (
               <div className='hehecontainer'>
                  <div className='item'>
                     <div>
                        <div>Customer Name : {i.name}</div>
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
            <div className='yay'>Remove from BlackList</div>
         </Button>
      </>
   );
};

export default Blacklist;
