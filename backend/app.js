const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer'); 

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

const sendEmail = (contactEmail, contactCompany, contactSubject, contactMessage) => {
    const transport = {
        host: "0.0.0.0",
        port: 1025,
        secure: false, 
        // auth: {
        //   user: "username",
        //   pass: "password",
        // }
    }
    let transporter = nodemailer.createTransport(transport);

    const data = {
        from: contactEmail,
        to: 'brindusa.melinte@gmail.com',
        subject: (contactCompany ? contactCompany + ': ' : '') + contactSubject,
        text: contactMessage
    }
    transporter.sendMail(data);
};

app.post(
    '/contact',
    body('name')
        .not()
        .isEmpty()
        .withMessage('Name is required.')
        .isLength({ min:2, max: 36 })
        .withMessage('The name must be at least 2 characters long, but no longer than 36.')
        .matches('[a-zA-Z-_]+')
        .withMessage("Only alphabetic, '-' and '_' characters are allowed")
        .trim()
        .escape(),
    body('email')
        .not()
        .isEmpty()
        .withMessage('Email address is required.')
        .isEmail()
        .withMessage('Please enter a valid email address')
        .normalizeEmail(),
    body('subject')
        .not()
        .isEmpty()
        .withMessage('Subject is required')
        .isLength({ min:2, max: 36 })
        .withMessage('The subject must be at least 2 characters long, but no longer than 36.')
        .trim()
        .escape(),
    body('message')
        .not()
        .isEmpty()
        .withMessage('Message is required')
        .isLength({ min:2 })
        .withMessage('The message must be at least 2 characters long.')
        .trim()
        .escape(),
    (req, res) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        
        if(!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.redirect('http://127.0.0.1:5500/frontend/?errors=' + JSON.stringify(errors.array()));
        } else {
            // Data from form is valid.
            sendEmail(req.body.email, req.body.company, req.body.subject, req.body.message);
            res.redirect(`http://127.0.0.1:5500/frontend/?success=Thank you ${req.body.name}. Your message was successfully sent.`);
        }
    }
);

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});

