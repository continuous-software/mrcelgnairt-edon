'use strict';

var _ = require('lodash');
var soap = require('soap');

module.exports = MRCelgnairT;

MRCelgnairT.ENDPOINT = '/api/2.0/billing_ws.asmx?wsdl';

function MRCelgnairT(options, callback) {
  var _this = this;
  _this.client = null;
  _this.endpoint = MRCelgnairT.ENDPOINT;
}

function MRCelgnairT(options, callback) {
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

MRCelgnairT.prototype.initialize = function(callback) {
  var _this = this;
  soap.createClient(_this._host + MRCelgnairT.ENDPOINT, function(error, client) {
    _this.client = (!error) ? client : error;
    callback && callback(error, client);
  });
};

MRCelgnairT.prototype.signRequest = function(request) {
  return _.extend(request, {
    username: this._username,
    password: this._password
  });
};

MRCelgnairT.prototype.processRequest = function(service, request, callback) {
  this.client[service](this.signRequest(request), function(error, result) {
    if (error)
      return callback && callback(error);
    else if (result[service + 'Result'].State == 'Error')
      return callback && callback(result[service + 'Result'].ErrorMessage);
    else
      return callback && callback(null, result[service + 'Result'].ReturnValue);
  });
};

MRCelgnairT.prototype.CreateProspect = function(prospect, callback) {
  prospect.productTypeIDSpecified = (prospect.productTypeId) ? 'TRUE' : 'FALSE';
  this.processRequest('CreateProspect', prospect, callback);
};

MRCelgnairT.prototype.CreateSubscription = function(subscription, callback) {
  subscription.campaignIDSpecified = (subscription.campaignID) ? 'TRUE' : 'FALSE';
  subscription.prospectIDSpecified = (subscription.prospectID) ? 'TRUE' : 'FALSE';
  subscription.paymentTypeSpecified = (subscription.paymentType) ? 'TRUE' : 'FALSE';
  this.processRequest('CreateSubscription', subscription, callback);
};

MRCelgnairT.prototype.CreateNewSubscriptionExistingCustomer = function(upsell, callback) {
  upsell.prospectIDSpecified = (upsell.prospectID) ? 'TRUE' : 'FALSE';
  upsell.billingIDSpecified = (upsell.billingID) ? 'TRUE' : 'FALSE';
  this.processRequest('CreateNewSubscriptionExistingCustomer', upsell, callback);
};

MRCelgnairT.prototype.GetSaleInfo = function(sale, callback) {
  this.processRequest('GetSaleInfo', sale, callback);
};
