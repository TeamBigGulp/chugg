/* eslint-env mocha */
/* eslint-disable no-console */

// Require files we created
const server = require('./../server/server');
const fileMakerController = require('./../server/fileMakerController');

// Require modules
const expect = require('chai').expect;
const request = require('supertest')(server);
const httpMocks = require('node-mocks-http');
const fs = require('fs');
const path = require('path');

describe('main route', () => {
  it('get request succeeds', (done) => {
    request
      .get('/')
      .set('Accept', 'text/html')
      .expect(200, done);
  });

  it('response is html', (done) => {
    request
      .get('/')
      .set('Accept', 'text/html')
      .expect('content-type', /html/)
      .expect(200, done);
  });
});

describe('/download', () => {
  it('get request succeeds', (done) => {
    request
      .get('/download')
      .expect(200, done);
  });

  it('response is zip file', (done) => {
    request
      .get('/download')
      .expect('content-type', /zip/)
      .expect(200, done);
  });
});

describe('/gulp', () => {
  const req = httpMocks.createRequest({
    method: 'POST',
    url: '/gulp',
    body: 'Hello 123',
  });

  const res = httpMocks.createResponse();

  const next = () => {
    console.log('next executed');
  };

  it('post request succeeds', (done) => {
    request
      .post('/gulp')
      .expect(200, done);
  });

  it('createsGulpFile function works', (done) => {
    fileMakerController.createsGulpFile(req, res, next);
    fs.readFile(path.join(__dirname, '../server/files/gulp-starter.js'), 'utf8', (err, data) => {
      if (err) throw err;
      expect(req.body).to.eql(data);
      done();
    });
  });

  it('zipsFile function works', (done) => {
    fileMakerController.zipsFile(req, res, next);
    // this file should not exist (hint: fakeFile.zip)
    fs.stat(path.join(__dirname, '../server/files/fakeFile.zip'), (err, stats) => {
      expect(!!stats).to.eq(false);
    });
    // this file should exist
    fs.stat(path.join(__dirname, '../server/files/chuggFile.zip'), (err, stats) => {
      expect(!!stats).to.eq(true);
      done();
    });
  });

  it('zipped file size is reasonable', (done) => {
    fs.stat(path.join(__dirname, '../server/files/chuggFile.zip'), (err, stats) => {
      expect(stats.size).to.be.at.least(2700);
      done();
    });
  });
});
