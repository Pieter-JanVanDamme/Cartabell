var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
    title: String,
    contents: String,
    keynote: Boolean,
    dateCreated: Date,
    dateModified: Date,
    markers: ['MarkerSchema']
});

mongoose.model('Entry', EntrySchema)