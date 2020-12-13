var express = require('express')
var router = express.Router()
let model = require('../models/interviewer.model');

router.get('/interviewers', function(req, res, next) {
  model.find()
  .then(i=>res.json(i))
  .catch(err=>res.status(400).json("Error: " + err));
})

router.get('/interviewers/:id', function(req, res, next) {
  model.findById(req.params.id)
    .then(i=>res.json(i))
    .catch(err=>res.status(400).json("Error: " + err));
})

router.post('/interviewers', function(req, res) {
  var interviewer = req.body
  if (!interviewer.name || !interviewer.email) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    const i = new model({
      name : interviewer.name,
      email : interviewer.email,
      tags : interviewer.tags || [],
      date : Date.now()
    });
    
    i.save()
       .then(i=>res.json(i))
       .catch(err=>res.status(400).json("Error: " + err));
  }
})

router.delete('/interviewers/:id', function(req, res) {
  model.findByIdAndDelete(req.params.id)
    .then(i=>res.json(i))
    .catch(err=>res.status(400).json("Error: " + err));
})

router.put('/interviewers/:id', function(req, res, next) {
  var interviewer = req.body

  if (!interviewer.name && !interviewer.email) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    model.findById(req.params.id)
    .then(i=>{
      if(interviewer.name)
        i.name = interviewer.name;
      if (interviewer.email)
        i.email = interviewer.email;
      if (interviewer.tags)
        i.tags = interviewer.tags;

      i.save()
      .then(i=>res.json(i))
      .catch(err=>res.status(400).json("Error: " + err));
    })
    .catch(err=>res.status(400).json("Error: " + err));
  }
})

module.exports = router
