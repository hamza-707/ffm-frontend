import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Signin from './signin';
import signupOwner from './signupOwner';
import SignupCustomer from './signupCustomer';
import Usertype from './usertype';
import NavBar from '../components/navigation';
import HomeCustomer from './homeCustomer';
import 'bootstrap/dist/css/bootstrap.min.css';
import ActiveBooking from './activeBooking';
import OwnerActive from './OwnerCurrentBookings';
import CDeleteBookings from './CDeleteBookings';
import Warn from './warnCustomer';
import ODeleteBookings from './ODeleteBookings';
import OwnerHome from './ownerHome';
import Blacklist from './blacklist';
import Edit from './editProfile';
import Ratings from './ratings';

let isOwner = false;
let ID = '';
const App = () => {
   const [user, setUser] = React.useState({ value: false });
   console.log(user);
   console.log(isOwner);
   console.log(ID);
   function setIsOwner(value) {
      isOwner = value;
   }
   function getID(value) {
      ID = value;
   }
   return user.value ? (
      isOwner ? (
         <React.Fragment>
            <Router>
               <NavBar />
               <Switch>
                  <Route exact path='/'>
                     <OwnerHome
                        updateUser={(e) => {
                           setUser(e);
                        }}
                        fieldID={ID}
                        updateIsOwner={(e) => setIsOwner(e)}
                        updateID={(e) => getID(e)}
                     />
                  </Route>
                  <Route exact path='/current-bookings'>
                     <OwnerActive fieldID={ID} />
                  </Route>
                  <Route exact path='/delete-bookings'>
                     <ODeleteBookings fieldID={ID} />
                  </Route>
                  <Route exact path='/warn-customers'>
                     <Warn fieldID={ID} />
                  </Route>
                  <Route exact path='/blacklist'>
                     <Blacklist fieldID={ID} />
                  </Route>
                  <Route exact path='/edit'>
                     <Edit fieldID={ID} />
                  </Route>
               </Switch>
            </Router>
         </React.Fragment>
      ) : (
         <React.Fragment>
            <Router>
               <NavBar />
               <Switch>
                  <Route exact path='/'>
                     <HomeCustomer
                        updateUser={(e) => {
                           setUser(e);
                        }}
                        customerID={ID}
                        updateIsOwner={(e) => setIsOwner(e)}
                        updateID={(e) => getID(e)}
                     />
                  </Route>
                  <Route path='/current-bookings'>
                     <ActiveBooking customerID={ID} />
                  </Route>
                  <Route path='/delete-bookings'>
                     <CDeleteBookings customerID={ID} />
                  </Route>
                  <Route path='/ratings'>
                     <Ratings customerID={ID} />
                  </Route>
               </Switch>
            </Router>
         </React.Fragment>
      )
   ) : (
      <React.Fragment>
         <Router>
            <div>
               <Switch>
                  <Route exact path='/'>
                     <Signin
                        updateUser={(e) => {
                           setUser(e);
                        }}
                        updateIsOwner={(e) => setIsOwner(e)}
                        updateID={(e) => getID(e)}
                     />
                  </Route>
                  <Route exact path='/ownersignup' component={signupOwner} />
                  <Route exact path='/signup' component={SignupCustomer} />
                  <Route exact path='/usertype' component={Usertype} />
               </Switch>
            </div>
         </Router>
      </React.Fragment>
   );
};

export default App;
