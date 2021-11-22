const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const MongoStore =require('connect-mongo');
// const isAuth = require('./config/isAuht')




const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
// const cartRouter = require('./routes/cart');



const app = express();

require('./config/passport');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret:'hima123',
  saveUninitialized:false,
  resave:false,
  store: MongoStore.create({
    mongoUrl:'mongodb://localhost/hima',
    ttl:60*60*24,
  }),
  cookie:{
    secure:false,
    httpOnly:false,
    expires:new Date(Date.now()+60*60*1000)
  }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
app.use(express.static(path.join(__dirname, 'public')));


db.connect('mongodb://localhost/shopping',
// { useUnifiedTopology: true,useNewUrlParser: true },
(err)=>{
  if (err) {
    console.log(err);
  }else{
    console.log('You are now connected to database');
  }
});


app.use(function(req, res, next) {
  res.locals.user = req.user || null;
  next()
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/cart', cartRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  
  // set locals, only providing error in development  
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
