const express = require('express');
const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const cloudinary = require('cloudinary');

const Incident = require('../models/incident');
const SECRETS = require('../../secret');

const SOURCE_USER = "cycleSafeUsers";

// Configurations - ask secret.js file from developers
cloudinary.config({
  cloud_name: 'cyclesafe',
  api_key: '255424565213168',
  api_secret: SECRETS.CLOUDINARY,
});

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const incidents = await Incident.find({}, {limit: 100}).exec();
    res.status(200).json(incidents);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({
      error: err
    });
  }
});


router.get('/around', async (req, res, next) => {
  try {
    const {latitude, longitude, maxDistance} = {...req.query};
    const incidents = await Incident.find({
      locationPair: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: maxDistance,
        }
      }
    }, {limit: 100}).exec();
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
    const incident = Object.assign(
      { _id: uuidv1(), source: SOURCE_USER },
      req.body,
    );
    incident.locationPair = { type : "Point", coordinates : [incident.location.longitude, incident.location.latitude] };

    // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==
    if (incident.accident && incident.accident.imageData) {
      const cloudImage = await cloudinary.v2.uploader.upload(incident.accident.imageData,
        {
          secure: true, transformation: [
            { width: 300, height: 300, crop: 'thumb', gravity: 'face', radius: 20 },
          ]
        });

      delete incident.accident.imageData;
      incident.accident.imageUrl = cloudImage.url;
    }

    // const result = await new Incident(incident).save();
    const result = await Incident.findOneAndUpdate(
      {_id: incident._id},
      incident,
      {upsert: true, new: true, runValidators: true}
    );

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

