const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

router.post('/send-mail/:email', (req, res) => {
    console.log('hhhhh');
    var code =req.body.code;

    // email message options
    const mailOptions = {
        from:"ha9.0bib90@gmail.com",
        to:req.params.email ,
        subject: 'ENSIT ECOLE',
        text:code
        
    };
    // email transport configuration

    var transport = nodemailer.createTransport({
        service:"gmail",

        auth: {
            user: "ha9.0bib90@gmail.com",
            pass: "5h5a171078"
        }
    });
    // send email
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.reponse);
            res.json({message: "email send sucessfully"});
        }
    });
});

module.exports = router;
