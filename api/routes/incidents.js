const express = require("express");
const mongoose = require("mongoose");
const Incident = require("../models/incident");

const router = express.Router();

router.get("/", (req,res,next) => {
    Incident.find()
    .exec()
    .then(docs => {
      console.log(docs);
      res.status(200).json(docs);
     })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", (req,res,next) => {
    const incident = new Incident({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        location: req.body.location
      });
      incident
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Handling POST requests to /incident",
            createdIncident: result
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
});

router.get("/:incidentId", (req, res, next) => {
    const id = req.params.incidentId;
    Incident.findById(id)
      .exec()
      .then(doc => {
        console.log("From database", doc);
        if (doc) {
          res.status(200).json(doc);
        } else {
          res
            .status(404)
            .json({ message: "No valid entry found for provided ID" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  });
  
  router.patch("/:incidentId", (req, res, next) => {
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

