'use strict';

var TriangleCRM = require('trianglecrm');
var client = new TriangleCRM(function(error, client) {
  console.log(client.describe());
});
