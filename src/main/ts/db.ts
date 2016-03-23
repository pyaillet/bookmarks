/// <reference path="../../../typings/main/ambient/mongodb/index.d.ts" />
/// <amd-dependency path="mongodb" />
/// <reference path="../../../typings/main/ambient/es6-promise/index.d.ts" />
/// <amd-dependency path="events" />
/// <reference path="../../../typings/main/ambient/async/index.d.ts" />
/// <amd-dependency path="async" />

/*eslint-env node */
import mongodb = require('mongodb');
import async = require('async');

class State {
  public static Db = null;
  public static Mode = null;
};

// In the real world it will be better if the production uri comes
// from an environment variable, instead of being hard coded.
var PRODUCTION_URI = "mongodb://127.0.0.1:27017/production";
var TEST_URI = "mongodb://127.0.0.1:27017/test";

export var MODE_TEST = "mode_test";
export var MODE_PRODUCTION = "mode_production";

export function connect(mode, done) {
  if (State.Db) return done();

  var uri = mode === MODE_TEST ? TEST_URI : PRODUCTION_URI;

  mongodb.MongoClient.connect(uri, function(err: any, db: mongodb.Db) {
    if (err) return done(err);
    State.Db = db;
    State.Mode = mode;
    done();
  });
};

export function getDB() {
  return State.Db;
};

export function drop(done) {
  if (!State.Db) return done();
  // This is faster then dropping the database
  State.Db.collections(/* @callback */ function(err: any, collections: any) {
    async.each(collections, function(collection: any, cb) {
      if (collection.collectionName.indexOf('system') === 0) {
        return cb();
      }
      collection.remove(cb);
    }, done);
  });
};

export function fixtures(data, done) {
  var db = State.Db;
  if (!db) {
    return done(new Error('Missing database connection.'));
  }
  var names = Object.keys(data.collections);
  async.each(names, function(name: string, cb) {
    db.createCollection(name, function(err: any, collection: any) {
      if (err) return cb(err);
      collection.insert(data.collections[name], cb);
    });
  }, done);
};