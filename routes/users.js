var express = require('express')
var router = express.Router()
let model = require('../models/user.model');

router.get('/users', function(req, res, next) {
  model.find()
  .then(u=>res.json(u))
  .catch(err=>res.status(400).json("Error: " + err));
})

router.get('/users/interviewers', function(req, res, next) {
    model.find( {isInterviewer:true})
      .then(u=>res.json(u))
      .catch(err=>res.status(400).json("Error: " + err));
})

router.get('/users/:id', function(req, res, next) {
  model.findById(req.params.id)
    .then(u=>res.json(u))
    .catch(err=>res.status(400).json("Error: " + err));
})
  

router.post('/users', function(req, res) {
  var user = req.body
  if (!user.name || !user.email) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    const u = new model({
      name : user.name,
      email : user.email,
      isAdmin : user.isAdmin || false,
      isInterviewer : user.isInterviewer || false,
      tags : user.tags || [],
      date : Date.now()
    });
    
    u.save()
       .then(u=>res.json(u))
       .catch(err=>res.status(400).json("Error: " + err));
  }
})

router.delete('/users/:id', function(req, res) {
  model.findByIdAndDelete(req.params.id)
    .then(u=>res.json(u))
    .catch(err=>res.status(400).json("Error: " + err));
})

router.put('/users/:id', function(req, res, next) {
  var user = req.body
  console.log(user);
  if (!user.name && !user.email) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    model.findById(req.params.id)
    .then(u=>{
      if(user.name)
        u.name = user.name;
      if (user.email)
        u.email = user.email;
      if (user.tags)
        u.tags = user.tags;
      if (user.isAdmin != null || user.isAdmin != undefined)
        u.isAdmin = user.isAdmin;
      if (user.isInterviewer != null || user.isInterviewer != undefined)
        u.isInterviewer = user.isInterviewer;

    u.save()
      .then(u=>res.json(u))
      .catch(err=>res.status(400).json("Error: " + err));
    })
    .catch(err=>res.status(400).json("Error: " + err));
  }
})

module.exports = router