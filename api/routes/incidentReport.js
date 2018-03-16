const express = require("express");
const router = express.Router();

router.get("/", (req,res,next) => {
    res.status(200).json({
        message: 'incidents get'
    });
});

router.post("/", (req,res,next) => {
    const incident = {
        name: req.body.name
    };

    res.status(201).json({
        message: 'incident post wohoo',
        createdincident : incident
    });
});

router.get("/:incidentId", (req,res,next) => {
    const id = req.params.customerId;
    res.status(200).json({
        message: "get incident: " + id
    });
});


module.exports = router;

