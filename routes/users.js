var express = require('express');
var router = express.Router();
const Users = require('../models/users');
const {check, validationResult} = require('express-validator');
const passport = require('passport');
const isAuth = require('../config/isAuht');



/* GET register page...................................... */
router.get('/profile',isAuth.userSigned ,function(req, res, next) {
  console.log(req.user);
  res.render('users/profile',{title:'Profile'})
 })
 /* GET register page..................................... */



/* GET register page...................................... */
router.get('/register',isAuth.userNotSigned, function(req, res, next) {
  let errors = req.flash('errors');
  res.render('users/register',{title:'Register',errors:errors})
 })
 /* GET register page..................................... */





 /* POST register page.................................... */
router.post('/register',[
    check("email", 'insert valid email').isEmail(),
    check("username", 'username is empty').not().isEmpty(),
    check("password", 'password not less than 4 charachter').isLength({min:2}),
    check('confirm').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })], function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let validMsg = [];
        errors.errors.forEach(err => {
        validMsg.push(err);
        });
        req.flash('errors', validMsg);
        res.redirect('register');
        console.log(validMsg);
        return;
    }
    next();

 },
 passport.authenticate('register',{
  session:true,
  successRedirect:'login',
  failureRedirect:'register',
  failureFlash:true
})
 )
  /* POST register page.................................... */





/* GET Login page...................................... */
router.get('/login',isAuth.userNotSigned,function(req, res, next) {
  let errors = req.flash('errors');
  res.render('users/login',{title:'login',errors:errors})
 })
 /* GET Login page..................................... */





 /* GET home page.................................... */
router.post('/login',[
    check("email", 'insert valid email').isEmail(),
    check("password", 'password not less than 4 charachter').isLength({min:4}),
    ], function(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        let validMsg = [];
        errors.errors.forEach(err => {
        validMsg.push(err);
        });
        req.flash('errors', validMsg);
        res.redirect('login');
        console.log(validMsg);
        return;
    }
    next();

 },
 passport.authenticate('login',{
   session:true,
   failureRedirect:"login",
   successRedirect:'profile',
   failureFlash:true
 })
 )


 router.get('/logout',isAuth.userSigned,(req,res)=>{
  req.logOut();
  res.redirect('/users/login')
 });


 router.get('/forgot',isAuth.userNotSigned,(req,res)=>{
  let errors = req.flash('errors');
  res.render('users/forgot',{title:'Forgot',errors:errors})
 });


module.exports = router;
