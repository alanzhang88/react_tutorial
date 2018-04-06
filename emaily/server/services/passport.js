const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const key = require('../config/key');
const { User } = require('../models/user');

passport.serializeUser(
  (user,done) => {
    done(null,user.id);//shortcut to access the string in ObjectId
  }
);//create cookie as _id 

passport.deserializeUser(
  (id,done) => {
    User.findById(id).then(
      user => done(null,user)
    ).catch(err => console.log(err));
  }
)

//we can access user instance from req.user

passport.use(new GoogleStrategy({
    clientID: key.googleClientID,
    clientSecret: key.googleClientSecret,
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done)=>{
    // console.log('access Token',accessToken);//access google server about the user
    // console.log('refresh Token', refreshToken);//refresh after the access token
    // console.log('profile', profile);
    User.findOne({googleId:profile.id}).then((result)=>{
      if(!result){
        new User({googleId: profile.id}).save().then(
          user => done(null,user)
        );
      }
      else{
        done(null,result);//first is error messge, second is the success one
      }
      //tell passport we finished.(since it is a middleware)
    }).catch((err)=>{
      console.log(err);
    });
  })
);
