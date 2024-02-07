const express = require('express');
const router = express.Router();

const mailService = require('../services/mailService');

const randomize = require('randomatic');

const ContModal = require('../models/container_schema');


router.post('/register',(req,res) =>
{   
    const userEmail = req.body.ownerid;
    const userEmailPrefix = userEmail.substring(0, 3).toLowerCase();

    // Generating a unique six-digit number
    const randomNumber = randomize('0', 6);

    // Generating a unique additional digit that is not present in the six-digit number
    let additionalDigit = '0';
    for (let i = 0; i <= 9; i++) {
        if (!randomNumber.includes(i.toString())) {
            additionalDigit = i.toString();
            break;
        }
    }

    // Combining all parts to create the unique container ID
    const conUniqueID = userEmailPrefix + randomNumber + additionalDigit;


    const contobj = new ContModal({
         ownerid  :req.body.ownerid,
         con_uniqueid : conUniqueID,
         con_type: req.body.con_type,
         con_dimension:req.body.con_dimension,
         con_booking : req.body.con_booking,
    });
    contobj.save()
    .then(insertdocument => 
        {
            res.status(200).send('Document is insert in MongoDB ' + insertdocument);
        })
})

module.exports = router;