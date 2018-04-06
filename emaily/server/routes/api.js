var router = require('express').Router();
const passport = require('passport');

router.get('/currentUser', (req,res)=>{
  res.send(req.user);
});

router.get('/logout',(req,res)=>{
  req.logout();
  res.send(req.user);
});

module.exports = router;
