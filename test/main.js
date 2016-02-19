"use strict";

// Pull the API Key from enviromental variable
// Which is embeded in travis-ci
var apikey = process.env.APIKEY;
if(process.env.APIKEY === undefined){
  console.log("No API key");
  process.exit(1);
}

// Require all the modules
var chai = require('chai');
chai.should();
var JumpCloud = require('../lib/jumpcloud.js');
var jc = new JumpCloud(apikey);

// Require sample data
var names = require('./names.json');

var ids = [];

// Great Mocha/Chai details:
// http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/

describe('jumpcloud users', function() {

  describe('getAllUsers', function () {
    it('should be an array of 1+ length', function (done){
      jc.getAllUsers(function(x){
        x.results.should.be.an('array');
        x.results.should.have.length.of.at.least(1);
        done();
      });
    });
  }); // end getAllUsers

  describe('addUser', function (){
    it('should create ' + names[0].firstname, function (done){
      this.slow(3000); this.timeout(10000);
      jc.addUser(names[0],function(x){
        x.should.have.property('id');
        x.id.should.have.length.of.at.least(2);
        done();
      });
    });

    it('should create ' + names[1].firstname, function (done){
      this.slow(3000); this.timeout(10000);
      jc.addUser(names[1],function(x){
        x.should.have.property('activated').and.equal(true);
        done();
      });
    });

    it('should create ' + names[2].firstname, function (done){
      this.slow(3000); this.timeout(10000);
      jc.addUser(names[2],function(x){
        x.should.have.property('lastname').and.equal(names[2].lastname);
        done();
      });
    });
  }); // end addUser

  describe('deleteUser', function (){
    it('should delete most users', function (done){
      this.slow(5000); this.timeout(10000);
      jc.getAllUsers(function(x){
        var res = x.results;
        var doneCount = 0;
        for(var a=0;a<res.length;a++){
          if(/^(.*)test\.local$/.test(res[a].email)){
            //console.log("Deleting "+res[a].firstname);
            jc.deleteUser(res[a]._id,function(z){
              z.should.have.property('id');
              doneCount++;
              if(doneCount>=res.length){
                done();
              }
            });
          }else{
            //Not a user we loaded, count it as skipped
            doneCount++;
          }
        }
      });
    });
  }); // end deleteUser

});
