# jumpcloud-node
A [JumpCloud REST API](https://github.com/TheJumpCloud/JumpCloudAPI) client.

## About
This project is still in its very earliest stages. However the goal is to provide a useable nodeJS helper to operate against the [JumpCloud](https://jumpcloud.com/) API for administration. Note there is a separate [Authentication and Authorization API](http://support.jumpcloud.com/knowledgebase/articles/455570) which is not covered by this repo.

[![NPM](https://nodei.co/npm/jumpcloud.png?compact=true)](https://nodei.co/npm/jumpcloud/)

[![Build Status](https://travis-ci.org/trueaccord/jumpcloud-node.svg?branch=master)](https://travis-ci.org/trueaccord/jumpcloud-node)
[![Dependency Status](https://david-dm.org/trueaccord/jumpcloud-node.svg)](https://david-dm.org/trueaccord/jumpcloud-node)
[![GitHub issues](https://img.shields.io/github/issues/trueaccord/jumpcloud-node.svg)](https://github.com/trueaccord/jumpcloud-node/issues)

## Install
```bash
$ npm install jumpcloud
```

## Quickstart

Grab an API token from the [admin console](https://console.jumpcloud.com/#/) (your username in the top right > API settings).

```js
var JumpCloud = require('jumpcloud');
var jc = new JumpCloud("XXXapikeyXXX");

jc.getAllUsers(function(x){
  for(a=0;a<x.results.length;a++){
    console.log("Username/ID: " + x.results[a].username + " / " +  x.results[a]._id);
  }
});
```

## Testing
```bash
$ env APIKEY=XXXXapikeyXXXX mocha test/main.js
```

## Examples
Coming soon

## Contributors
Authored by [@ShakataGaNai](https://github.com/shakataganai)

## License
See [LICENSE](LICENSE) file.
