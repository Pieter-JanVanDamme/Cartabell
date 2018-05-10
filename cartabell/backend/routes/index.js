var express = require('express');
var router = express.Router();
let mongoose = require('mongoose');

let Entry = mongoose.model('Entry');
let Marker = mongoose.model('Marker');

let jwt = require('express-jwt');
let auth = jwt({secret: process.env.SCRIBBLE_BACKEND_SECRET});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('server operational');
});


/*
 * ENTRY
 */

router.get('/API/entry/', auth, function(req, res, next) {
  res.send("request processed");
});

router.get('/API/entries/', auth, function(req, res, next) {
  Entry.find(
    {
      $or : [
        // matches if user is the author...
        {author : req.user.username},
        // ...or if collaborators-array contains the username
        {collaborators : req.user.username}
      ]
    },
    function(err, entries) {
      if (err) { return next(err); } // error handling
      res.json(entries); // conversion to JSON
  });
});

router.post('/API/entries/', auth, function (req, res, next) {
  let entry = new Entry(req.body); // pass request body (key:value pairs) to Entry constructor
  entry.save(function(err, entr) { // call save on object, with callback
    if (err){ return next(err); }
    res.json(entr); // return the object we just added, user gets object as it exists in DB
  });
});
  
  // no auth! This is an assisting method
  router.param('entry', function(req, res, next, id) {
    let query = Entry.findById(id);
    query.exec(function (err, entry){
      if (err) { return next(err); }
      if (!entry) { return next(new Error('not found ' + id)); }
      req.entry = entry; // don’t return entry in response, add it to request!
      return next(); // call next()-handler
    });
  });   
  
  // uses router.param('entry', function()), see above
  // no auth!
  router.get('/API/entry/:entry', function(req, res) {
    res.json(req.entry);
  });  

  // uses router.param('entry', function()), see above
  router.delete('/API/entry/:entry', auth, function(req, res, next) {
    req.entry.remove(function(err) {
      if (err) { return next(err); }   
      res.json(req.entry);
    });
  })

  router.post('/API/entry/:entry', auth, function(req, res, next) {
    // req.entry = entry saved in the db
    // req.body = post-request with changed data
    console.log(req.entry.title);
    req.entry.title = req.body.title;
    req.entry.contents = req.body.contents;
    req.entry.keynote = req.body.keynote;
    // dateCreated unchanged
    req.entry.markers = req.body.markers;
    req.entry.author = req.body.author;
    req.entry.collaborators = req.body.collaborators;
    req.entry.dateModified = req.body.dateModified;
    req.entry.save(function(err){
      if(err) { res.send(err); }
      res.json(req.entry);
    });
  })
  
module.exports = router;