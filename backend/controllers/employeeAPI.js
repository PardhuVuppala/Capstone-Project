// IMPORT EXPRESS SERVER
const express = require('express');

// USE Router FOR EXPRESS SERVER
const router = express.Router();

const bcrypt = require('bcrypt');
const mailservice = require('../services/mailService.js');
const randomize = require('randomatic');

//IMPORT EMPLOYEE MODEL AND BIND IT
const EmpModel = require('../models/employee_schema');

// URL :- localhost:4500/emp/register  (USING POSTMAN POST)
/*
{
  "empname": "Chandan",
  "empemail": "chan@gmail.com",
  "empmobile": "9831125144",
  "empdob": "05/09/1984",
  "emppass": "abcd",
  "empgender": "Male",
  "empcountry": "India",
  "empaddress": "Kol",
}
*/
// post is used to INSERT DOCUMENT/RECORD
// CALLBACK using lambda 
router.post('/register', (req, res) => {

  bcrypt.hash(req.body.emppass, 10)
    .then((encpass) => {
      //Create Object of Employee Model Class
      // And Receive value from request body and Store value within the Object
      const empobj = new EmpModel({
        empname: req.body.empname,
        empemail: req.body.empemail,
        empmobile: req.body.empmobile,
        empdob: req.body.empdob,
        emppass: encpass,
        empgender: req.body.empgender,
        empcountry: req.body.empcountry,
        empaddress: req.body.empaddress,
      });//CLOSE EmpModel
      //INSERT/SAVE THE RECORD/DOCUMENT
      empobj.save()
        .then(inserteddocument => {
          mailservice.sendmail(req.body.empemail, 'REGISTRATION SUCCESSFUL', 'THANK YOU FOR REGISTRATION');
          res.status(200).send('DOCUMENT INSERED IN MONGODB DATABASE' + '<br\>' + inserteddocument);
        })//CLOSE THEN
        .catch(err => {
          res.status(500).send({ message: err.message || 'Error in Employee Save ' })
        });//CLOSE CATCH
    }//CLOSE  bcrypt then body
    )//CLOSE bcrypt then method
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE POST METHOD


// BROWSER URL :- localhost:4500/emp 
// get IS USED FOR FETCHING DOCUMENTS FROM MONGODB
// CALLBACK using lambda 
router.get('/', (req, res) => {
  EmpModel.find()
    .then(getalldocumentsfrommongodb => {
      res.status(200).send(getalldocumentsfrommongodb);
    }) //CLOSE THEN
    .catch(err => {
      res.status(500).send({ message: err.message || 'Error in Fetch Employee ' })
    });//CLOSE CATCH
} //CLOSE CALLBACK FUNCTION BODY      
);//CLOSE GET METHOD

// localhost:4500/emp/search/abc@gmail.com
//SEARCH EMPLOYEE BY EMPEMAIL
// CALLBACK function for get method using lambda 
router.get('/search/:eid', (req, res) => {
  EmpModel.find({ "empemail": req.params.eid })
    .then(getsearchdocument => {
      if (getsearchdocument.length > 0) {
        res.send(getsearchdocument);
      }
      else {
        return res.status(404).send({ message: "Note not found with id " + req.params.empid });
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.empid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
);//CLOSE GET METHOD


// => localhost:4500/emp/remove/abc@gmail.com     (USING POSTMAN DELETE)
//DELETE A DOCUMENT FROM MONGODB USING EMAILID
router.delete('/remove/:eid', (req, res) => {
  EmpModel.findOneAndRemove({ "empemail": req.params.eid })
    .then(deleteddocument => {
      if (deleteddocument != null) {
        res.status(200).send('DOCUMENT DELETED successfully!' + deleteddocument);
      }
      else {
        res.status(404).send('INVALID EMP ID ' + req.params.empid);
      }
    }) //CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Delete with id " + req.params.empid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
); //CLOSE Delete METHOD

//USING POSTMAN LOGIN
// localhost:4500/emp/logincheck     
/*
{
  "empemail": "ss@gmail.com",
  "emppass": "abcd"
}
*/

router.post('/logincheck', (req, res) => {
  //console.log(req.body.empemail)   
  //console.log(req.body.emppass)
  EmpModel.find({ "empemail": req.body.empemail })
    .then(getsearchdocument => {
      if (getsearchdocument.length > 0) {
        //console.log(getsearchdocument[0].emppass)
        let enteredpassword = req.body.emppass
        let storedpassword = getsearchdocument[0].emppass
        bcrypt.compare(enteredpassword, storedpassword)
          .then(result => {
            //console.log(result)
            if (result == true) {
              //console.log("MATCHED");
              r = randomize('0', 4) //will generate a 4-digit random number
              mailservice.sendmail(req.body.empemail, 'YOUR OTP', r);
              console.log(r)
              getsearchdocument[1] = r
              res.status(200).send(getsearchdocument);
            }
            else {
              res.status(404).send({ message: "PASSWORD NOT MATCHED" });
            }
          })
      }
      else {
        res.status(404).send({ message: "EMAILID NOT FOUND" })
      }
    }) // CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.empid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
)//CLOSE POST METHOD 



// otp login
// http://localhost:4500/emp/otpcheck



router.post('/otpcheck', (req, res) => {
 
  EmpModel.find({ "empemail": req.body.empemail })
    .then(getdocument => {
      if (getdocument.length > 0) {
        let enteredpassword = req.body.empemail
        let storedpassword = getdocument[0].empemail
       
            //console.log(result)
            if (storedpassword == enteredpassword) {
              //console.log("MATCHED");
              r = randomize('0', 4) //will generate a 4-digit random number
              mailservice.sendmail(req.body.empemail, 'YOUR OTP', r);
              console.log(r)
              getdocument[1] = r
              res.status(200).send(getdocument);
            }
            else {
              res.status(404).send({ message: "PASSWORD NOT MATCHED" });
            }
        
      }
      else {
        res.status(404).send({ message: "EMAILID NOT FOUND" })
      }
    }) // CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in Retriving with id " + req.params.empid });
    })//CLOSE CATCH
}//CLOSE CALLBACK FUNCTION BODY
)//CLOSE POST METHOD 














//UPDATE DOCUMENT IN MONGODB USING EMAILID
router.put('/update', (req, res) => {

  EmpModel.findOneAndUpdate({ "empemail": req.body.empemail },
    {
      $set: {
        "empmobile": req.body.empmobile,
        "emppass": req.body.emppass,
        "empaddress": req.body.empaddress
      }
    }, { new: true })
    .then(getupdateddocument => {
      if (getupdateddocument != null)
        res.status(200).send('DOCUMENT UPDATED ' + getupdateddocument);
      else
        res.status(404).send('INVALID EMAILID ' + req.body.empemail);
    }) // CLOSE THEN
    .catch(err => {
      return res.status(500).send({ message: "DB Problem..Error in UPDATE with id " + req.params.empid });
    }) // CLOSE CATCH
} //CLOSE CALLBACK FUNCTION
); //CLOSE PUT METHOD


//SHOULD BE EXPORTED
module.exports = router;