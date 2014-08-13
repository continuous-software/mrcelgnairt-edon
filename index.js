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
    CreateProspect: this.CreateProspect.bind(this),
    CreateSubscription: this.CreateSubscription.bind(this),
    CreateNewSubscriptionExistingCustomer: this.CreateNewSubscriptionExistingCustomer.bind(this),
    GetSaleInfo: this.GetSaleInfo.bind(this)
  };
}

TriangleCRM.prototype.initialize = function(callback) {
  var _this = this;
  soap.createClient(_this._host + TriangleCRM.ENDPOINT, function(error, client) {
    _this.client = (!error) ? client : error;
    callback && callback(error, client);
  });
};

TriangleCRM.prototype.signRequest = function(request) {
  return _.extend(request, {
    username: this._username,
    password: this._password
  });
};

TriangleCRM.prototype.processRequest = function(service, request, callback) {
  this.client[service](this.signRequest(request), function(error, result) {
    if (error)
      return callback && callback(error);
    else if (result[service + 'Result'].State == 'Error')
      return callback && callback(result[service + 'Result'].ErrorMessage);
    else
      return callback && callback(null, result[service + 'Result'].ReturnValue);
  });
};

TriangleCRM.prototype.CreateProspect = function(prospect, callback) {
  prospect.productTypeIDSpecified = (prospect.productTypeId) ? 'TRUE' : 'FALSE';
  this.processRequest('CreateProspect', prospect, callback);
};

TriangleCRM.prototype.CreateSubscription = function(subscription, callback) {
  subscription.campaignIDSpecified = (subscription.campaignID) ? 'TRUE' : 'FALSE';
  subscription.prospectIDSpecified = (subscription.prospectID) ? 'TRUE' : 'FALSE';
  subscription.paymentTypeSpecified = (subscription.paymentType) ? 'TRUE' : 'FALSE';
  this.processRequest('CreateSubscription', subscription, callback);
};

TriangleCRM.prototype.CreateNewSubscriptionExistingCustomer = function(upsell, callback) {
  upsell.prospectIDSpecified = (upsell.prospectID) ? 'TRUE' : 'FALSE';
  upsell.billingIDSpecified = (upsell.billingID) ? 'TRUE' : 'FALSE';
  this.processRequest('CreateNewSubscriptionExistingCustomer', upsell, callback);
};

TriangleCRM.prototype.GetSaleInfo = function(sale, callback) {
  this.processRequest('GetSaleInfo', sale, callback);
};
