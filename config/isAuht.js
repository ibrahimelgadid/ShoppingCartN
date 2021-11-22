
function userNotSigned(req,res,next) {
    if (req.isAuthenticated()) {
      req.flash('danger text-center', 'sorry, you are already login');
      res.redirect('/users/profile');
      return;
    }
    next();
  }
  
  function userSigned(req,res,next) {
    if (!req.isAuthenticated()) {
      req.flash('danger text-center', 'you are not authorized, login now');
      res.redirect('/users/login')
      return;
    }
    next();
  }

  module.exports = {
    userNotSigned,userSigned
  }