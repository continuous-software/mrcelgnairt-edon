'use strict';

var _ = require('lodash');
var soap = require('soap');

module.exports = TriangleCRM;

TriangleCRM.ENDPOINT = '/api/2.0/billing_ws.asmx?wsdl';

function TriangleCRM(options, callback) {
  var _this = this;
  _this.client = null;
  _this.endpoint = TriangleCRM.ENDPOINT;
}

function TriangleCRM(options, callback) {
  this._host = options.host;
  this._username = options.username;
  this._password = options.password;
  this.initialize(callback);
  return {
    CreateProspect: this.CreateProspect,
    CreateSubscription: this.CreateSubscription,
    CreateNewSubscriptionExistingCustomer: this.CreateNewSubscriptionExistingCustomer
  };
}

TriangleCRM.prototype.initialize = function(callback) {
  var _this = this;
  soap.createClient(_this._host + TriangleCRM.ENDPOINT, function(error, client) {
    this.client = (!error) ? client : error;
    callback(error, client);
  });
};

TriangleCRM.prototype.signRequest = function(request) {
  return _.extend(request, {
    username: this.username,
    password: this.password
  });
};

TriangleCRM.prototype.CreateProspect = function(prospect, callback) {
  prospect.productTypeIDSpecified = (prospect.productTypeId) ? 'TRUE' : 'FALSE';
  this.client.CreateProspect(this.signRequest(prospect), function(error, result) {
    console.log(error, result);
  });
};

TriangleCRM.prototype.CreateSubscription = function(subscription, callback) {
  subscription.campaignIDSpecified = (subscription.campaignID) ? 'TRUE' : 'FALSE';
  subscription.prospectIDSpecified = (subscription.prospectID) ? 'TRUE' : 'FALSE';
  subscription.paymentTypeSpecified = (subscription.paymentType) ? 'TRUE' : 'FALSE';
  this.client.CreateSubscription(this.signRequest(subscription), function(error, result) {
    console.log(error, result);
  });
};

TriangleCRM.prototype.CreateNewSubscriptionExistingCustomer = function(upsell, callback) {
  upsell.prospectIDSpecified = (upsell.prospectID) ? 'TRUE' : 'FALSE';
  upsell.billingIDSpecified = (upsell.billingID) ? 'TRUE' : 'FALSE';
  this.client.CreateNewSubscriptionExistingCustomer(this.signRequest(upsell), function(error, result) {
    console.log(error, result);
  });
};
