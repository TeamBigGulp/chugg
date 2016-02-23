var expect = require('chai').expect;
var request = require('supertest');
var server = require('./../server/server');
// var parse = require('parse-http-header');
var assert = require('chai').assert;

request = request(server);

describe('main route', function() {
  it('successful get request', function(done) {
    request
      .get('/')
      .set('Accept', 'text/html')
      .expect(200, done);
  });

  it('provide back html', function(done) {
    request
      .get('/')
      .set('Accept', 'text/html')
      .expect('content-type', /html/)
      .expect(200, done);
      // is there a way to check if we're sending the correct html file?
      // answer: '/' will default to '/index.html'
  });
});

describe('download', function() {
  it('successful get request', function(done) {
    request
      .get('/download')
      .expect(200, done);
  });

  it('provide back zip', function(done) {
    request
      .get('/download')
      .expect('content-type', /zip/)
      .expect(200, done);
  });

  it('check zip size', function(done) {
    request
      .get('/download')
      .expect('content-length', 3626) ||
      .expect('content-length', 3713) ||
      .expect('content-length', 3730) ||
      .expect('content-length', 3817)
      // .expect(res.header['content-length']).to.be(3626); // How do we get access to the response headers? res is undefined
      // .end(function(err, res) {
      //     // assert('3626' === res.header['content-length']); // try using superagent
      //   done();
      // });
      .expect(200, done);
  });

});
