/*eslint-env node */
import DB = require('../db');

var COLLECTION = 'bookmarks';

// Get all opinions
export function all(cb) {
  var db = DB.getDB();
  db.collection(COLLECTION).find().toArray(cb);
};

// Create new opinion and return its id
export function create(url, username, note, comment, cb) {
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
export function remove(id, cb) {
  var db = DB.getDB();
  db.collection(COLLECTION).remove({_id:id}, /* @callback */ function(err, result) {
    cb(err);
  });
};