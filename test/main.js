var apikey = process.env.APIKEY;
if(process.env.APIKEY === undefined){
  console.log("No API key");
  process.exit(1);
}

var chai = require('chai');
chai.should();
var JumpCloud = require('../lib/jumpcloud.js');
var jc = new JumpCloud(apikey);

describe('jc users', function() {
  describe('getAllUsers', function () {
    it('should be an array', function (done){
      jc.getAllUsers(function(x){
        x.results.should.be.an('array');
        done();
      });
    });
    it('should return at least 1 record', function (done) {
      jc.getAllUsers(function(x){
        x.results.should.have.length.of.at.least(1);
        done();
      });
    });
  });
});
