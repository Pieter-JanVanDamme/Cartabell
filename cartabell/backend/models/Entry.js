var mongoose = require('mongoose');

var EntrySchema = new mongoose.Schema({
    author: String,
    title: String,
    contents: String,
    keynote: Boolean,
    dateCreated: Date,
    dateModified: Date,
    markers: ['MarkerSchema'],
    collaborators: [String]
});

mongoose.model('Entry', EntrySchema)