'use strict';

var soap = require('soap');

module.exports = TriangleCRM;

TriangleCRM.ENDPOINT = 'https://dashboard.trianglecrm.com'
  + '/api/2.0/billing_ws.asmx?wsdl';

function TriangleCRM(callback) {
  var _this = this;
  _this.client = null;
  _this.endpoint = TriangleCRM.ENDPOINT;
  soap.createClient(_this.endpoint, function(error, client) {
    _this.client = (!error) ? client : null;
    callback && callback(error, client);
  });
}
