node-trianglecrm
================

SDK for storefronts to process sales and communicate with TriangleCRM.

## Installation ##

    npm install -s trianglecrm

## Usage ##

    var TriangleCRM = require('trianglecrm');
    var client = new TriangleCRM(function(error, client) {
      console.log(client.describe());
    });

## Description ##

