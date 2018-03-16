const express = require('express');
const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');

const Incident = require('../models/incident');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const incidents = await Incident.find().exec();
    res.status(200).json(incidents);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const incident = new Incident(
      Object.assign({
          _id: uuidv1(),
        },
        req.body,
      ));

    const result = await incident.save();
    console.log(result);
    res.status(201).json({
      message: 'Handling POST requests to /incident',
      createdIncident: result
    });
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
});

router.get('/:incidentId', (req, res, next) => {
  const id = req.params.incidentId;
  Incident.findById(id)
    .exec()
    .then(doc => {
      console.log('From database', doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: 'No valid entry found for provided ID' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});


router.patch('/:incidentId', (req, res, next) => {
  const id = req.params.incidentId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Incident.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;

