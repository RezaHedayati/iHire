var express = require('express')
var router = express.Router()
let model = require('../models/candidate.model');

router.get('/candidates', function(req, res, next) {
  model.find()
  .then(c=>res.json(c))
  .catch(err=>res.status(400).json("Error: " + err));
})

router.get('/candidates/:id', function(req, res, next) {
  model.findById(req.params.id)
    .then(c=>res.json(c))
    .catch(err=>res.status(400).json("Error: " + err));
})

router.post('/candidates', function(req, res) {
  var candidate = req.body
  if (!candidate.name || !candidate.role) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    const c = new model({
      name : candidate.name,
      role : candidate.role,
      date : Date.now()
    });
    
    c.save()
       .then(c=>res.json(c))
       .catch(err=>res.status(400).json("Error: " + err));
  }
})

router.delete('/candidates/:id', function(req, res) {
  model.findByIdAndDelete(req.params.id)
    .then(c=>res.json(c))
    .catch(err=>res.status(400).json("Error: " + err));
})

router.put('/candidates/:id', function(req, res, next) {
  var candidate = req.body

  if (!candidate.name && !candidate.role) {
    res.status(400)
    res.json({
      error: 'Bad Data'
    })
  } else {
    model.findById(req.params.id)
    .then(c=>{
      if(candidate.name)
        c.name = candidate.name;
      if (candidate.role)
        c.role = candidate.role;

      c.save()
      .then(c=>res.json(c))
      .catch(err=>res.status(400).json("Error: " + err));
    })
    .catch(err=>res.status(400).json("Error: " + err));
  }
})

module.exports = router
