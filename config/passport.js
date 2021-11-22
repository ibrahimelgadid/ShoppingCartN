const passport = require("passport");
const User = require("../models/users");
const localStrategy = require('passport-local').Strategy;

passport.serializeUser((user,done)=>{
    return done(null, user.id);
})

passport.deserializeUser((id,done)=>{
    User.findById(id,('email username'),(err,user)=>{
        // Cart.findById(id, (err,cart)=>{
        //     if (!cart) {
        //         return done(err,user)
        //     }
        //     user.cart = cart;
        //     return done(err,user)
        // })
        return done(err,user)
    })
})


passport.use('login', new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
}, (req,email, password, done)=>{
    User.findOne({email:email}, (err,user)=>{
        if (err) {
            return done(err)
        }
        if (!user) {
            return done(null, false, req.flash('danger','This user not found'));
        }
        if (!user.comparePass(password)) {
            return done(null, false, req.flash('danger','This password wrong'))
        }
        return done(null, user);
    })
}))


passport.use('register', new localStrategy({
    usernameField:'email',
    passwordField:'password',
    passReqToCallback:true
}, (req,email, password, done)=>{
    User.findOne({email:email}, (err,user)=>{
        if (err) {
            return done(err)
        }
        if (user) {
            return done(null, false, req.flash('danger','This email is exist'));
        }
          
        let userData = new User({
            username:req.body.username,
            email:email,
            password:new User().hashPass(password),
            address:req.body.address,
            contact:req.body.contact
        })
        userData.save((err, user)=>{
            if (err) {
                console.log(err);
            }
            return done(null,user)
        })
    })
}))