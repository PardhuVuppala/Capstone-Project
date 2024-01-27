import React,{useState} from 'react'
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
export default function Otplogin() {
    const [eemail, setEmpEmail] = useState("");
    const [msg, setMessage] = useState("");
    const [eeemail, setEemail] = useState('');


    const [status, setStatus] = useState(false);
    const [userinputotp, setUserInputOTP] = useState("");
    const [servergeneratedoriginalotp, setServerGenOriginalOTP] = useState("");

    const [ename, setEName] = useState("")
    const [einfo, setEInfo] = useState({})

    const navigate = useNavigate();

    const handleSubmit = (evt) => {
        evt.preventDefault();

        console.log(`EMAIL: ${eemail}`);

        const otpinfo = {
            empemail: eemail,
        }

        axios.post('http://localhost:4500/emp/otpcheck', otpinfo)
            .then(res => {
                console.log(res.data)
                setEName(res.data[0].empname)
                setEmpEmail(res.data[0].empemail)
                setServerGenOriginalOTP(res.data[1])
                setEInfo(res.data[0])
                setStatus(true)
            })
            .catch(err => {
                console.log(err)
                setMessage('INVALID UID OR PASSWORD')
            })

        setEmpEmail('')
    }
    const handleEmailChange = (event) => {
        setEemail(event.target.value);
      };
    

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
                                                    className="form-control" placeholder="Enter EMAIL Id" required/>
                                            </div>
                                            <div>
                       <label htmlFor="otp" className="fw-bold text-primary">Enter OTP *</label>
                             <input type="text" className="form-control" 
                              placeholder="Enter OTP" disabled/>
                           <br /><br />
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

            </>)
    }
    else {
        return (
        //     <div>
        //         <br />
        //         <h3>ENTER OTP</h3>
        //         <b style={{ color: "red" }}> {msg} </b>
        //         <form onSubmit={handleOTPCheckSubmit}>
        //             <div>
        //             <input type="text" value={eemail}   onChange={handleEmailChange}
        //                                         placeholder="Enter EMAIL Id" />

        //           </div>
        //         <div>
        //             <input type="text" value={userinputotp}
        //                 onChange={(e) => setUserInputOTP(e.target.value)}
        //                 placeholder="Enter OTP"
        //                 required />
        //             <br /><br />
        // </div>
        //             <input type="submit" value="CHECK OTP" className="btn btn-success" />
        //         </form>
        //     </div>
        <div className="container">

        <br />
        <br />

        <div className="row">
            <div className="col-md-6 col-sm-8 mx-auto">
                <div className="card">
                    <div className="card-body" style={{ backgroundColor: "#eeefff" }}>
                        <div className="text-center">
                            <h3 style={{ color: "blue" }}>OTP LOGIN</h3>
                        </div>

                        <b style={{ color: "red" }}>{msg}</b>

                        <div className="text-left">
                            <form onSubmit={handleOTPCheckSubmit} name='login'>

                                <div className="mb-3">
                                    <label htmlFor="email" className="fw-bold text-primary">EMAIL ID *</label>
                                    <input type="text" value={eemail}
                                        onChange={(e) => setEemail(e.target.value)}
                                        className="form-control" placeholder="Enter EMAIL Id" />
                                </div>
                       <div>
                       <label htmlFor="otp" className="fw-bold text-primary">Enter OTP *</label>
                             <input type="text" className="form-control" value={userinputotp}
                             onChange={(e) => setUserInputOTP(e.target.value)}
                              placeholder="Enter OTP" required />
                           <br /><br />
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

        )
    }
}