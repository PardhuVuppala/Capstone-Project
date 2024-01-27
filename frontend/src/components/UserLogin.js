//STEP 1 -- IMPORT REACT
import React, { useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';

//STEP 2 -- CREATE FUNCTIONAL COMPONENT
function UserLogin() {
    const [eemail, setEmpEmail] = useState("");
    const [epass, setEmpPass] = useState("");
    const [msg, setMessage] = useState("");

    const [status, setStatus] = useState(false);
    const [userinputotp, setUserInputOTP] = useState("");
    const [servergeneratedoriginalotp, setServerGenOriginalOTP] = useState("");

    const [ename, setEName] = useState("")
    const [einfo, setEInfo] = useState({})

    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault();

        console.log(`EMAIL: ${eemail}`);
        console.log(`PASS: ${epass}`);

        const emplogininfo = {
            empemail: eemail,
            emppass: epass
        }

        axios.post('http://localhost:4500/emp/logincheck', emplogininfo)
            .then(res => {
                console.log(res.data)
                setEName(res.data[0].empname)
                setServerGenOriginalOTP(res.data[1])
                setEInfo(res.data[0])
                setStatus(true)
            })
            .catch(err => {
                console.log(err)
                setMessage('INVALID UID OR PASSWORD')
            })

        setEmpEmail('')
        setEmpPass('')
    }

    const handleOTPCheckSubmit = (evt) => {
        evt.preventDefault();
        console.log(servergeneratedoriginalotp)
        if (userinputotp === servergeneratedoriginalotp) {
            sessionStorage.setItem("Usertype", 'USER')
            sessionStorage.setItem("username", ename)
            sessionStorage.setItem("userdetails", JSON.stringify(einfo))
            navigate('/userafterlogin')
        }
        else {
            setMessage('INVALID OTP')
        }

        setUserInputOTP('')
    }

    if (status === false) {
        return (
            <>
                <Navbar />

                <div className="container">

                    <br />
                    <br />

                    <div className="row">
                        <div className="col-md-6 col-sm-8 mx-auto">
                            <div className="card">
                                <div className="card-body" style={{ backgroundColor: "#eeefff" }}>
                                    <div className="text-center">
                                        <h3 style={{ color: "blue" }}>USER LOGIN</h3>
                                    </div>

                                    <b style={{ color: "red" }}>{msg}</b>

                                    <div className="text-left">
                                        <form onSubmit={handleSubmit} name='login'>

                                            <div className="mb-3">
                                                <label htmlFor="email" className="fw-bold text-primary">EMAIL ID *</label>
                                                <input type="text" value={eemail}
                                                    onChange={(e) => setEmpEmail(e.target.value)}
                                                    className="form-control" placeholder="Enter EMAIL Id" />
                                            </div>

                                            <div className="mb-3">
                                                <label htmlFor="password" className="fw-bold text-primary">PASSWORD *</label>
                                                <input type="password" value={epass}
                                                    onChange={(e) => setEmpPass(e.target.value)}
                                                    className="form-control" placeholder="Enter Password" />
                                            </div>

                                            <div className="d-grip">
                                                <input type="submit" className="btn btn-success" value="LOGIN" />
                                            </div>
                                           
                                        </form>
                                       
                                      

                                           
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <span className='text-gray-500'>Not a member <Link className='text-red-500' to="/otp">OTP Login</Link></span> */}
                <Link to="/otp">OTP </Link> 
            </>)
    }
    else {
        return (
            <div>
                <br />
                <h3>ENTER OTP</h3>
                <b style={{ color: "red" }}> {msg} </b>
                <form onSubmit={handleOTPCheckSubmit}>
                    <input type="text" value={userinputotp}
                        onChange={(e) => setUserInputOTP(e.target.value)}
                        placeholder="Enter OTP"
                        required />
                    <br /><br />

                    <input type="submit" value="CHECK OTP" className="btn btn-success" />
                </form>
            </div>
        )
    }
}

//STEP 3 -- EXPORT IT TO USE IT
export default UserLogin