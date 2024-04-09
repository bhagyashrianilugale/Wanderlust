const User = require("../models/user.js");

module.exports.renderHome = (req, res)=>{
   res.redirect("/listings");
}

module.exports.renderSignUpForm = (req, res)=>{
       res.render("users/signup.ejs");
}

module.exports.renderLogInForm = (req, res)=>{
        res.render("users/login.ejs");async(req, res)=>{
            req.flash("success", "Welcome back to wanderlust!");
            let redirectUrl = res.locals.redirectUrl || "/listings";
            res.redirect(redirectUrl);
              }
}

module.exports.signUp = async(req, res)=>{
    try{
         let { username, email, password}  = req.body;
         const newUser = new User({ username, email }); 
         const registerdUser =  await User.register(newUser, password);
         console.log(registerdUser);
         req.login(registerdUser,(err)=>{
           if(err){
              return next(err);
                 }
           req.flash("success","Welcome to wanderlust!");
           res.redirect("/listings");
         })}
          catch(e){
          req.flash("error", e.message)
          res.redirect("/signup");
            }
}

module.exports.logIn = async(req, res)=>{
    req.flash("success", "Welcome back to wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logOut = (req, res, next)=>{
    req.logout((err)=>{
       if(err){
          next(err);
      }
    req.flash("success","You are logged Out!");
    res.redirect("/listings");
    }) 
}