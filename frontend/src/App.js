import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Otp from './components/otplogin';
import IndexHome from './components/IndexHome';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import AboutUs from './components/AboutUs'
import ContactUs from './components/ContactUs'

import AdminLogin from './components/AdminLogin';
import AdminAfterLogin from './components/AdminAfterLogin';
import AdminViewAllUser from './components/AdminViewAllUser';
import AdminSearchUserByEmail from './components/AdminSearchUserByEmail';
import AdminDeleteUserByEmail from './components/AdminDeleteUserByEmail';
import AdminManageUser from './components/AdminManageUser';

import UserAfterLogin from './components/UserAfterLogin';
import UserProfileUpdate from './components/UserProfileUpdate';

import Logout from './components/Logout';

function App() {
  return (
    <div className="App">

      <h3> MY COMPANY NAME </h3>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IndexHome />} />
          <Route path="/registration" element={<UserRegistration />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />

          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminafterlogin" element={<AdminAfterLogin />} />
          <Route path="/adminviewalluser" element={<AdminViewAllUser />} />
          <Route path="/adminsearchuserbyemail" element={<AdminSearchUserByEmail />} />
          <Route path="/admindeleteuserbyemail" element={<AdminDeleteUserByEmail />} />
          <Route path="/adminmanageuser" element={<AdminManageUser />} />

          <Route path="/userafterlogin" element={<UserAfterLogin />} />
          <Route path="/userprofileupdate" element={<UserProfileUpdate />} />

          <Route path="/logout" element={<Logout />} />
          <Route path='/otp' element={<Otp/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
