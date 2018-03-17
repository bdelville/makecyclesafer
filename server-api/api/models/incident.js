const mongoose = require('mongoose');

const incidentSchema = mongoose.Schema({
  _id: { type: String, required: true },
  source: String,
  name: String,
  whenOccurred: Date,
  cyclist: {
    age: Number,
  },
  type: String,
  weather: String,
  location: {
    latitude: Number,
    longitude: Number,
    address: String,
    routeId: String, // OpenStreetMap route id ?
    description: String,
  },
  accident: {
    description: String,
    imageUrl: String,
    imageData: String,
  },
});

module.exports = mongoose.model('Incident', incidentSchema);