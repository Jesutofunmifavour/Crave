const express = require('express');
const { userSignup, userLogin, forgetPassword, verificationCode, passwordReset,  } = require('../controllers/authController')
const { accountProfile } = require('../controllers/accountController')
    // , , verificationCode, passwordReset, userLogout 
const {authenticateUser } = require('../middlewares/userMiddleware')
const { body, validationResult } = require('express-validator');
const { protect } = require('../middlewares/authMiddleware')
const { validateSignup, validateLogin } = require('./validations');

const router = express.Router()


router.get('/signup', (req, res) => {
    res.render('signup')
});


router.get('/login', (req, res) => {
    res.render('login')
});


router.get('/forget-password', (req, res) => {
    res.render('forgetPassword')
});


router.get('/verify-code', (req, res) => {
    res.render('verifyCode')
});


router.get('/reset-password', (req, res) => {
    res.render('resetPassword')
});


router.get('/profile-customization', authenticateUser, (req, res) => {
    res.render('profile', { user: req.session.user })
});


router.get('/dashboard', authenticateUser, (req, res) => {
    res.render('dashboard', { user: req.session.user })
});

router.get('/home', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/user/login');
   }

   // Access user information from the session
    const user = req.session.user;

    res.render('home', { user })
});

  







router.post('/signup', validateSignup , userSignup)
router.post('/login',validateLogin, userLogin)
router.post('/forget-password', forgetPassword)
router.post('/verify-code', verificationCode)
router.post('/reset-password', passwordReset)
// router.post('/logout', userLogout)


//profile-settings
router.post('/profile-customization', authenticateUser, accountProfile)


module.exports = router