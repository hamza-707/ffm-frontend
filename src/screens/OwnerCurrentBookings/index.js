import React from "react";
import axios from "axios";

import "./styles.css";

const OwnerActive = (props) => {
   const [items, setItems] = React.useState([]);
   React.useEffect(async () => {
      const obj = {
         fieldID: props.fieldID
      };
      await axios.post('https://dbproject-group21.000webhostapp.com/db_proj/OActiveBookings.php', obj).then((res) => {
         setItems(res.data);
      });
   }, []);

   return (
      <div className="container">
         <h1>Active Bookings</h1>
         {items.map((i) => (
            <div className="item">
               <div>
                  <div>Customer Name : {i.name}</div>
                  <div className="zahn">
                     <div>Timings : {i.start_time}</div>
                     <div>Date : {i.date}</div>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default OwnerActive;
