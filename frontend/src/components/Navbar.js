//STEP 1 -- IMPORT REACT
import React from 'react'
import { Link } from 'react-router-dom';

//STEP 2 -- CREATE FUNCTIONAL COMPONENT
function Navbar() {
    let usertp = sessionStorage.getItem('Usertype')
    //let usertp = localStorage.getItem('Usertype')

    let username = sessionStorage.getItem('username')

    if (usertp === 'ADMIN') {
        return (
            <>
                <br />
                <nav>
                    <Link to="/adminafterlogin">ADMIN HOME </Link> |
                    <Link to="/adminviewalluser">VIEW ALL USER </Link> |
                    <Link to="/adminsearchuserbyemail">SEARCH USER BY EMAIL </Link>|
                    <Link to="/admindeleteuserbyemail">DELETE </Link> |
                    <Link to="/adminmanageuser">MANAGE USER </Link> |
                    <Link to="/logout">LOGOUT </Link>
                </nav>
            </>)
    }
    else if (usertp === 'USER') {
        return (
            <>
                <br />
                <nav>
                    <Link to="/userafterlogin">USER HOME </Link> |
                    <Link to="#">VIEW DETAILS </Link> |
                    <Link to="/userprofileupdate">UPDATE PROFILE </Link>|
                    <Link to="/logout">LOGOUT </Link>
                </nav>
                <h3 style={{ color: 'brown' }}>WELCOME {username}</h3>
            </>)
    }
    else {
        return (
            <>
                <br />
                <nav>
                    <Link to="/">HOME </Link> |
                    <Link to="/registration">REG </Link>|
                    <Link to="/login">LOGIN </Link> |
                    <Link to="/aboutus">ABOUT US </Link> |
                    <Link to="/contactus">CONTACT US </Link> |
                    <Link to="/adminlogin">ADMIN </Link>
                </nav>
            </>)
    }
}

//STEP 3 -- EXPORT IT TO USE IT
export default Navbar