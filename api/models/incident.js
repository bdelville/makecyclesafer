const mongoose = require('mongoose');

const incidentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    location: String
});

module.exports = mongoose.model('Incident', incidentSchema);