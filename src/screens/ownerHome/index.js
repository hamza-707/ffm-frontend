import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

const OwnerHome = (props) => {
   const handleLogOut = () => {
      props.updateIsOwner(false);
      props.updateID('');
      props.updateUser({ value: false });
   };
   return (
      <div className='container'>
         <div className='boxcontainer'>
            <div className='buttonContainer'>
               <Link to='/current-bookings' style={{ textDecoration: 'none' }}>
                  <div className='menu'>Current Bookings</div>
               </Link>
               <Link to='/warn-customers' style={{ textDecoration: 'none' }}>
                  <div className='menu'>Past Bookings</div>
               </Link>
               <Link to='/delete-bookings' style={{ textDecoration: 'none' }}>
                  <div className='menu'>Delete Bookings</div>
               </Link>
               <Link to='/blacklist' style={{ textDecoration: 'none' }}>
                  <div className='menu'>BlackList</div>
               </Link>
               <Link to='/edit' style={{ textDecoration: 'none' }}>
                  <div className='menu'>Edit Profile</div>
               </Link>
               <Link
                  onClick={handleLogOut}
                  to='/'
                  style={{ textDecoration: 'none' }}>
                  <div className='menu'>Log out</div>
               </Link>
            </div>
         </div>
      </div>
   );
};
export default OwnerHome;
