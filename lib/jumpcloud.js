// Learn all about module paterns: https://darrenderidder.github.io/talks/ModulePatterns/
// This is an anonymous prototype
"use strict";

var request = require('request');
var token = null;
function JumpCloud(apiToken) {
  token = apiToken;
}

JumpCloud.prototype.getAllUsers = function (callback){
  makeRequest('GET','systemusers/',{},callback);
};

JumpCloud.prototype.getUser = function (userID,callback){
  makeRequest('GET','systemusers/' + userID,{},callback);
};

JumpCloud.prototype.searchUser = function (filter,callback){
  makeRequest('POST','search/systemusers/',{"filter":filter},callback);
};

JumpCloud.prototype.updateUser = function (userID,jsonUpdate,callback){
  makeRequest('PUT','systemusers/' + userID,jsonUpdate,callback);
};

JumpCloud.prototype.addUser = function(jsonUpdate,callback){
  makeRequest('POST','systemusers/',jsonUpdate,callback);
};

JumpCloud.prototype.deleteUser = function (userID,callback){
  makeRequest('DELETE','systemusers/' + userID,{},callback);
};

function makeRequest(methV,urlV,jsonV,callback){
  if(callback === undefined) return;

  request({ method: methV,
    url: 'https://console.jumpcloud.com/api/'+urlV,
    headers: {
      'content-type': 'application/json',
      'Accept': 'application/json',
      'x-api-key': token
    },
    json: jsonV
    },
    function (error, response, body) {
      if(response.statusCode == 200){
        callback(body);
      } else {
        console.log("error statusCode:" + response.statusCode);
        callback(body);
      }
  });
}

module.exports = JumpCloud;
