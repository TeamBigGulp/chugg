var expect = require('chai').expect;
var request = require('supertest');
var server = require('./../server/server');
var assert = require('chai').assert;
var httpMocks = require('node-mocks-http');
const fs = require ('fs');
const path = require('path');

var fileMakerController = require('./../server/fileMakerController');

request = request(server);

describe('main route', function() {
  it('get request succeeds', function(done) {
    request
      .get('/')
      .set('Accept', 'text/html')
      .expect(200, done);
  });

  it('response is html', function(done) {
    request
      .get('/')
      .set('Accept', 'text/html')
      .expect('content-type', /html/)
      .expect(200, done);
      // is there a way to check if we're sending the correct html file?
      // answer: '/' will default to '/index.html'
  });
});

describe('/download', function() {
  it('get request succeeds', function(done) {
    request
      .get('/download')
      .expect(200, done);
  });

  it('response is zip file', function(done) {
    request
      .get('/download')
      .expect('content-type', /zip/)
      .expect(200, done);
  });

});

describe('/gulp', function() {
  var req = httpMocks.createRequest({
    method: 'POST',
    url: '/gulp',
    body: 'Hello 123'
  });

  var res = httpMocks.createResponse();

  var next = function() {
    console.log('next executed');
  }

  it('post request succeeds', function(done) {
    request
      .post('/gulp')
      .expect(200, done);
  });

  it('createsFile function works', function(done) {
    fileMakerController.createsFile(req, res, next);
    fs.readFile(path.join(__dirname, '../server/gulp-starter.js'), 'utf8', (err, data) => {
      if (err) throw err;
      expect(req.body).to.eql(data);
      done();
    });
  });

  it('zipsFile function works', function(done) {
    fileMakerController.zipsFile(req, res, next);
    // this file should not exist (hint: fakeFile.zip)
    // how is it that second fs.stat completes after first fs.stat? Why is it okay to only invoke done in second?
    fs.stat(path.join(__dirname, '../server/fakeFile.zip'), function(err, stats) {
      expect(!!stats).to.eq(false);
    });
    // this file should exist
    fs.stat(path.join(__dirname, '../server/chuggFile.zip'), function(err, stats) {
      expect(!!stats).to.eq(true);
      done();
    });
  });

  it('zipped file size is reasonable', function(done) {
    fs.stat(path.join(__dirname, '../server/chuggFile.zip'), function(err, stats) {
      expect(stats.size).to.be.at.least(2800);
      done();
    });
  });

});
