// Learn all about module paterns: https://darrenderidder.github.io/talks/ModulePatterns/
// This is an anonymous prototype
"use strict";

var request = require('request');
var token = null;
function JumpCloud(apiToken) {
  token = apiToken;
}

/**** Tags ****/

/**
 * Get all tag records
 */
JumpCloud.prototype.getAllTags = function (callback){
  makeRequest('GET','tags/?limit=500',{},callback);
};

/**
 * Get a single tag record
 */
JumpCloud.prototype.getTag = function (tagID,callback){
  makeRequest('GET','tags/' + tagID,{},callback);
};

/**
 * Add a tag record
 */
JumpCloud.prototype.addTag = function (jsonUpdate,callback){
  makeRequest('POST','tags/',jsonUpdate,callback);
};

/**
 * Update a tag record
 */
JumpCloud.prototype.updateTag = function (tagID,jsonUpdate,callback){
  makeRequest('PUT','tags/' + tagID,jsonUpdate,callback);
};

/**
 * Delete a tag record
 */
JumpCloud.prototype.deleteTag = function (tagID,callback){
  makeRequest('DELETE','tags/' + tagID,{},callback);
};

/**
 * Searches for tag by term
 * @param {string} name The field name to search, ex 'name' or 'x'
 * @param {string} term The search term
 * @param {string} limit The maximum number of results to return
 * @param {object} callback Mutiple tag objects
 */
// For whatever reason tags search different than all other objects
JumpCloud.prototype.searchTags = function (name,term,limit,callback){
  makeRequest('GET','tags?search[fields][]='+name+'&search[searchTerm]='+term+'&limit='+limit,{},callback);
};


/**** Tags ****/

/**
 * Get all user records
 */
JumpCloud.prototype.getAllUsers = function (callback){
  makeRequest('GET','systemusers/?limit=500',{},callback);
};

/**
 * Get a single user record
 */
JumpCloud.prototype.getUser = function (userID,callback){
  makeRequest('GET','systemusers/' + userID,{},callback);
};

/**
 * Search for users by filter
 */
JumpCloud.prototype.searchUsers = function (filter,callback){
  makeRequest('POST','search/systemusers/',{"filter":filter},callback);
};

/**
 * Update a user record
 */
JumpCloud.prototype.updateUser = function (userID,jsonUpdate,callback){
  makeRequest('PUT','systemusers/' + userID,jsonUpdate,callback);
};

/**
 * Add a user record
 */
JumpCloud.prototype.addUser = function(jsonUpdate,callback){
  makeRequest('POST','systemusers/',jsonUpdate,callback);
};

/**
 * Delete a user record
 */
JumpCloud.prototype.deleteUser = function (userID,callback){
  makeRequest('DELETE','systemusers/' + userID,{},callback);
};

/* *** Helpers *** */
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
