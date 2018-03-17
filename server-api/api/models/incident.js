const mongoose = require('mongoose');
const Constants = require('../../Constants');

const validateInList = (array) => (value) => array.includes(value);

const incidentSchema = mongoose.Schema({
  _id: { type: String, required: true },
  source: String,
  whenOccurred: Date,
  cyclist: {
    age: Number,
  },
  reportType: {
    type: String,
    validate: {validator: validateInList(Constants.REPORT_TYPES), message: '{VALUE} is not valid'}
  },
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
    routeId: String, // OpenStreetMap route id ?
    description: String,
  },
  imageUrl: String,

  incident: {
    type: {
      type: String,
      validate: {validator: validateInList(Constants.INCIDENT_TYPE), message: '{VALUE} is not valid'}
    },
    criticality: {
      type: String,
      validate: {validator: validateInList(Constants.CRITICALITY), message: '{VALUE} is not valid'}
    },
    weather: {
      type: String,
      validate: {validator: validateInList(Constants.WEATHER), message: '{VALUE} is not valid'}
    },
    movement: {
      type: String,
      validate: {validator: validateInList(Constants.MOVEMENT), message: '{VALUE} is not valid'}
    },
  },
  hazard: {
    type: {
      type: String,
      validate: {validator: validateInList(Constants.HAZARD_TYPE), message: '{VALUE} is not valid'}
    },
  },
  thumbup: {
    description: String,
  },
});

module.exports = mongoose.model('Incident', incidentSchema);