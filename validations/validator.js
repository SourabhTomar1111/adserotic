const { check } = require('express-validator');
const { emailExists, usernameExists } = require('../models/users.model');
module.exports.cb = {
    validateUsername: check('username')

        // To delete leading and triling space
        .trim()

        // username is not entered
        .isLength({ min: 3 })

        // Custom message
        .withMessage('Username is required')

        // Custom validation
        // Validate username in use or not
        .custom(async (username) => {
            if (username.length) {
                const exist = await usernameExists(username);
                if (exist) {
                    throw new Error('Username is already in use');
                }
            }
            return true;
        }),

    validateCompanyName: check('company_name').not().isEmpty().withMessage('Company name is required'),    
    validateOPassword: check('olderpassword').not().isEmpty().withMessage('OlderPassword is required'),
    validateNPassword: check('newpassword').not().isEmpty().withMessage('Newpassword is required'),
    validateCOPassword: check('confirmpassword').not().isEmpty().withMessage('Confirmpassword is required').custom((value, { req }) => {
    if (value !== req.body.newpassword) {
        throw new Error('Newpassword and Confirmpassword does not match');
    }
    return true;
   }),
    validateName:    check('name').not().isEmpty().withMessage("Name is required"),
    validateUser:    check('user').not().isEmpty().withMessage("User is required"),
    validateMessage: check('message').not().isEmpty().withMessage("Message is required"),
    validateOtp: check('verification_code').not().isEmpty().withMessage("Verification code is required"),
    validatePassword: check('p_password').not().isEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Atleast 6 Length'),
    validateCPassword: check('p_c_password').not().isEmpty().withMessage('Confirm password is required').custom((value, { req }) => {

        if (value !== req.body.p_password) {
            throw new Error('Password does not match');
        }
        return true;
    }),
    validateFirstname: check('firstname').not().isEmpty().withMessage('Firstname is required'),
    validateLastname: check('lastname').not().isEmpty().withMessage('Lastname is required'),
    validateEmailValidation: check('email')

        // To delete leading and triling space
        .trim()

        // Normalizing the email address
        .normalizeEmail()

        // Checking if follow the email 
        // address formet or not
        .isEmail()

        // Custom message
        .withMessage('Email is required'),

      
    
    validateEmail: check('email')

        // To delete leading and triling space
        .trim()

        // Normalizing the email address
        .normalizeEmail()

        // Checking if follow the email 
        // address formet or not
        .isEmail()

        // Custom message
        .withMessage('Email is required')

        // Custom validation
        // Validate email in use or not
        .custom(async (email) => {
            if (email.length) {
                const exist = await emailExists(email);
                if (exist) {
                    throw new Error('E-mail already in use');
                }

            }

        }),
    validateCemail: check('c_email').not().isEmpty().trim().normalizeEmail().isEmail().withMessage('Confirm email is required').custom((value, { req }) => {

        if (value !== req.body.email) {
            throw new Error('Email does not match');
        }
        return true;
    }),
  //=============================================contact validation===============================================



    validateNationality: check('nationality').not().isEmpty().withMessage('Nationality is required'),
    validateCountry: check('country').not().isEmpty().withMessage('Country is required'),
    validateCurrency: check('currency').not().isEmpty().withMessage('Currency is required'),
    validateADVPassword: check('a_password').not().isEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage('Atleast 6 Length'),
    validateADVCPassword: check('a_c_password').not().isEmpty().withMessage('Confirm password is required').custom((value, { req }) => {

      
        if (value !== req.body.a_password) {
            throw new Error('Password does not match');
        }
        return true;
    }),

}