/*eslint-env node */
var DB = require('../db');

var COLLECTION = 'bookmarks';

// Get all opinions
exports.all = function(cb) {
  var db = DB.getDB();
  db.collection(COLLECTION).find().toArray(cb);
};

// Create new opinion and return its id
exports.create = function(url, username, note, comment, cb) {
  var db = DB.getDB();
  db.collection(COLLECTION).insert(
  	{url: url, username: username, note: note, comment: comment}, 
  	function(err, docs) {
    	if (err) return cb(err);
    	cb(null, docs.ops[0]._id);
	}
  );
};


// Remove an opinion
exports.remove = function(id, cb) {
  var db = DB.getDB();
  db.collection(COLLECTION).remove({_id:id}, /* @callback */ function(err, result) {
    cb(err);
  });
};