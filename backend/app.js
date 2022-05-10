const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

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
            // const contactVal = {
            //     name: req.body.name,
            //     email: req.body.email,
            //     company: req.body.company,
            //     subject: req.body.subject,
            //     message: req.body.message
            // };
            // res.render('contact', {title: 'Contact', contactVal: contactVal }) //daca incarc template-ul pt frontend din backend
            // res.redirect('http://127.0.0.1:5500/frontend/?errors=' + JSON.stringify(errors.array())) + '&contactVal=' + JSON.stringify(contactVal);
            res.redirect('http://127.0.0.1:5500/frontend/?errors=' + JSON.stringify(errors.array()));
        } else {
            // Data from form is valid.
            res.redirect(`http://127.0.0.1:5500/frontend/?success=Thank you ${req.body.name}. Your message was successfully sent.`);
        }
       
        console.log(req.body);
    }
);

app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`)
});

