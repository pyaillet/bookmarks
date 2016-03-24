var DB = require('../../../main/js/db');
var chai = require('chai');
var fixtures = require('../../fixtures/test1');

var Opinion = require('../../../main/js/models/opinion');

chai.should();

describe('Model Opinion Tests', function() {

  before(function(done) {
    DB.connect(DB.MODE_TEST, done);
  });

  beforeEach(function(done) {
    DB.drop(function(err) {
      if (err) return done(err);
      DB.fixtures(fixtures, done);
    });
  });

  it('all', function(done) {
    Opinion.all(/* @callback */ function(err, opinions) {
      opinions.length.should.eql(4);
      done();
    });
  });

  it('create', function(done) {
    Opinion.create(
    	'http://www.google.fr', 'Eric Schmidt', 5, 'The best !', 
    	/* @callback */ function(err, id) {
	      Opinion.all(/* @callback */ function(err, opinions) {
	        opinions.length.should.eql(5);
	        opinions[4]._id.should.eql(id);
	        opinions[4].url.should.eql('http://www.google.fr');
	        opinions[4].username.should.eql('Eric Schmidt');
	        opinions[4].note.should.eql(5);
	        opinions[4].comment.should.eql('The best !');
	        done();
	      });
    });
  });

  it('remove', function(done) {
    Opinion.all(/* @callback */ function(err, opinions) {
      Opinion.remove(opinions[0]._id, /* @callback */ function(err) {
        Opinion.all(/* @callback */ function(err, result) {
          result.length.should.eql(3);
          result[0]._id.should.not.eql(opinions[0]._id);
          result[1]._id.should.not.eql(opinions[0]._id);
          result[2]._id.should.not.eql(opinions[0]._id);
          done();
        });
      });
    });
  });
});