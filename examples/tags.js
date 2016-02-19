var JumpCloud = require('jumpcloud');
var jc = new JumpCloud("XXXapikeyXXX");

jc.getAllTags(function(x){
    console.log(x.results);
});

var json = {"name": 'All Staff1',
    "groupName": 'randomname2',
    "groupGid": '1236',
    "sendToLDAP": true };
jc.addTag(json,function(x){
  jc.updateTag(x._id,{"name":"Updated Name"},function(y){
    jc.getTag(y._id,function(z){
      jc.deleteTag(z._id,function(zztop){
        console.log(zztop);
      });
    });
  });
});
