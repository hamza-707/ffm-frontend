import React from "react";
import axios from "axios";

import "./styles.css";

const ActiveBooking = (props) => {
   console.log(props);
   const [items, setItems] = React.useState([]);
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
   }, []);
   return (
      <div className="container">
         <h1>Active Bookings</h1>
         {items.map((i) => (
            <div className="item">
               <div>
                  <div>Field Name : {i.name}</div>
                  <div>Location : {i.location}</div>
                  <div className="zahn">
                     <div>Rate : {i.rate}</div>
                     <div>Date : {i.date}</div>
                     <div>Time : {i.start_time}</div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default ActiveBooking;
