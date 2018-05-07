var mongoose = require('mongoose');

var MarkerSchema = new mongoose.Schema({
    color: String,
    name: String
});

mongoose.model('Marker', MarkerSchema)